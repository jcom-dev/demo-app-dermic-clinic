import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`;

export const putRoomProcedureApi = createApi({
    reducerPath: 'putRoomProcedureApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            const token = Cookies.get('token');
            headers.set('Authorization', `Bearer ${token}`);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        updateRoomProcedure: builder.mutation({
            query: ({ roomProcedureId, roomProcedureData }) => ({
                url: `procedimiento_sala/${roomProcedureId}`,
                method: 'PUT',
                body: roomProcedureData,
            }),
        }),
    }),
});

export const { useUpdateRoomProcedureMutation } = putRoomProcedureApi;