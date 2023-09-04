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
const router = express.Router()

//import the controllers
const { 
  getBootCamps, 
  getBootCamp, 
  createBootCamp, 
  updateBootCamp, 
  deleteBootCamp 
} = require('../controllers/bootcamps')

/* 
*
* @desc Routes for Creating & Listing BootCamps
*
*/
router
  .route('/')
  .get(getBootCamps)
  .post(createBootCamp)

/* 
*
* @desc Routes for Getting, Editing and Deleting BootCamps
*
*/
router
  .route('/:id')
  .get(getBootCamp)
  .put(updateBootCamp)
  .delete(deleteBootCamp)

// exports router to be used at server.js
module.exports = router