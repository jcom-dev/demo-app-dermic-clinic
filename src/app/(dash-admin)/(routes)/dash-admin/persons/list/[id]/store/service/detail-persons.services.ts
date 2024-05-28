import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`;

export const employeeDetailApi = createApi({
    reducerPath: 'employeeDetailApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            const token = Cookies.get('token');
            headers.set('Authorization', `Bearer ${token}`);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getEmployeeById: builder.query({
            query: (id: number) => `empleado/${id}`,
        }),
    }),
});

export const { useGetEmployeeByIdQuery } = employeeDetailApi;

