import {ALLPOKEMONS, CREATEPOKEMON, GETALLTYPES, GETIDPK, CLEARDETAIL, SEARCHNAME, FILTERALLAPIDB, FILTERORDERALFABETICO, FILTERORDERFUERZA, FILTERTYPE} from "./actions"

const initialState = {
    allPokemons: [],
    pokemonCreate: {},
    alltypes: [],
    pokemonDetail:{},
    allPokemonsfilter: []

}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case ALLPOKEMONS:
            return{
                ...state,
                allPokemons: action.payload,
                allPokemonsfilter: action.payload,
            }
        case CREATEPOKEMON:

            return{
                ...state,
                allPokemons: [...state.allPokemonsfilter.concat(action.payload)],
                allPokemonsfilter: state.allPokemonsfilter.concat(action.payload) 
            }
        case GETALLTYPES:
            return{
                ...state,
                alltypes: action.payload
            }
        case GETIDPK:
            return{
                ...state,
                pokemonDetail: action.payload
            }
        case CLEARDETAIL:
            return{
                ...state,
                pokemonDetail: {}
            }
        case SEARCHNAME:
            return{
                ...state,
                allPokemons: [action.payload]
            }
        case FILTERALLAPIDB:
            let allpk
            
            if(action.payload === "all"){
                allpk = [...state.allPokemonsfilter]
            }else if(action.payload === "created"){
                allpk = state.allPokemonsfilter.filter(e => e.create)
                
            }else if(action.payload === "api"){
                allpk = state.allPokemonsfilter.filter(e => !e.create)
                
            }return{
                ...state,
                allPokemons: allpk,
            }
        case FILTERORDERALFABETICO:
            let allpk2 = state.allPokemons;
            if(action.payload === "ascendingA"){
                allpk2 = state.allPokemons.sort((a,b)=>{
                    if(a.name < b.name) return -1;
                    if(a.name > b.name) return 1;
                        return 0;
                })
            }else if(action.payload === "descendingA"){
                allpk2 = state.allPokemons.sort((a,b)=>{
                    if(a.name < b.name) return 1;
                    if(a.name > b.name) return -1;
                        return 0;
                })
            }
            return{
                ...state,
                allPokemons: allpk2
            }
            
        case FILTERORDERFUERZA:
            let allpk3= state.allPokemons;
                if(action.payload === 'ascendingB'){
                    allpk3= state.allPokemons.sort((a,b)=>{
                        if(a.attack < b.attack) return -1;
                        if(a.attack > b.attack) return 1;
                        return 0;
                    })
                }else if(action.payload === 'descendingB'){
                    allpk3= state.allPokemons.sort((a,b)=>{
                        if(a.attack < b.attack) return 1;
                        if(a.attack > b.attack) return -1;
                        return 0;
                    })

                } return{
                    ...state,
                    allPokemons: allpk3
                
            }
        case FILTERTYPE:
            let allpk4 = state.allPokemons;
            if(action.payload === "all"){
                allpk4 = [...state.allPokemonsfilter]
            }else{
                //allpk4 = state.allPokemonsfilter.filter(t=> t.types.includes(action.payload) )
                /* allpk4 = state.allPokemonsfilter.filter(e => {
                    if(typeof e.types[0] === "object"){
                    return "1"
                }
                return e.types.includes(action.payload)}
                        ) */

                allpk4 = state.allPokemonsfilter.filter(e => {
                    if(typeof e.types[0] === "object"){
                    let validar = e.types.find(u => u.name === action.payload)
                        if(validar){
                        return e
                    }
                }
                
                return e.types.includes(action.payload)}
                        )
            }
            return{
                ...state,
                allPokemons:allpk4
            }
    default:
    return state
    }
}

export default rootReducer

/* //CREO UNA COPIA DEL VALOR Y LE ASIGNO EL "CREATE" PARA QUE SE PUEDA DIFERENCIAR EN LOS FILTROS
            let valor = {
                ...action.payload,
                create : true
            }
            // HAGO UNA FUNCTION QUE ME DEVUELVA LOS NOMBRES DE LOS ID QUE MATCHEEN
            let types = state.alltypes.filter(e => {
                let result;
                action.payload.types.forEach(u => {
                    if(Number(u) === Number(e.id)) result = result+e
                })
                return result
            }) 

            // LE ASIGNO EL NAME CORRESPONDIENTE
            types = types.map(e => e.name)
            console.log(valor)
            valor.types = types */