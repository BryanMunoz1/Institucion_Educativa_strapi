'use strict';

module.exports = {
  name: 'validation',
  config: {
    // Optional config
  },
  async handler(ctx, next) {
    const { curso_id, estudiante_id } = ctx.request.body.data || {};
    
    // Only run this validation on create and for matriculas endpoint
    if (ctx.method === 'POST' && ctx.url.includes('/matriculas') && curso_id && estudiante_id) {
      // Check if student is already enrolled in this course
      const existingEnrollment = await strapi.db.query('api::matricula.matricula').findOne({
        where: {
          curso: curso_id,
          estudiante: estudiante_id
        }
      });
      
      if (existingEnrollment) {
        return ctx.badRequest('El estudiante ya está matriculado en este curso');
      }
      
      // Check if course has reached maximum capacity
      const course = await strapi.db.query('api::curso.curso').findOne({
        where: { id: curso_id }
      });
      
      const enrollmentCount = await strapi.db.query('api::matricula.matricula').count({
        where: { curso: curso_id }
      });
      
      if (course && enrollmentCount >= course.capacidad_maxima) {
        return ctx.badRequest('El curso ha alcanzado su capacidad máxima de estudiantes');
      }
    }
    
    await next();
  }
};