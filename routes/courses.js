/* 
*
* @desc  Server.js comes here and finds the route / method it needs.
*        
*        The GET, POST, EDIT and DEL methods are called from here 
*        via controllers.
*
*/

// import express
const express = require('express')

// import express router
const router = express.Router({ mergeParams: true })

//import the controllers
const { 
  getCourses
} = require('../controllers/courses')

const Course = require('../models/Course');

/* 
*
* @desc Routes for Getting courses
*
*/
router
  .route('/')
  .get(getCourses)

// exports router to be used at server.js
module.exports = router