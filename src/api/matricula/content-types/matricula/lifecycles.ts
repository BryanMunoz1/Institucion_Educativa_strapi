// Path: ./src/api/matricula/content-types/matricula/lifecycles.ts
module.exports = {
  beforeCreate: async (event) => {
    const { data } = event.params;
    
    // Verificación de estudiante matriculado
    if (data.estudiantes && data.estudiantes.length > 0 && data.cursos && data.cursos.length > 0) {
      const estudianteId = data.estudiantes[0].id || data.estudiantes[0];
      const cursoId = data.cursos[0].id || data.cursos[0];
      
      // Verificar si ya existe una matrícula para este estudiante en este curso
      const existingMatriculas = await strapi.entityService.findMany('api::matricula.matricula', {
        filters: {
          estudiantes: { id: estudianteId },
          cursos: { id: cursoId }
        }
      });
      
      if (existingMatriculas.length > 0) {
        throw new Error('El estudiante ya está matriculado en este curso.');
      }
      
      // Verificar la capacidad máxima del curso
      const targetCurso = await strapi.entityService.findOne('api::curso.curso', cursoId, {
        populate: ['matricula']
      });
      
      // Obtener el número actual de matrículas para el curso
      const matriculasCount = await strapi.entityService.count('api::matricula.matricula', {
        filters: {
          cursos: { id: cursoId }
        }
      });
      
      if (targetCurso && matriculasCount >= targetCurso.capacidad_maxima) {
        throw new Error('El curso ha alcanzado su capacidad máxima de estudiantes.');
      }
    }
  }
};