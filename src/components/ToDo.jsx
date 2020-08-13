import React, { useState } from "react";

const ToDo = (props) => {
  const fecha_filtro = props.fecha_filtro;
  var data2 = [];
  const [titulo, setTitulo] = useState("");
  const [tarea, setTarea] = useState("");
  const [ListaTareas, setListaTareas] = useState([]);

  const changeTitulo = (e) => {
    setTitulo(e.target.value);
  };

  const changeTarea = (e) => {
    setTarea(e.target.value);
  };

  const hanbleSubmit = (e) => {
    e.preventDefault();
    const mili = new Date().getMilliseconds();

    data2 = [
      {
        id: mili,
        fecha_filtro: fecha_filtro,
        titulo: titulo,
        tarea: tarea,
        completado: false,
      },
      ...data2,
    ];

    localStorage.setItem(`${fecha_filtro}`, JSON.stringify(data2));
  };

  return (
    <>
      <form className="form_todo" onSubmit={(e) => hanbleSubmit(e)}>
        <i>Estas en el dia {fecha_filtro} para agendar una tarea</i>
        <input
          name="titulo"
          placeholder="Titulo de la tarea"
          onChange={(e) => changeTitulo(e)}
        ></input>
        <textarea
          name="tarea"
          placeholder="Descipcion de la tarea"
          onChange={(e) => changeTarea(e)}
        ></textarea>
        <button onClick={(e) => hanbleSubmit(e)}>Save</button>
      </form>
    </>
  );
};

export default ToDo;
