const express = require('express');
const router = express.Router();
const multer = require('multer');
const { addMarkByStudentId } = require('../controller/students');
const upload = multer();
const students = require('../controller/students');

router.get('/', async (req, res) => {
  const classMath = await students.getCountAllClass();
  res.render('class', classMath);
});

router.get('/:class', async (req, res) => {
  const studentsList = await students.getStudentByClass(req.params);
  res.render('classCreate', {studentsList: studentsList});
});

router.get('/student/:id', async (req, res, next) => {
  const student = await students.getStudentById(req.params.id);
  const marksTable = await students.getMarksTable(req.params.id);

  res.render('student', { student, marksTable });
});

router.post('/student/:id', upload.none(), async (req, res) => {
  await addMarkByStudentId(req);
  res.send(`Mark ${req.body.mark} has been aded`)
});

module.exports = router;
