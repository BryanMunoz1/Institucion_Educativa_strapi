// api/matricula/controllers/custom.js
'use strict';

module.exports = {
  async getStudentsByCourse(ctx) {
    const { cursoId } = ctx.params;
    
    if (!cursoId) {
      return ctx.badRequest('Course ID is required');
    }
    
    const students = await strapi.db.query('api::estudiante.estudiante').findMany({
      where: {
        matriculas: {
          curso: {
            id: cursoId
          }
        }
      }
    });
    
    return students;
  },
  
  async countStudentsByCourse(ctx) {
    const { cursoId } = ctx.params;
    
    if (!cursoId) {
      return ctx.badRequest('Course ID is required');
    }
    
    const count = await strapi.db.query('api::matricula.matricula').count({
      where: {
        curso: {
          id: cursoId
        }
      }
    });
    
    return { count };
  },
  
  async getCoursesByStudent(ctx) {
    const { estudianteId } = ctx.params;
    
    if (!estudianteId) {
      return ctx.badRequest('Student ID is required');
    }
    
    const courses = await strapi.db.query('api::curso.curso').findMany({
      where: {
        matriculas: {
          estudiante: {
            id: estudianteId
          }
        }
      }
    });
    
    return courses;
  }
};