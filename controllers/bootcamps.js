/* 
* Bootcamps Controller
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
const Bootcamp = require('../models/Bootcamp')

// async handler
const asyncHandler = require('../middleware/async')

/* 
*
* @desc    Show all bootcamps
* @route   GET /api/v1/bootcamps
* @access  Public
* @note    Line 26, notice how .length is used like on the frontend.
*
*/
exports.getBootCamps = asyncHandler( async (req, res, next) => {
    const bootcamps = await Bootcamp.find(req.body)
    res.status(200).json({ success: true, count: bootcamps.length, data: bootcamps })
})

/* 
*
* @desc    Get a bootcamp
* @route   GET /api/v1/bootcamps/:id
* @access  Public
*
*/
exports.getBootCamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id) // note, findById method
    if(!bootcamp) { 
      return new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    } 
    res.status(200).json({ success: true, data: bootcamp })
})

/* 
*
* @desc    Create a bootcamp
* @route   POST /api/v1/bootcamps/
* @access  Private
*
* @note    "Bootcamp.create(req.body)" creates new BootCamps!  
*          const PAYLOAD = await MODEL.create(req.body)
*
*/
exports.createBootCamp = asyncHandler(async (req, res, next) => {
    const newBootCamp = await Bootcamp.create(req.body)
    if(!newBootCamp) { 
      return new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404) 
    } 
    res.status(201).json({ success: true, data: newBootCamp })
})

/* 
*
* @desc    Update a bootcamp
* @route   PUT /api/v1/bootcamps/:id
* @access  Private
*
*/
exports.updateBootCamp = asyncHandler( async (req, res, next) => {
    const updateBootCamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if(!updateBootCamp) { 
      return new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404) 
    } 
    res.status(201).json({ success: true, data: updateBootCamp }) //if it does exist
})

/* 
*
* @desc    Delete a bootcamp
* @route   DELETE /api/v1/bootcamps/:id
* @access  Private
*
*/
exports.deleteBootCamp = asyncHandler( async (req, res, next) => {
    const deleteBootCamp = await Bootcamp.findByIdAndDelete(req.params.id)
    if(!deleteBootCamp) { 
      return new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404) 
    }
    res.status(200).json({ success: true, data: deleteBootCamp })
})