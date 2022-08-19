import React from "react";
import { useState, useEffect } from "react";
import { postCreate } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import styleCreatePokemon from "./css/CreatePokemon.module.css"
import { Link } from "react-router-dom";

const initialData = {
  name: "",
  image: "",
  life: 0,
  attack: 0,
  defense: 0,
  spedd: 0,
  height: 0,
  weight: 0,
  types: [],
};
const obj = {types : []}

export default function CreaetePokemon() {
  const dispatch = useDispatch();
  const [input, setInput] = useState(initialData);
  const [errors, setErrors] = useState("");
  const estado = useSelector((state) => state);

  useEffect(() => {
    setErrors(validate(input));
  }, []);

  const handleSelect = (e) => {
    let valor = e.target.value.split(" ").slice(1);

    let valor2 = e.target.value.slice(0,2)
    valor2 = valor2.toLowerCase()
    valor = valor[0].toLowerCase() 

    let comprobar

    if(obj.types.length !== 0){
      if(obj.types.length >= 3)return alert("No puedes agregar mas de 3 tipos.")
      comprobar = obj.types.find((u) => u === valor);
    }
    
    
    if(comprobar) {
      alert("Ya se encuentra ese tipo seleccionado.")
    } else {
      setInput({
        ...input,
        types: [...input.types, valor2],
      });
      obj.types.push(valor)
      setErrors(
        validate({
          ...input,
          [e.target.name]: valor2,
        })
      );
    }
  };

  const handleClearType = () => {
    setInput({
      ...input,
      types: [],
    });
    obj.types = [];
  };
  const handleChange = (e) => { 
    
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };
  const validate = (input) => {
    let errors = {};

      if(!input.name){
        errors.name = "Por favor introduce un nombre al pokemon."
      }
      if(input.name === "" || input.name.trim() === "") {
        errors.name = "Por favor introduce un Nombre al pokemon.";
      } else if (!input.name.match(/^[a-zA-Z_]+( [a-zA-Z_]+)*$/)) {
        errors.name = "Por favor introduce un Nombre sin espacios y sin Numeros.";
      } else if (estado.allPokemons.find((e) => e.name.toLowerCase() === input.name.toLowerCase())) {
        errors.name = "Este nombre ya existe.";
      }
    
    if (!input.image) {
      errors.image = "Tienes que introducir una Url a la imagen.";
    } else if (!input.image.match(/^(ftp|http|https):\/\/[^ "]+$/)) {
      errors.image = "Tienes que introducir una Url valida";
    }
    if (input.types.length === 0) {
      errors.types = "Tienes que elegir al menos un tipo para el pokemon.";
    }

      return errors;
  };

  const sumbitCreate = (e) => {
    e.preventDefault();

    const aux = validate(input);
    setErrors(aux);

    if (Object.keys(aux).length === 0) {

      dispatch(postCreate(input));
      alert("Has creado tu poquemon con exito.");

      setInput(initialData);
      obj.types = [];
    }
  };

  return (
    <div className={styleCreatePokemon.conteiner}>
      <Link to="/home">
      <button>Volver</button>
      </Link>
      
      <div className={styleCreatePokemon.conteiner2}>
<form onSubmit={(e) => sumbitCreate(e)}>
        <div>
          <label htmlFor="Name">Name</label>
          <input
            type="text"
            id="Name"
            name="name"
            onChange={(e) => handleChange(e)}
            value={input.name}
          />
        </div>
        
        <div>
          <label htmlFor="Image">Image</label>
          <input
            type="text"
            id="Image"
            name="image"
            onChange={(e) => handleChange(e)}
            value={input.image}
          />
        </div>
        
        <div>
          <label htmlFor="Life">Life</label>
          <input
            type="number"
            id="Life"
            name="life"
            onChange={(e) => handleChange(e)}
            value={input.life}
          />
          
        </div>
        <div>
          <label htmlFor="Attack">Attack</label>
          <input
            type="number"
            id="Attack"
            name="attack"
            onChange={(e) => handleChange(e)}
            value={input.attack}
          />
        </div>
        <div>
          <label htmlFor="Defense">Defense</label>
          <input
            type="number"
            id="Defense"
            name="defense"
            onChange={(e) => handleChange(e)}
            value={input.defense}
          />
        </div>
        <div>
          <label htmlFor="Spedd">Spedd</label>
          <input
            type="number"
            id="Spedd"
            name="spedd"
            onChange={(e) => handleChange(e)}
            value={input.spedd}
          />
        </div>
        <div>
          <label htmlFor="Height">Height</label>
          <input
            type="number"
            id="Height"
            name="height"
            onChange={(e) => handleChange(e)}
            value={input.height}
          />
        </div>
        <div>
          <label htmlFor="Weight">Weight</label>
          <input
            type="number"
            id="Weight"
            name="weight"
            onChange={(e) => handleChange(e)}
            value={input.weight}
          />
        </div>
        <div>
          <label htmlFor="Types">Tipos</label>
          <select id="Types" onChange={(e) => handleSelect(e)}>
            {estado.alltypes && estado.alltypes.map((e) => {
              return (
                <option key={e.id} value={[e.id + " " + e.name]}>
                  {e.name}
                </option>
              );
            })}
          </select>
          
          
          <button onClick={() => handleClearType()}>Clear</button>
          
          
        </div>
        <input type="submit" value="Enviar" />
      </form>
      </div>
      
      
      <div className={styleCreatePokemon.errores}>
        <p>Errores: </p>
      {errors.name && <p>{errors.name}</p>}
      {errors.image && <p>{errors.image}</p>}
      {errors.types && <p>{errors.types}</p>}
      </div>
      <div className={styleCreatePokemon.types}>
          <p>Types:</p>
          {estado.alltypes && obj.types.map((e) => {
            return (
              <div key={e}>
                <p>{e}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
//{id:e.id,name:e.name}

/* if(!input.name){
    errors.name = "Por favor introduce un Nombre al pokemon."
  }else if(!input.name.match(/^[a-zA-Z_]+( [a-zA-Z_]+)*$/)){
    errors.name = "Por favor introduce un Nombre sin espacios y sin Numeros."
  }else if(estado.allPokemons.find(e => e.name === input.name)){
    errors.name = "Este nombre ya existe."
  }else if(!input.image){
    errors.image = "Tienes que introducir una Url a la imagen."
  }else if(!input.image.match(/^(ftp|http|https):\/\/[^ "]+$/)){
    errors.image = "Tienes que introducir una Url valida"
  }else if(input.types.length < 0){
    errors.types = "Tienes que elegir al menos un tipo para el pokemon."
  } */
