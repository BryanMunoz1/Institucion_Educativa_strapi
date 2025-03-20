// Path: ./src/api/matricula/content-types/matricula/lifecycles.js
module.exports = {
    beforeCreate: async (event) => {
      const { data } = event.params;
      const { estudiante, curso } = data;
      
      // Verificar si ya existe una matrícula para este estudiante en este curso
      const existingMatriculas = await strapi.entityService.findMany('api::matricula.matricula', {
        filters: {
          estudiante: estudiante,
          curso: curso
        }
      });
      
      if (existingMatriculas.length > 0) {
        throw new Error('El estudiante ya está matriculado en este curso.');
      }
    }
  };
// Path: ./src/api/matricula/content-types/matricula/lifecycles.js
module.exports = {
    beforeCreate: async (event) => {
      const { data } = event.params;
      const { curso } = data;
      
      // Verificar si ya existe una matrícula para este estudiante en este curso (regla anterior)
      // ...
      
      // Verificar la capacidad máxima del curso
      const targetCurso = await strapi.entityService.findOne('api::curso.curso', curso, {
        populate: ['matriculas']
      });
      
      if (targetCurso.matriculas.length >= targetCurso.capacidad_maxima) {
        throw new Error('El curso ha alcanzado su capacidad máxima de estudiantes.');
      }
    }
  };