import React from 'react'
import stylePaginado from "./css/Paginado.module.css"
export default function Paginado({paginate, pokemonsPerPage, allPk}) {

  let numPage = [];

  for (let i = 1; i <= Math.ceil(allPk / pokemonsPerPage); i++) {
    numPage.push(i);
    

  }

  
  return (
    <div className={stylePaginado.conteiner} >
        
    {numPage && numPage.map(e => (
      <button   key={e} onClick={()=>paginate(e)}>{e}</button>
    ))}
    </div>
  )
}

//paginate => es una function para cambiar el current page (valor actual de la pagina)=> 1
//current page => el valor en el que se encuentra el paginado => 1,2,3
//pokemonsPerPage => es la cantidad de pokemones que se van a mostrar por pagina => 12
//allPk => es la cantidad de pokemons en el estado => 40