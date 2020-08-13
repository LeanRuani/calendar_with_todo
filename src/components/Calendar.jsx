import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ToDo from "./ToDo";

// STYLES
const Today = styled.div`
  color: #e3b434;
  display: inline;
  font-weight: bold;
`;

const Days = styled.div`
  text-align: center;
  height: 50px;
  &:hover {
    cursor: pointer;
    &:after {
      content: "📝";
    }
  }
`;

const Calendar = () => {
  const lista_meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const lista_dias = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo",
  ];
  const dias_calendario = [];

  const date = new Date();
  const DAY = date.getDate();
  const MONTH = date.getMonth();
  const YEAR = date.getFullYear();

  const [mes_actual, setMesActual] = useState(MONTH);
  const [año_actual, setAñoActual] = useState(YEAR);
  const [fecha_filtro, setFechaFiltro] = useState("");
  const [tareas, showTareas] = useState(false);

  // const [reciboTareas, setReciboTareas] = useState([]);
  var reciboTareas = [];

  const getBisiesto = () => {
    //Devuele true o false si es bisiesto o no
    return (
      (año_actual % 100 !== 0 && año_actual % 4 === 0) || año_actual % 400 === 0
    );
  };

  const getPrimerDia = () => {
    //Obtiene el dia en el que cae el numero
    const start = new Date(año_actual, mes_actual, 1);
    return start.getDay() - 1 === -1 ? 6 : start.getDay() - 1;
  };

  const getDiasTotales = (mes) => {
    if (mes === -1) mes = 11;

    //Devuelve la cantidad de dias segun el mes
    if (
      mes === 0 ||
      mes === 2 ||
      mes === 4 ||
      mes === 6 ||
      mes === 7 ||
      mes === 9 ||
      mes === 11
    ) {
      return 31;
    } else if (mes === 1 || mes === 3 || mes === 5 || mes === 8 || mes === 10) {
      return 30;
    } else {
      return getBisiesto() ? 29 : 28;
    }
  };

  const getMesCompleto = (mes) => {
    //Se guardan los dias del mes y parte del anterior
    for (var r = getPrimerDia(); r > 0; r--) {
      var resto = getDiasTotales(mes_actual - 1) - (r - 1);
      dias_calendario.push(resto);
    }
    for (var i = 1; i <= getDiasTotales(mes); i++) {
      dias_calendario.push(i);
    }
  };

  const mesAnterior = (mes) => {
    if (mes !== 0) {
      setMesActual(mes_actual - 1);
    } else {
      setMesActual(mes_actual + 11);
      setAñoActual(año_actual - 1);
    }
  };

  const mesSiguiente = (mes) => {
    if (mes !== 11) {
      setMesActual(mes_actual + 1);
    } else {
      setMesActual(mes_actual - 11);
      setAñoActual(año_actual + 1);
    }
  };

  const showToDo = (i) => {
    showTareas(true);
    const dia = i;
    const mes = mes_actual;
    const año = año_actual;
    setFechaFiltro(dia + "" + mes + "" + año);

    getLocalStorage();
  };

  const getLocalStorage = () => {
    const data = localStorage.getItem(`${fecha_filtro}`);
    reciboTareas = [data];
  };

  const comprueba = () => {};
  return (
    <>
      {getMesCompleto(mes_actual)}

      <div className="calendar">
        <div className="calendar__info">
          <div className="calendar__prev" id="prev-month">
            <button onClick={() => mesAnterior(mes_actual)}>aa</button>
          </div>
          <div className="calendar__month" id="month">
            {lista_meses[mes_actual]}
          </div>
          <div className="calendar__year" id="year">
            {año_actual}
            {/* <input value={año_actual} type="text" onChange={changeYear} /> */}
          </div>
          <div className="calendar__next" id="next-month">
            <button onClick={() => mesSiguiente(mes_actual)}>ss</button>
          </div>
        </div>

        <div className="calendar__week">
          {lista_dias.map((i) => (
            <div key={i} className="calendar__day calendar__item__week">
              {i}
            </div>
          ))}
        </div>
        <div className="calendar__dates">
          {dias_calendario.map((i) => (
            <Days
              key={Math.random()}
              className="calendar__item"
              id="dates"
              onClick={() => showToDo(i)}
            >
              {comprueba() === true && console.log("hay")}
              {i === DAY && mes_actual === MONTH ? <Today>{i}</Today> : i}
            </Days>
          ))}
        </div>
      </div>
      {tareas && (
        <ToDo cerrarTareas={cerrarTareas} fecha_filtro={fecha_filtro} />
      )}
    </>
  );
};

export default Calendar;
