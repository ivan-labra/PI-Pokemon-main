import axios from "axios";

export const ALLPOKEMONS = "ALLPOKEMONS";
export const CREATEPOKEMON = "CREATEPOKEMON";
export const GETALLTYPES = "GETALLTYPES";
export const GETIDPK = "GETIDPK";
export const CLEARDETAIL = "CLEARDETAIL";
export const SEARCHNAME = "SEARCHNAME";
export const FILTERALLAPIDB = "FILTERALLAPIDB";
export const FILTERORDERALFABETICO = "FILTERORDERALFABETICO";
export const FILTERORDERFUERZA = "FILTERORDERFUERZA";
export const FILTERTYPE = "FILTERTYPE";




export const getPokemons = () => async (dispacht) => {
  try {
    const res = await axios.get("http://localhost:3001/");
  return dispacht({ type: ALLPOKEMONS, payload: res.data });
  } catch (error) {
    console.log(error)
    alert("A ocurrido un error al traer todos los pokemons, por favor veulva a intentarlo.")
  }
};

export const postCreate = (i) => async (dispatch) => {

  try {
    let res = await axios.post(`http://localhost:3001/create`, i);
  return dispatch({
    type: CREATEPOKEMON,
    payload: res.data,
  });
  } catch (error) {
    console.log(error)
    alert("A ocurrido un error al traer al pokemon creado, por favor veulva a intentarlo.")
  }
  
};

export const getTypes = () => async (dispacht) => {
  
  try {
    const res = await axios.get(`http://localhost:3001/types`);

    return dispacht({
    type: GETALLTYPES,
    payload: res.data,
  });
  } catch (error) {
    console.log(error)
    alert("A ocurrido un error al llamar a los types, por favor veulva a intentarlo.")
  }
  
};

export const getId = (id) => async (dispacht) => {
  
  try {
    const res = await axios(`http://localhost:3001/pokemons/${id}`);
  return dispacht({
    type: GETIDPK,
    payload: res.data,
  });
  } catch (error) {
    console.log(error)
    alert("A ocurrido un error, por favor veulva a intentarlo.")
  }
  
};

export const clearDetail = () => (dispacht) => {
  return dispacht({
    type: CLEARDETAIL,
  });
};

export const searchByName = (name) => async (dispacht) => {
  try {
    const res = await axios.get(`http://localhost:3001/?name=${name}`);
  return dispacht({
    type: SEARCHNAME,
    payload: res.data,
  });
  } catch (error) {
    console.log(error)

    alert("No se encontro el pokemon que andas buscando.")
  }
  
};

export const filtroAllsApiDb = (value) => (dispacht) => {
  return dispacht({
    type: FILTERALLAPIDB,
    payload: value,
  });
};

export const filtroOrdenAlfabetico = (value) => (dispacht) => {
  return dispacht({
    type: FILTERORDERALFABETICO,
    payload: value,
  });
};

export const filtroOrdenFuerza = (value) => (dispacht) => {
  return dispacht({
    type: FILTERORDERFUERZA,
    payload: value,
  });
};

export const filtroPorType = (value) => (dispacht) => {
  return dispacht({
    type: FILTERTYPE,
    payload: value,
  });
};






