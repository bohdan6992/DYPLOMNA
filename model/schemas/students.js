const { Schema, model } = require('mongoose');

const student = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 50,
  },
  surname: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 50,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
  },
  age: Number,
  birthDate: String,
  health: {
    blood: {
      type: String,
      enum: ['I', 'II', 'III', 'IV'],
    },
    resus: Boolean,
    width: Number,
    weight: Number,
  },
  adress: {
    type: String,
    minlength: 10,
    maxlength: 150,
  },
  family: {
    father: {
      name: {
        type: String,
        maxLength: 50,
      },
      surname: {
        type: String,
        maxLength: 50,
      },
      number: String,
    },
    mother: {
      name: {
        type: String,
        maxLength: 50,
      },
      surname: {
        type: String,
        maxLength: 50,
      },
      number: String,
    },
  },
  class: {
    type: String,
    enum: ['Math', 'Filology', 'Nature'],
  },
  classNumber: String,
  marks: [Number],
});

module.exports = model('Student', student);
