import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Formulario from '../components/Formulario'

const EditarCliente = () => {
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);

  const { id } = useParams();


  useEffect(() => {
    const obtenerClienteAPI = async () => {
      try {
        const url = `http://localhost:4000/clientes/${id}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        // Esto es lo que se guarda en el STATE
        setCliente(resultado);
      } catch (error) {
        console.log(error);
      }
      setCargando(!cargando);
    };
    obtenerClienteAPI();
  }, []);

  return (
    <>
    <h1 className='font-black text-4xl text-blue-900 text-center'>Editar Cliente</h1>
    <p className='mt-3'>Utiliza Este Formulario Para Editar datos de un cliente</p>
    {cliente?.nombre ? (<Formulario 
      cliente={cliente}
      cargando={cargando}
    />) : <p>Cliente ID No Válido</p>}
    
</>
  )
}

export default EditarCliente