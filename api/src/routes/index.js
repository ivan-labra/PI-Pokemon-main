const { Router } = require('express');
const {Pokemon, Types} = require("../db")
const axios = require("axios")
const { getAllPokemons , getAllTypes, getPkName} = require("./controller.js")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);



router.get("/", async (req, res)=>{
    const { name } = req.query;
    


    try {
        //Si no existe el name.
        if(!name){
            const allPk = await getAllPokemons()
            return res.json(allPk)
            //Se termina la ejecucion
        }
        //Si existe el name primero verificamos por DB.

        if(name && name !== ""){
            
            let nameM = name.trim().toLowerCase()
            

            const searchPkDB = await Pokemon.findOne({where: {name : nameM},
            include:[{
                model:Types,
                through:{
                    attributes:[]
                }
            }]
            })
            
            if(searchPkDB){
                return res.send(searchPkDB)
                //Se termina la ejecucion
            }

            ////////////////////////////////////////////////////////////


            //Verificamos en la Api

            const valueApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nameM}`)

            const searchPkApi = await getPkName(valueApi)

            if(searchPkApi){
                return res.send(searchPkApi)
                //Se termina la ejecucion
            }
        }

        /* const allPk = await getAllPokemons()
        if(name){
            const searchPk = await getPkName(name)
            console.log(typeof searchPk)
            if(searchPk.length){
            return res.json(searchPk)
            }  

            const searchBd = await Pokemon.findOne({where: {name},
            include:[{
                model: Types,
                through:{
                    attributes:[]
                }
            }]})
            console.log(searchBd)
            return res.json(searchBd)
        }
        
        res.json(allPk) */
    } catch (error) {
        return res.status(400).send("No se encontro el tipo de pokemon."+ error)
    }

})

router.get("/pokemons/:id", async(req,res)=>{
    let id = req.params.id;

    console.log(id)
    console.log(typeof id)

    try {
        const pkmns = await getAllPokemons()
        const idPkmns = await pkmns.find(p=> p?.id == id)
        return res.status(200).json(idPkmns)
    } catch (error) {
        console.log(error)
        return res.status(400).send("Ocurrio un error inesperado." + error)
    }
})


router.post("/create", async (req, res)=>{
    let { name, life, attack, defense, spedd, height, weight, image, types  } = req.body;
    /* const existePk = Pokemon.findOne({where:{name}})
    if(existePk){
        res.json({inf: "El nombre del pokemon que asignaste ya existe."})
    } */
    if (name) {
        if (!life) life = 1;
        if (!attack) attack = 1;
        if (!defense) defense = 1;
        if (!spedd) spedd = 1;
        if (!height) height = 1;
        if (!weight) weight = 1;
    }
    let nuevoTypes = types.map(e =>Number(e))
    
    try {
        
        await Pokemon.create({name, life, attack, defense, spedd, height, weight, image})
        
        if(types && types.length !== 0){
            const buscarPk = await Pokemon.findOne({where:{name}})
            await nuevoTypes.forEach(async(element) => {
                await buscarPk.addTypes(Number(element))
            }); 

        }
        let pokeNew = await Pokemon.findOne({where: {name: name},
            include:[{
                model:Types,
                through:{
                    attributes:[]
                }
            }]})

            let pokeNew2 = await Pokemon.findOne({where: {name : name},
                include:[{
                    model:Types,
                    through:{
                        attributes:[]
                    }
                }]
                })
        
        return res.status(200).json(pokeNew2)
    } catch (error) {
        console.log(error)
        res.status(400).send("Ocurrio un error inesperado al crear el pokemon." + error)
    }

})

router.post("/types/create", async (req,res)=> {
    
    const {name, id} = req.body;

    try {
        if(!name || !id) return res.status(400).send("Completa el nombre y el id.")

        const newType = await Types.create({name, id})

    

    res.status(200).send({msg: "Se a creado con exito" , newType})


    } catch (error) {
        console.log(error)
    }


})

router.get("/types", async (req,res)=> {
try {
    const objeto = await getAllTypes()

    return res.status(200).json(objeto)
} catch (error) {
    console.log(error)
    res.status(400).send("Ocurrio un error inesperado." + error)
}

})



module.exports = router;
