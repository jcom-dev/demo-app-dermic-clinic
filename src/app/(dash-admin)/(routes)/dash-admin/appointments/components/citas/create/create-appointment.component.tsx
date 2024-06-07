"use client"
import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAddAppointmentMutation } from './store/service';
import { Appointment } from './interface';
interface Props {
    hour?: any;
    room?: any;
    date?: any;
    closePopup?: any;
    employee?: any;
}

const validationSchema = Yup.object({
    procedimiento: Yup.object({
        id_procedimiento: Yup.number().required('Requerido')
    }),
    empresa: Yup.object({
        id_empresa: Yup.number().required('Requerido')
    }),
    usuario_registro: Yup.object({
        id_usuario: Yup.number().required('Requerido')
    }),
    paciente: Yup.object({
        id_paciente: Yup.number().required('Requerido')
    }),
    sede: Yup.object({
        id_sede: Yup.number().required('Requerido')
    }),
    fecha_cita: Yup.date().required('Requerido'),
    empleado: Yup.object({
        id_empleado: Yup.number().required('Requerido')
    }),
    hora: Yup.object({
        descripcion: Yup.string().required('Requerido')
    }),
    estado: Yup.boolean().required('Requerido')
});
export function CreateAppointmentComponent({ hour, room, date, closePopup, employee }: Props) {

    const [addAppointment, { isLoading }] = useAddAppointmentMutation()

    console.log(room.id_sala_tratamiento)
    const formik = useFormik<Appointment>({
        initialValues: {
            procedimiento: {
                id_procedimiento: 2
            },
            empresa: {
                id_empresa: room?.sede?.empresa?.id_empresa
            },
            usuario_registro: {
                id_usuario: 2
            },
            paciente: {
                id_paciente: 1
            },
            sede: {
                id_sede: room?.sede.id_sede
            },
            fecha_cita: date,
            empleado: {
                id_empleado: 2
            },
            hora: {
                id_cabecera: 10,
                id_cabecera_detalle: hour?.id_cabecera_detalle,
                descripcion: hour?.descripcion,
                valor: ""
            },
            estado: true
        },
        validationSchema,
        onSubmit: async (values) => {
            // console.log('Form values:', values);
            await addAppointment(values)
        },
    })
    return (
        <div
            className="fixed inset-0  flex justify-end items-center bg-black bg-opacity-50"
        >
            <div
                className='bg-white p-4 w-4/6  rounded-s-xl shadow-lg max-h-full h-full overflow-y-auto'>
                <div className='flex justify-between items-center mb-4'>
                    <h2 className="text-xl font-bold">Crear cita</h2>
                    <button onClick={closePopup} className="text-gray-500 hover:text-gray-700">
                        Cerrar
                    </button>
                </div>
                <div className='flex justify-between'>
                    <h1>Hora: {hour?.descripcion}</h1>
                    <span>{date}</span>
                </div>
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="procedimiento.id_procedimiento">Procedimiento ID</label>
                        <input
                            id="procedimiento.id_procedimiento"
                            name="procedimiento.id_procedimiento"
                            type="number"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.procedimiento.id_procedimiento}
                            className="border border-gray-300 rounded-md p-2 w-full"
                        />
                        {formik.touched.procedimiento?.id_procedimiento && formik.errors.procedimiento?.id_procedimiento ? (
                            <div className="text-red-600">{formik.errors.procedimiento.id_procedimiento}</div>
                        ) : null}
                    </div>

                    <div>
                        <label htmlFor="usuario_registro.id_usuario">Doctor</label>
                        <input
                            id="usuario_registro.id_usuario"
                            name="usuario_registro.id_usuario"
                            type="number"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.usuario_registro.id_usuario}
                            className="border border-gray-300 rounded-md p-2 w-full"
                        />
                        {formik.touched.usuario_registro?.id_usuario && formik.errors.usuario_registro?.id_usuario ? (
                            <div className="text-red-600">{formik.errors.usuario_registro.id_usuario}</div>
                        ) : null}
                    </div>
                    <div>
                        <label htmlFor="paciente.id_paciente">Paciente ID</label>
                        <input
                            id="paciente.id_paciente"
                            name="paciente.id_paciente"
                            type="number"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.paciente.id_paciente}
                            className="border border-gray-300 rounded-md p-2 w-full"
                        />
                        {formik.touched.paciente?.id_paciente && formik.errors.paciente?.id_paciente ? (
                            <div className="text-red-600">{formik.errors.paciente.id_paciente}</div>
                        ) : null}
                    </div>


                    <div>
                        <label htmlFor="empleado.id_empleado">Doctor</label>
                        <input
                            id="empleado.id_empleado"
                            name="empleado.id_empleado"
                            type="number"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.empleado.id_empleado}
                            className="border border-gray-300 rounded-md p-2 w-full"
                        />
                        {formik.touched.empleado?.id_empleado && formik.errors.empleado?.id_empleado ? (
                            <div className="text-red-600">{formik.errors.empleado.id_empleado}</div>
                        ) : null}
                    </div>

                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                        {isLoading ? "Creando..." : "Crear"}
                    </button>
                </form>

            </div>
        </div>
    )
}