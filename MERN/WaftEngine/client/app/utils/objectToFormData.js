const objectToFormData = (obj, form, namespace) => {
  if (typeof obj !== 'object') return;
  const fd = form || new FormData();
  let formKey;
  Object.keys(obj).map(property => {
    // for (let property in obj) {
    if (obj[property] !== null && obj[property] !== undefined) {
      if (!(obj[property] instanceof File)) {
        if (namespace) {
          formKey = `${namespace}[${property}]`;
        } else {
          formKey = property;
        }
        // if the property is an object, but not a File, use recursivity.
        if (obj[property] instanceof Date) {
          fd.append(formKey, obj[property].toISOString());
        } else if (typeof obj[property] === 'object') {
          objectToFormData(obj[property], fd, formKey);
        } else {
          // if it's a string or a File object
          fd.append(formKey, obj[property]);
        }
      }
    }
    return property;
  });
  return fd; // eslint-disable-line consistent-return
};

export default objectToFormData;
