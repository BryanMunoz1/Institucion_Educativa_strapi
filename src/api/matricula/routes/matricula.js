'use strict';

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/matriculas',
      handler: 'matricula.create',
      config: {
        middlewares: ['api::matricula.validation'],
      },
    },
    {
      method: 'GET',
      path: '/matriculas',
      handler: 'matricula.find',
    },
    {
      method: 'GET',
      path: '/matriculas/:id',
      handler: 'matricula.findOne',
    },
    {
      method: 'PUT',
      path: '/matriculas/:id',
      handler: 'matricula.update',
    },
    {
      method: 'DELETE',
      path: '/matriculas/:id',
      handler: 'matricula.delete',
    },
  ],
};