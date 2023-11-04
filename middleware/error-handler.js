const { CustomAPIError } = require('../error/cutom-error')

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  return res
    .status(err.status)
    .json({ msg: 'something went wrong, please try again later' })
}

module.exports = errorHandlerMiddleware
