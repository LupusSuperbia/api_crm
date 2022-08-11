import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Formulario from '../components/Formulario'
import Spinner from '../components/Spinner'

const EditarCliente = () => {
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);

  const { id } = useParams();


  useEffect(() => {
    const obtenerClienteAPI = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/${id}`;
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
    {cargando ? <Spinner/> : (
      <>
    <h1 className='font-black text-4xl text-blue-900 text-center'>Editar Cliente</h1>
    <p className='mt-3'>Utiliza Este Formulario Para Editar datos de un cliente</p>
    {cliente?.nombre ? (<Formulario 
      cliente={cliente}
      cargando={cargando}
    />) : <p>Cliente ID No Válido</p>}
    </>)}
</>
  )
}

export default EditarCliente