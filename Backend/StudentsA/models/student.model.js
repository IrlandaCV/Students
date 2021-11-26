"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentASchema = Schema({
  studentId: {
    type: Number,
    require: true,
    unique: true,
  },
  first_name: {
    type: String,
    require: true,
  },
  last_name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  cellphone: {
    type: Number,
    require: true,
  },
  createdAt: {
    type: Date,
    require: true,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    require: true,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Student", studentASchema);
