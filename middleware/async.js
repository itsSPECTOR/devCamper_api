/* 
* Async Handler
*
* @note  This essentially packages the async/await functions
*        so we dont have to write try/catch 100 times in
*        the controller file.
*        
*/

const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;