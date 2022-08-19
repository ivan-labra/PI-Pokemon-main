import React from "react";
import Card from "./Card";
import styleCards from "./css/Cards.module.css";
export default function Cards({ estado }) {

  /* console.log(estado)
  console.log(estado[estado.length-1])
  console.log(typeof estado[estado.length-1]) */
  return (
    <div className={styleCards.conteiner}>
      <div className={styleCards.conteiner2}>
      {estado[estado.length-1] !== null ?
          estado.map((e) => (
            <div key={e.id}>
              <Card name={e.name} id={`${e.id}`} types={e.types} image={e.image} />
            </div>
          ))
        :
        <h2>Cargando...</h2>
        }
      </div>
    </div>
  );
}
