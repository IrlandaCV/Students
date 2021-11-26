"use strict";

const StudentB = require("../models/studentB.model");

const StudentBController = {
  hello: function (req, res) {
    return res.status(200).send({ message: "Hola 2 mundo 2" });
  },

  // GUARDAR REGISTRO
  saveStudentB: async function (req, res) {
    const studentB = new StudentB();
    var params = req.body;

    if (
      !params.first_name ||
      !params.last_name ||
      !params.email ||
      !params.cellphone
    )
      return res.status(500).send({ message: "Campos invalidos" });

    studentB.first_name = params.first_name;
    studentB.last_name = params.last_name;
    studentB.email = params.email;
    studentB.cellphone = params.cellphone;

    let studentId = 0;

    const students = await StudentB.find({});

    if (students.length == 0) {
      studentId = 0;
    } else {
      studentId = students[students.length - 1].studentId;
    }

    studentB.studentId = studentId + 1;

    const StudentStored = await studentB.save();

    if (!StudentStored) {
      return res.status(404).send({ message: "No se a podido guardar" });
    }

    return res.status(200).send(structuring(StudentStored));
  },

  //ENCONTRAR POR ID
  findStudentByStudentId: function (req, res) {
    const studentId = req.params.studentId;

    StudentB.findOne({ studentId: studentId }, (err, studentsFound) => {
      if (err)
        return res.status(500).send({ message: "Error al encontrar registro" });

      if (!studentsFound)
        return res.status(404).send({ message: "No se encontro registo" });

      return res.status(200).send(studentsFound);
    });
  },

  //LISTAR TODOS LOS REGISTROS
  getAlls: function (req, res) {
    StudentB.find({})
      .sort("-studentId")
      .exec((err, students) => {
        if (err)
          return res.status(500).send({ message: "Error al buscar registros" });

        if (!students)
          return res
            .status(404)
            .send({ message: "No se encontraron registros" });

        return res.status(200).send({ students });
      });
  },

  //ACTUALIZAR POR EL ID
  updateStudentsById: function (req, res) {
    var studentId = req.params.studentId;
    var update = req.body;

    StudentB.findOneAndUpdate(
      { studentId },
      { ...update, updatedAt: Date.now() },
      { new: true },
      (err, student) => {
        if (err)
          return res
            .status(500)
            .send({ message: "Error al encontrar registro" });

        if (!student)
          return res.status(404).send({ message: "No se encontro registro" });

        return res.status(200).send({ student });
      }
    );
  },

  //BORRAR POR EL ID
  deleteStudentById: function (req, res) {
    let studentId = req.params.studentId;

    StudentB.findOneAndRemove(
      { studentId: studentId },
      (err, studentDelete) => {
        if (err)
          return res.status(500).send({ message: "Error al borrar registro " });

        if (!studentDelete)
          return res.status(404).send({ message: "No se elimino el registro" });

        return res.status(200).send({ studentDelete });
      }
    );
  },
};

function structuring(studentB) {
  return {
    _id: studentB._id,
    studentId: studentB.studentId,
    first_name: studentB.first_name,
    last_name: studentB.last_name,
    email: studentB.email,
    cellphone: studentB.cellphone,
    createdAt: studentB.createdAt,
    updatedAt: studentB.updatedAt,
  };
}

module.exports = StudentBController;
