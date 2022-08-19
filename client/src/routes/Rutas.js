import Home from "../components/Home"
import CreaetePokemon from "../components/CreaetePokemon"
import CardDetails from "../components/CardDetails"
import LandingPage from "../components/LandingPage"
import { Route, Routes } from "react-router-dom";
import NotFound from "../components/NotFound";
const Rutas = () => {


return(
    <>
    
    <Routes>
    <Route exact path="/home" element={<Home />}/>
        <Route exact path="/createPokemon" element={<CreaetePokemon />}/>
        <Route exact path="/cardDetail/:id" element={<CardDetails />}/>
        <Route exact path="/" element={<LandingPage />}/>
        <Route path="*" element={<NotFound />} />
    </Routes>
    
</>
)

}

export default Rutas;
