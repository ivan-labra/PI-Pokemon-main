import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Nav from "../components/Nav";
import Cards from "./Cards";
import Paginado from "./Paginado";
import styleHome from "./css/Home.module.css";
import fondo from "../static/fondoHome/fondo-home.jpg"
import { useEffect } from "react";
export default function Home() {
  const [refresh, setRefresh] = useState(1);
  

  const estado = useSelector((state) => state.allPokemons);

  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(12);
  const indexOfLastPokemon = currentPage * pokemonsPerPage;// 12
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;// 0
  const currentPokemons = estado?.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

    useEffect(()=>{
      if(estado.length < 12){
        setCurrentPage(1)
      }
    },[estado])



  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className={styleHome.conteiner} style={{backgroundImage:`${fondo}`}}>
      <div>
        <Nav setRefresh={setRefresh} refresh={refresh} />
      </div>
      <div className={styleHome.paginado}>
        <Paginado
          paginate={paginate}
          pokemonsPerPage={pokemonsPerPage}
          allPk={estado.length}
        />
      </div>
      <div className={styleHome.conteiner2}>


      {
        estado.length === 0 
          ? 
          (<h2>Cargando...</h2>)
          :
        <Cards estado={currentPokemons} />
      }
      </div>
    <div className={styleHome.footer}>
      <p>Pagina by @Ivan</p>
      <p>Redes:  Instagram/facebook/Linkedin</p>
    </div>
    </div>
  );
}
//
