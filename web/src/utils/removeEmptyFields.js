const removeEmptyFields = state => {
  return Object.keys(state)
    .filter(
      key =>
        state[key] !== null && state[key] !== undefined && state[key] !== ""
    )
    .reduce((newObj, key) => {
      return typeof state[key] === "object"
        ? Object.assign(newObj, { [key]: removeEmptyFields(state[key]) })
        : Object.assign(newObj, { [key]: state[key] });
    }, {});
};

export default removeEmptyFields;
