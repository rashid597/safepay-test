import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_PATH = 'http://127.0.0.1:5000';
const GET_ALL_STUDENTS_PATH = '/students';
const QUERIES_PATH = '/student';

interface Student {
  uuid: number;
  class: number;
  name: string;
  sex: string;
  age: number;
  siblings: number;
  gpa: number;
}

interface StudentInput {
  class: number;
  name: string;
  sex: string;
  age: number;
  siblings: number;
  gpa: number;
}

interface StudentUpdate {
  uuid: number;
  class: number;
  name: string;
  sex: string;
  age: number;
  siblings: number;
  gpa: number;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_PATH }),
  endpoints: (builder) => ({

    // get all students
    getStudent: builder.query<Student[], void>({
      query: () => GET_ALL_STUDENTS_PATH,
    }),

    // create a student
    createStudent: builder.mutation<Student, StudentInput>({
      query: (student) => ({
        url: '/student',
        method: 'POST',
        body: student,
      }),
    }),


    //  update a student
    updateStudent: builder.mutation<Student, StudentUpdate>({
      query: ( { uuid, ...update } ) =>({
        url: `${QUERIES_PATH}/${uuid}`,
        method: 'PUT',
        body: update,
      })
    }),

    // delete a student
    deleteStudent: builder.mutation<void, number>({
      query: id =>({
        url: `${QUERIES_PATH}/${id}`,
        method: 'DELETE'
      })
    }),

  }),
})

export const { endpoints: { getStudent } } = apiSlice;

export const { useGetStudentQuery, useCreateStudentMutation, useUpdateStudentMutation, useDeleteStudentMutation } = apiSlice;
