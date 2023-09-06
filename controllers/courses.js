/* 
* Course Controller
*
* @note  "Bootcamp.create(req.body)" creates new BootCamps!  
*        const PAYLOAD = await MODEL.create(req.body)
*        
*        # Note the SOP for the different requests
*        .find .findById .create .findByIdAndUpdate .findByIdAndDelete etc...
*        
*/

// import error handler
const ErrorResponse = require('../utils/errorResponse')

// import bootcamp model
const Course = require('../models/Course')

// async handler
const asyncHandler = require('../middleware/async')

/* 
*
* @desc    Get Courses
* @route   GET /api/v1/courses
* @route   GET /api/v1/bootcamps/:bootcampId/courses
* @access  Public
* @note    This method not only gets all, but accepts queries!
*
*/
exports.getCourses = asyncHandler(async (req, res, next) => {
  let queryStr

  if(req.params.bootcampId){
    query = Course.find( { bootcamp: req.params.bootcampId } )
  } else {
    // note that .populate dumps in the data with the bootcamp its related to.. we can even specify what we want with "select"
    query = Course.find().populate({
      path: 'bootcamp',
      select: 'name description'
    }) 
  }
  
  const courses = await query
  res.status(200).json({ 
    success: true, 
    count: courses.length, 
    data: courses 
  })
})