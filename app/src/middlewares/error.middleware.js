import ERRORS from '../helpers/error.codes.js';

export const errorHandler = (err, req, res, next) => {
  const error = ERRORS.find(e => e.code === err.code);
  if (error) {
    res.status(error.status).json({ message: error.message });
  } else {
    res.status(500).json({ message: 'Error en el servidor', error: err });
  }
};
