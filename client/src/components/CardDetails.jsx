import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getId, clearDetail} from "../redux/actions";
import styleCardDetail from "./css/CardDetail.module.css";
import { Link } from "react-router-dom";

export default function CardDetails() {
  const { id } = useParams();
  const dispacht = useDispatch();

  useEffect(() => {
    dispacht(getId(id));

    return () => {
      dispacht(clearDetail())
    };
  }, [dispacht, id]);


  const estado = useSelector((state) => state.pokemonDetail);


  return (
    <div className={styleCardDetail.padre}>
      <Link className={styleCardDetail.volver} to="/home">
        Volver
      </Link>

      {estado.id ? (
        <div className={styleCardDetail.conteiner}>
          <div className={styleCardDetail.conteinerimg}>
            <div className={styleCardDetail.circle}></div>
            <img src={estado.image} alt={estado.name} />
          </div>

          <div className={styleCardDetail.conteinerInf}>
            <h2 style={{ color: "white", fontSize: "45px" }}>
              {" "}
              {estado.name.split("")[0].toUpperCase() + estado.name.slice(1)}
            </h2>
            <h4>
              Tipos:{" "}
              {typeof estado.types[0] === "object"
                ? estado.types.map((e) => (
                    <h4
                      key={e.id}
                      style={{
                        display: "inline",
                        margin: "3px",
                        background: "none",
                      }}
                    >
                      {e.name}
                    </h4>
                  ))
                : estado.types.map((e) => (
                    <h4
                      key={e.id}
                      style={{
                        display: "inline",
                        margin: "3px",
                        background: "none",
                      }}
                    >
                      {e}
                    </h4>
                  ))}
            </h4>
            <h4>
              ID:{" "}
              {String(estado.id).length <= 2
                ? estado.id
                : String(estado.id).slice(0, 3) + "..."}
            </h4>
            <br />
            <h4 style={{ color: "white", fontSize: "25px" }}>Estadisticas:</h4>
            <h4>Vida: {estado.life}</h4>
            <h4>Ataque: {estado.attack}</h4>
            <h4>Defensa: {estado.defense}</h4>
            <h4>Velocidad: {estado.spedd}</h4>
            <h4>Altura: {estado.height}</h4>
            <h4>Peso: {estado.weight}</h4>
          </div>
          
        </div>
      ) : (
        <h2>Cargando...</h2>
      )}
    </div>
  );
}
