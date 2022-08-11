import React from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate} from 'react-router-dom'
import * as Yup from "yup";
import Alerta from "./Alerta";
import Spinner from './Spinner'

const Formulario = ({cliente, cargando}) => {

  const navigate = useNavigate();

  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
      .max(20, "El nombre es muy largo")
      .min(3, "El nombre es muy corto")
      .required("El Nombre del Cliente es Obligatorio"),
    
      empresa: Yup.string()
    .required("El nombre de la empresa es obligatorio"),
    
    email: Yup.string()
      .email("Email no válido")
      .required("El email es obligatorio"),
    
      telefono: Yup.number()
      .positive("Numero no válido")
      .integer("Numero No Valido")
      .typeError("El Número no es válido"),
  });

  const handleSubmit = async (valores) => {
    try {
      let resultado
      if(cliente.id){
        // Editando
        const url = `http://localhost:4000/clientes/${cliente.id}`
         resultado = await fetch(url, {
          method: 'PUT',
          body: JSON.stringify(valores),
          headers: {
            'Content-Type' : 'application/json'
          }
        });
        
      } else {
        // Nuevo Registro
        const url = 'http://localhost:4000/clientes'
         resultado = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(valores),
          headers: {
            'Content-Type' : 'application/json'
          }
        });
        
        
      }

      const respuesta = await resultado.json();
      navigate('/clientes')
    } catch (error) {
      console.log(error)
    }
  };

  return (
    cargando ? <Spinner/> : ( 
      <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx:auto">
        <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
          {cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente' }
        </h1>

        <Formik
        
          initialValues={{
            nombre: cliente?.nombre ?? '',
            empresa: cliente?.empresa ?? '',
            email: cliente?.email ?? '',
            telefono: cliente?.telefono,
            notas: cliente.notas ? cliente.notas : ''
          }}
          enableReinitialize={true}
          onSubmit={ async (values, {resetForm}) => {
            await handleSubmit(values);

            resetForm()
          }}
          validationSchema={nuevoClienteSchema}
        >
          {({ errors, touched }) => {
            return (
              <Form className="mt-10">
                <div className="mb-4">
                  <label className="text-gray-800" htmlFor="nombre">
                    Nombre :
                  </label>
                  <Field
                    id="nombre"
                    placeholder="Nombre Del Cliente"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    name="nombre"
                  />
                  {/* <ErrorMessage name="nombre" /> */}
                  {errors.nombre && touched.nombre ? (
                    <Alerta>{errors.nombre}</Alerta>
                  ) : null}
                </div>
                <div className="mb-4">
                  <label className="text-gray-800" htmlFor="empresa">
                    Empresa :
                  </label>
                  <Field
                    id="empresa"
                    placeholder="Empresa del Cliente"
                    type="text"
                    name="empresa"
                    className="mt-2 block w-full p-3 bg-gray-50"
                  />
                  {errors.empresa && touched.empresa ? (
                    <Alerta>{errors.empresa}</Alerta>
                  ) : null}
                </div>
                <div className="mb-4">
                  <label className="text-gray-800" htmlFor="email">
                    Email :
                  </label>
                  <Field
                    id="email"
                    placeholder="Email Del Cliente"
                    type="email"
                    name="email"
                    className="mt-2 block w-full p-3 bg-gray-50"
                  />
                  {errors.email && touched.email ? (
                    <Alerta>{errors.email}</Alerta>
                  ) : null}
                </div>
                <div className="mb-4">
                  <label className="text-gray-800" htmlFor="telefono">
                    Telefono :
                  </label>
                  <Field
                    id="telefono"
                    placeholder="Telefono Del Cliente"
                    type="tel"
                    name="telefono"
                    className="mt-2 block w-full p-3 bg-gray-50"
                  />
                  {errors.telefono && touched.telefono ? (
                    <Alerta>{errors.telefono}</Alerta>
                  ) : null}
                </div>
                <div className="mb-4">
                  <label className="text-gray-800" htmlFor="notas">
                    Notas :
                  </label>
                  <Field
                    as="textarea"
                    id="notas"
                    placeholder="Notas Del Cliente"
                    type="text"
                    name="notas"
                    className="mt-2 block w-full p-3 bg-gray-50"
                  />
                </div>
                <input
                  type="submit"
                  value={cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente' }
                  className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold hover:bg-blue-900"
                />
              </Form>
            );
          }}
        </Formik>
      </div>
    )
  );
};

Formulario.defaultProps = {
  cliente : {},
  cargando: false
}

export default Formulario;
