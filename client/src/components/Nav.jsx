import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styleNav from "./css/Nav.module.css";
import { searchByName } from "../redux/actions";
import {
  filtroAllsApiDb,
  filtroOrdenAlfabetico,
  filtroOrdenFuerza,
  filtroPorType,
} from "../redux/actions";

export default function Nav({ setRefresh, refresh }) {
  const estado = useSelector((state) => state.alltypes);
  const [state, setState] = useState("");
  const [dis , setDis] = useState(true)


  const dispacht = useDispatch();
  const handleChange = (e) => {
    
    
    
    
    setState(e.target.value);

    if(state !== "" || state.length > 0){
      setDis(false)
  }else{
      setDis(true)
  }

  };

  const onBlurr = (e) =>{
    if(!state.length > 0 && state === "" && state.trim() === ""){
      setDis(true)
  }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispacht(searchByName(state));

    setState("");
  };

  const handleChangeResults = (e) => {
    e.preventDefault();
    dispacht(filtroAllsApiDb(e.target.value));
    setRefresh(refresh + 1);
  };

  const handleChangeAlpha = (e) => {
    e.preventDefault();
    dispacht(filtroOrdenAlfabetico(e.target.value));
    setRefresh(refresh + 1);
  };

  const handleChangeStr = (e) => {
    e.preventDefault();
    dispacht(filtroOrdenFuerza(e.target.value));
    setRefresh(refresh + 1);
  };

  const filterType = (e) => {
    e.preventDefault();
    dispacht(filtroPorType(e.target.value));
    setRefresh(refresh + 1);
  };

  return (
    <div className={styleNav.conteiner}>
      <div>
        <label>Pokemones</label>
        <select onChange={(e) => handleChangeResults(e)}>
          <option value="all">Todos</option>,<option value="api">API</option>,
          <option value="created">CREADOS</option>,
        </select>
      </div>

      <div>
        <label>Orden Alfabetico</label>
        <select onChange={(e) => handleChangeAlpha(e)}>
          <option value="defect">---------</option>,
          <option value="ascendingA">Ascendente</option>,
          <option value="descendingA">Descendente</option>,
        </select>
      </div>

      <div>
        <label>Orden Fuerza</label>
        <select onChange={(e) => handleChangeStr(e)}>
          <option value="defect">---------</option>,
          <option value="ascendingB">Ascendente</option>,
          <option value="descendingB">Descendente</option>,
        </select>
      </div>
      <div>
        <label>Orden por Tipo</label>
        <select
          onChange={(e) => {
            filterType(e);
          }}
        >
          <option value="all">Todos</option>
          {estado &&
            estado.map((t) => {
              return (
                <>
                  <option value={t.name}>{t.name}</option>
                </>
              );
            })}
        </select>
      </div>

      <div className={styleNav.conteiner2}>
        <div className={styleNav.buscador}>
          <input type="text" onChange={(e) => handleChange(e)} onBlur={(e)=> onBlurr(e) }/>
          <button disabled={dis}  onClick={(e) => handleSubmit(e)}  >Buscar</button>
        </div>
        <div>
          <Link to="/createPokemon">Create Pokemon</Link>
        </div>
      </div>
    </div>
  );
}
