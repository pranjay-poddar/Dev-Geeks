'use strict';
const errorHelper = {};
errorHelper.formatErrorObj = err => {
  const formatError = err.toString();
  const obj = JSON.parse(JSON.stringify(formatError.substring(formatError.indexOf('{'))));
  return JSON.parse(obj);
};

errorHelper.outputJSONErrorMessage = (err, next) => {
  try {
    const obj = errorHelper.formatErrorObj(err);
    return {
      status_code: obj.status_code,
      message: obj.message,
    };
  } catch (err) {
    return next(err);
  }
};

errorHelper.getErrorObj = (err, next) => {
  try {
    const errorObj = {
      error_message: '',
      error_stack: '',
      error_type: '',
      path: '',
      method: '',
    };
    if (typeof err === 'string') {
      errorObj.error_message = err;
      errorObj.error_stack = err;
      errorObj.error_type = '';
    } else {
      errorObj.error_message = err.message;
      errorObj.error_stack = err.stack;
      errorObj.error_type = err.name;
      errorObj.path = err.path;
      errorObj.method = err.method;
    }
    return errorObj;
  } catch (err) {
    return next(err);
  }
};

errorHelper.customErrorResponse = (res, cancellationErr, next) => {
  try {
    const errorMessage = errorHelper.outputJSONErrorMessage(cancellationErr, next);

    res.status(errorMessage.status_code);

    res.json({
      status: errorMessage.status_code,
      message: errorMessage.message,
    });
  } catch (err) {
    return next(err);
  }
};

errorHelper.sendFormattedErrorData = err => {
  return err.length > 0 ? err[0].msg : '';
};
module.exports = errorHelper;
