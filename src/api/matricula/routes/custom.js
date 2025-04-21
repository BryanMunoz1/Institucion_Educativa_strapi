// api/matricula/routes/custom.js
'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/students-by-course/:cursoId',
      handler: 'custom.getStudentsByCourse',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/count-students-by-course/:cursoId',
      handler: 'custom.countStudentsByCourse',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/courses-by-student/:estudianteId',
      handler: 'custom.getCoursesByStudent',
      config: {
        auth: false,
      },
    },
  ],
};