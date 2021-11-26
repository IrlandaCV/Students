"use strict";

const StudentA = require("../models/student.model");

const StudentAController = {
  hello: function (req, res) {
    return res.status(200).send({ message: "Hola 1 mundo 1" });
  },

  //GUARDAR REGISTRO
  saveStudent: async function (req, res) {
    const studentA = new StudentA();
    var params = req.body;

    if (
      !params.first_name ||
      !params.last_name ||
      !params.email ||
      !params.cellphone
    )
      return res.status(500).send({ message: "Campos invalidos" });

    studentA.first_name = params.first_name;
    studentA.last_name = params.last_name;
    studentA.email = params.email;
    studentA.cellphone = params.cellphone;

    let studentId = 0;

    const students = await StudentA.find({});

    if (students.length == 0) {
      studentId = 0;
    } else {
      studentId = students[students.length - 1].studentId;
    }

    studentA.studentId = studentId + 1;

    const StudentStored = await studentA.save();

    if (!StudentStored) {
      return res.status(404).send({ message: "No se a podido guardar" });
    }

    return res.status(200).send(structuring(StudentStored));

    // StudentA.find({}, (err, studentsA) => {
    //   if (err) return res.status(500).send({ message: "Error al guardar" });

    //   if (studentsA.length == 0) {
    //     studentA.studentId = 1;
    //     studentA.save((err, StudentStored) => {
    //       if (err) return res.status(500).send({ message: "Error al guardar" });

    //       if (!StudentStored)
    //         return res.status(404).send({ message: "No se a podido guardar" });

    //       return res.status(200).send(structuring(StudentStored));
    //     });
    //   } else {
    //     const studentId = studentsA[studentsA.length - 1].studentId;

    //     studentA.studentId = studentId + 1;
    //     studentA.save((err, StudentStored) => {
    //       if (err) return res.status(500).send({ message: "Error al guardar" });

    //       if (!StudentStored)
    //         return res.status(404).send({ message: "No se a podido guardar" });

    //       return res.status(200).send(structuring(StudentStored));
    //     });
    //   }
    // });
  },

  //BUSCAR POR ID
  findStudentByStudentId: function (req, res) {
    const studentId = req.params.studentId;

    StudentA.findOne({ studentId: studentId }, (err, studentsFound) => {
      if (err) return res.status(500).send({ message: "Error al encontrar" });

      if (!studentsFound)
        return res.status(404).send({ message: "No se encontro registo" });

      return res.status(200).send(studentsFound);
    });
  },

  //LISTAR LOS REGISTROS
  getAlls: function (req, res) {
    StudentA.find({})
      .sort("-studentId")
      .exec((err, students) => {
        if (err)
          return res.status(500).send({ message: "Error al buscar registros" });

        if (!students)
          return res.status(404).send({ message: "No se encontraron " });

        return res.status(200).send({ students });
      });
  },

  //ACTUALIZAR POR ID
  updateStudentsById: function (req, res) {
    var studentId = req.params.studentId;
    var update = req.body;

    StudentA.findOneAndUpdate(
      { studentId },
      { ...update, updatedAt: Date.now() },
      { new: true },
      (err, student) => {
        if (err) return res.status(500).send({ message: "Error al encontrar" });

        if (!student)
          return res.status(404).send({ message: "No se encontro registro" });

        return res.status(200).send({ student });
      }
    );
  },

  //BORRAR POR ID
  deleteStudentByStudentId: function (req, res) {
    let studentId = req.params.studentId;

    StudentA.findOneAndRemove(
      { studentId: studentId },
      (err, studentDelete) => {
        if (err) return res.status(500).send({ message: "Error al borrar" });

        if (!studentDelete)
          return res.status(404).send({ message: "No se encontro registro" });

        return res.status(200).send({ studentDelete });
      }
    );
  },
};

function structuring(studentA) {
  return {
    _id: studentA._id,
    studentId: studentA.studentId,
    first_name: studentA.first_name,
    last_name: studentA.last_name,
    email: studentA.email,
    cellphone: studentA.cellphone,
    createdAt: studentA.createdAt,
    updatedAt: studentA.updatedAt,
  };
}

module.exports = StudentAController;
