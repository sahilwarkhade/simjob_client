// This helper function can be defined outside your component or in a utility file
export const areValuesEqualOrEmpty = (val1, val2) => {
  const normalize = (val) => {
    if (val === null || val === undefined || val === "") {
      return null;
    }
    return val;
  };

  return normalize(val1) === normalize(val2);
};
