import React, { useState } from "react";
import styled from "styled-components";

const Today = styled.div`
  color: #e3b434;
  text-align: center;
  height: 50px;
  font-weight: bold;
  &:hover {
    color: red; // <Thing> when hovered
  }
`;

const App = () => {
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

  const [dia_actual, setDiaActual] = useState(DAY);
  const [mes_actual, setMesActual] = useState(MONTH);
  const [año_actual, setAñoActual] = useState(YEAR);

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

  // const changeYear = (e) => {
  //   setMesActual(mes_actual);
  //   const año_nuevo = e.target.value;
  //   setAñoActual(año_nuevo);
  // };

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
          {mes_actual === MONTH
            ? dias_calendario.map((i) => (
                <div className="calendar__item" id="dates">
                  {i === dia_actual ? <Today>{i}</Today> : i}
                </div>
              ))
            : dias_calendario.map((i) => (
                <div className="calendar__item" id="dates">
                  {i}
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default App;
