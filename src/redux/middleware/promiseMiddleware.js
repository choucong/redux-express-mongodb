export default function promiseMiddleware () {
  return (next) => (action) => {
    // console.log(action)
    const { promise, types, ...rest } = action

    if (!promise) {
      // console.log(action)
      return next(action)
    }

    const [REQUEST, SUCCESS, FAILURE] = types

    next({ ...rest, type: REQUEST })

    return promise.then(
        (result) => next({ ...rest, result, type: SUCCESS }),
        (error) => next({ ...rest, error, type: FAILURE })
      ).catch(error => {
        console.error('MIDDLEWARE ERROR:', error)
        next({ ...rest, error, type: FAILURE })
      })
  }
}