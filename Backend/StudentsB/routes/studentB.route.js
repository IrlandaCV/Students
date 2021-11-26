"use strict";

const express = require("express");
const studentBRouter = express.Router();

const StudentBController = require("../controllers/studentB.controller");

studentBRouter.get("/hello", StudentBController.hello);
studentBRouter.post("/save-studentB", StudentBController.saveStudentB);
studentBRouter.get("/getById/:studentId", StudentBController.findStudentByStudentId);
studentBRouter.get("/getAlls", StudentBController.getAlls);
studentBRouter.put("/update/:studentId", StudentBController.updateStudentsById);
studentBRouter.delete("/deleteStudent/:studentId", StudentBController.deleteStudentById);



module.exports = studentBRouter;
