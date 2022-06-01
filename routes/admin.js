const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const students = require('../controller/students');
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/', authMiddleware(['USER']), async (req, res) => {
  const studentsList = await students.getAllStudents();
  res.render('admin', { studentsList });
});

router.get('/delete/:id', authMiddleware(['USER']), async (req, res, next) => {
  await students.deleteStudent(req);
  res.redirect('/admin');
});

router.get('/create', authMiddleware(['USER']), async (req, res, next) => {
  res.render('adminCreate');
});

router.post('/create', authMiddleware(['USER']), upload.none(), async (req, res, next) => {
  await students.createStudent(req.body);
  res.send(` ${req.body.name} created`);
});

router.get('/:id', authMiddleware(['USER']), async (req, res, next) => {
  const student = await students.getStudentById(req.params.id);
  res.render('adminUpdate', { student });
});

router.post('/:id', authMiddleware(['USER']), upload.none(), async (req, res, next) => {
  await students.updateStudentById(req.body);
  res.send('update is ok');
});

module.exports = router;
