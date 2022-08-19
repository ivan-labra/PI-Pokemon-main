import React from 'react'
import img from "../static/imagen.jpg"
import styleLandingPage from "./css/LandingPage.module.css"
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getPokemons, getTypes } from '../redux/actions'
export default function LandingPage() {

  const dispacht = useDispatch()
  useEffect(()=>{
    dispacht(getPokemons())
  },[dispacht]) 
  useEffect(()=>{
    dispacht(getTypes())
  },[dispacht]) 

  return (
    
    <div  className={styleLandingPage.conteiner}>
    
    
    
    <p>Api-Pokemon</p>
      
    
        <Link to="/home"><button>Ingresar</button></Link>
      <img src={img} alt="" />
    
    </div>
  )
}
