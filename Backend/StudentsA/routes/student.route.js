"use strict";

const express = require("express");
const studentARouter = express.Router();

const StudentAController = require("../controllers/student.controller");

studentARouter.get("/hello", StudentAController.hello);                                               //TEST
studentARouter.post("/save-studentA", StudentAController.saveStudent);                               //SAVE
studentARouter.get("/getById/:studentId", StudentAController.findStudentByStudentId);               //SEARCH
studentARouter.get("/getAlls", StudentAController.getAlls);                                        //LIST
studentARouter.put("/updateStudent/:studentId", StudentAController.updateStudentsById);           //UPDATE
studentARouter.delete("/deleteStudent/:studentId", StudentAController.deleteStudentByStudentId); //DELETE


module.exports = studentARouter;
