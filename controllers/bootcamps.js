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

// import geocoder
const geocoder = require('../utils/geocoder')

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
* @note    This method not only gets all, but accepts queries!
*
*/
exports.getBootCamps = asyncHandler( async (req, res, next) => {
    let query

    // copy req.query
    const reqQuery = { ...req.query }

    // fields to exclide
    const removeFields = ['select', 'sort', 'page', 'limit']

    // loop over fields and delete them from req.query
    removeFields.forEach(param => delete reqQuery[param]) 

    // formats request
    let queryStr = JSON.stringify(reqQuery)

    // creates filtering operators like ($gt, $gte, $lt, etc...)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)

    // finding resources (we build the query from here down)
    query = Bootcamp.find(JSON.parse(queryStr)).populate('courses')

      // @query select fields we want returned
      if(req.query.select) {
        const fields = req.query.select.split(',').join(' ')
        query = query.select(fields)
      }

      // @query sort items (ascending, decending, date, etc)
      if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ')
        query = query.sort(sortBy)
      } else {
        query = query.sort('-createdAt')
      }

      // pagination
      const page = parseInt(req.query.page, 10) || 1
      const limit = parseInt(req.query.limit, 10) || 25
      const startIndex = (page - 1) * limit
      const endIndex = page * limit
      const total = await Bootcamp.countDocuments()

      query.skip(startIndex).limit(limit)

    // executes query
    const bootcamps = await query

    // pagination result
    const pagination = {}

      if (endIndex < total) {
        pagination.next = {
          page: page + 1,
          limit
        }
      }

      if (startIndex > 0) {
        pagination.prev = {
          page: page - 1,
          limit
        }
      }

    // requests to db
    res.status(200).json({ success: true, count: bootcamps.length, pagination,  data: bootcamps })
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
    const bootcamp = await Bootcamp.findById(req.params.id)

    if(!bootcamp) { 
      return new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404) 
    }

    bootcamp.deleteOne()

    res.status(200).json({ success: true, data: bootcamp })
})

/* 
*
* @desc    Get bootcamps within a radius
* @route   GET /api/v1/bootcamps/radius/:zipcode/:distance
* @access  Public
* @note    null
*
*/
exports.getBootCampsInRadius = asyncHandler( async (req, res, next) => {
  const { zipcode, distance } = req.params
  
  // get lat and long from geocoder
  const loc = await geocoder.geocode(zipcode)
  const lat = await loc[0].latitude
  const long = await loc[0].longitude

  // calc radius via radians
  // divide distance by radius of earth
  // radius of earth is 3,963 miles
  const radius = distance / 3963

  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[ long, lat ], radius] } }
  })

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps
  })

})