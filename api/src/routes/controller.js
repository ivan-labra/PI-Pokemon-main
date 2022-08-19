const axios = require("axios")
const {Types, Pokemon} = require("../db")
const getPkApi = async () =>{
    try {
        const pokemons = await axios.get("https://pokeapi.co/api/v2/pokemon");

    const next = await axios.get(`${pokemons.data.next}`)
    
    const allData = pokemons.data.results.concat(next.data.results)

    const infData = await Promise.all(allData.map(async (e) => {
        let p = await axios(e.url)
        return{
            id: p.data.id,
            name: p.data.name,
            life: p.data.stats[0].base_stat,
            attack: p.data.stats[1].base_stat,
            defense: p.data.stats[2].base_stat,
            spedd: p.data.stats[5].base_stat,
            height: p.data.height,
            weight: p.data.weight,
            image: p.data.sprites.other["official-artwork"].front_default,
            types: p.data.types.map( e => e.type.name)
        }
    }

    ))
 //console.log(infData)

    return infData
    } catch (error) {
        console.log(error)
    }
    
}


const getPkDb = async ()=>{
    try {
        const infDb = await Pokemon.findAll({
    include: [{
        model: Types,
        through: {
            attributes: []
        }
    }]
  });
   return infDb
    } catch (error) {
        console.log(error)
    }
   
}




const getAllPokemons = async () => {
    const getApi = await getPkApi()
    const getDb = await getPkDb()
    const data = getDb.concat(getApi)
    //console.log(data)
return data
}


const getAllTypes = async () => {
    try {
        const tipos = await axios.get("https://pokeapi.co/api/v2/type")

    const datos = tipos.data.results.map( e =>  axios.get(e.url))
    const typeObj = await Promise.all(datos)
    

    const obj = typeObj.map(element => {
        
        return {
            id :element.data.id,
            name : element.data.name
        }


    });
    
    await obj.forEach(element => {
        
        Types.findOrCreate({
            where: {name: element.name}
        })
    });
    const AllTypes = await Types.findAll()

    return AllTypes
    } catch (error) {
        console.log(error)
    }
    
}


const getPkName = async (searchApi) =>{
    //const searchApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)

    try {
        if(searchApi){
        const pokemon = {
            id: searchApi.data.id,
            name: searchApi.data.name,
            life: searchApi.data.stats[0].base_stat,
            attack: searchApi.data.stats[1].base_stat,
            defense: searchApi.data.stats[2].base_stat,
            spedd: searchApi.data.stats[5].base_stat,
            height: searchApi.data.height,
            weight: searchApi.data.weight,
            image: searchApi.data.sprites.other["official-artwork"].front_default,
            types: searchApi.data.types.map( e => e.type.name)
        }
        return pokemon
    }
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    getPkApi,
    getAllPokemons,
    getAllTypes,
    getPkName
}