import React, { Fragment, useState } from 'react'
import Error from './Error'
import PropTypes from 'prop-types';

const Pregunta = ({
  guardarPresupuesto,
  guardarRestante,
  actualizarPregunta
}) => {
  //Agrego el state de la pregunta acá, ya que no pasa por los diferentes componentes, si no es mas bien local
  const [cantidad, guardarCantidad] = useState(0)
  const [error, guardarError] = useState(false)

  //Funcion que lee el presupuesto
  const definirPresupuesto = e => {
    guardarCantidad(e.target.valueAsNumber)
  }

  //Submit para definir el presupuesto
  const agregarPresupuesto = e => {
    e.preventDefault()
    //Luego hago la validacion
    if (cantidad < 1 || isNaN(cantidad)) {
      guardarError(true)
      return
    }

    //Si en la validacion esta todo OK, eliminare el mensaje de Error en caso que lo hubiese y guardare el presupuesto ingresado:
    guardarError(false)
    guardarPresupuesto(cantidad)
    guardarRestante(cantidad)
    //Cuando paso la validacion seteo la parte que pregunta el presupuesto a False
    actualizarPregunta(false)
  }

  return (
    <Fragment>
      <h2>Coloca tu presupuesto</h2>

      {error ? <Error mensaje='El Presupuesto es Incorrecto' /> : null}

      <form onSubmit={agregarPresupuesto}>
        <input
          type='number'
          className='u-full-width'
          placeholder='Coloca tu presupuesto'
          onChange={definirPresupuesto}
        />
        <input
          type='submit'
          className='button-primary u-full-width'
          value='Definir Presupuesto'
        />
      </form>
    </Fragment>
  )
}

Pregunta.propTypes = {
    guardarPresupuesto: PropTypes.func.isRequired,
    guardarRestante: PropTypes.func.isRequired,
    actualizarPregunta: PropTypes.func.isRequired,
}

export default Pregunta
