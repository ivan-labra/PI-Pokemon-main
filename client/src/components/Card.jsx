import React from 'react'
import styleCard from "./css/Card.module.css"
import { Link } from 'react-router-dom'

export default function Card({ key ,id, name, image, types}) {

  /* let arrayDeTypes = types.map(e => {
          let result;
          if(typeof e[0] === "object"){  
            result = types.map(u => u.name)
          }
          return result || e
          }) */
          
  return (
    <div>
<div className={styleCard.conteiner} key={key} >
      
      <div className={styleCard.header}>
        <h3>{name.split("")[0].toUpperCase()+name.slice(1)}</h3>
      </div>
      <div className={styleCard.conteinerimg}>
        <Link to={`/cardDetail/${id}`}>
        <img src={image} alt={name} /> 
        </Link>
      </div>

      <div className={styleCard.inf}>
        <h4>Types:</h4>
        <div className={styleCard.tipos}>

          {typeof types[0] !== "object"? types.map(e => {
              return (<h4>{e}</h4>)
            })  : types.map(e=> {
              return (<h4>{e.name}</h4>)
          })}
          {/* { arrayDeTypes[0].map(e => {
        return (
          <h4>{e.split("")[0].toUpperCase()+e.slice(1)}</h4>
        )
      })} */}
      
        </div>
      
      </div>
      
      
      
    </div>
    

    
    </div>
  )
}
