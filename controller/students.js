const {
  createStudent,
  getAllStudents,
  deleteStudentById,
  getStudentById,
  updateStudentById,
  getCountAllClass,
  getStudentByClass,
  addMark,
} = require('../model/students');

const students = {
  getAllStudents: async () => {
    return await getAllStudents();
  },
  deleteStudent: async (req) => {
    await deleteStudentById(req.params.id);
  },
  createStudent: async (obj) => {
    await createStudent(obj);
  },
  getStudentById: async (id) => {
    return  await getStudentById(id);
    
  } ,
  getMarksTable: async (id) => {
    const student =  await getStudentById(id);

    let markTable = student.marks.reduce((accum, item) => {
      return accum = `${accum}<td>${item}</td>`;
    }, '');
    return markTable;
  },
  updateStudentById: async (obj) => {
    await updateStudentById(obj);
  },
  getCountAllClass: async () => {
    const countArr = await getCountAllClass(['Math', 'Filology', 'Nature']);
    const counterObj = {
      classMath: countArr[0],
      classFilology: countArr[1],
      classNature: countArr[2],
      classAll: countArr.reduce((acc, curr) => {return acc + curr}, 0),
    }
    return counterObj;
  },
  getStudentByClass: async (req) => { 
    return await getStudentByClass(req.class);
  },
  addMarkByStudentId: async (req) => {
    return await addMark(req.body);
  },
};

module.exports = students;
