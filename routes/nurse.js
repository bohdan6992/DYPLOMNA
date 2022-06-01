const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const students = require('../controller/students');

router.get('/', async (req, res) => {
  const studentsList = await students.getAllStudents();
  res.render('nurse', { studentsList });
});

router.get('/:id', async (req, res, next) => {
  const student = await students.getStudentById(req.params.id);
  res.render('nurseUpdate', { student });
});

router.post('/:id', upload.none(), async (req, res, next) => {
  await students.updateStudentById(req.body);
  res.send('update is ok');
});

module.exports = router;
