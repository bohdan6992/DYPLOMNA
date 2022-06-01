const Student = require('./schemas/students');
const charToUpper = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


const createStudent = async (obj) => {
  const student = new Student({
    name: obj.name,
    surname: obj.surname,
    gender: obj.gender,
    age: obj.age,
    birthDate: obj.birthDate,
    health: {
      blood: obj.blood,
      resus: obj.resus,
      width: obj.width,
      weight: obj.weight,
    },
    family: {
      father: {
        name: obj.fatherName,
        surname: obj.fatherSurname,
        number: obj.fatherNumber,
      },
      mother: {
        name: obj.motherName,
        surname: obj.motherSurname,
        number: obj.motherNumber,
      },
    },
    adress: obj.adress,
    class: obj.class,
    classNumber: obj.classNumber,
    education: {
      name: obj.name,
      marks: obj.marks,
    },
  });
  try {
    await student.save();
  } catch (err) {
    console.log(err);
  }
};

const getAllStudents = async () => {
  const student = await Student.find({});
  return student;
};

const deleteStudentById = async (id) => {
  await Student.deleteOne({ _id: id });
};

const getStudentById = async (id) => {
  const student = await Student.find({ _id: id });
  return student[0];
};

const updateStudentById = async (obj) => {
  await Student.findOneAndUpdate(
    { _id: obj.id },
    {
      name: obj.name,
      surname: obj.surname,
      gender: obj.gender,
      age: obj.age,
      birthDate: obj.birthDate,
      health: {
        blood: obj.blood,
        resus: obj.resus !== '0',
        width: obj.width,
        weight: obj.weight,
      },
      family: {
        father: {
          name: obj.fatherName,
          surname: obj.fatherSurname,
          number: obj.fatherNumber,
        },
        mother: {
          name: obj.motherName,
          surname: obj.motherSurname,
          number: obj.motherNumber,
        },
      },
      adress: obj.adress,
      class: obj.class,
      classNumber: obj.classNumber,
      education: {
        name: obj.name,
        marks: obj.marks,
      },
    },
  );
};

const getCountAllClass = async (arr) => {
  const classCounters = [];
  for await (let item of arr) {
    const count = await Student.count({ class: item });
    classCounters.push(count);
  }
  return classCounters;
};

const getStudentByClass = async (req) => {
  const studentClass = await Student.find({ class: charToUpper(req) });
  return studentClass;
};

const addMark = async (obj) => {
  const student = await getStudentById(obj.id);
  student.marks.push(obj.mark);
  student.save();
}

module.exports = {
  createStudent,
  getAllStudents,
  deleteStudentById,
  getStudentById,
  updateStudentById,
  getCountAllClass,
  getStudentByClass,
  addMark,
};
