function isString(x) {
  return Object.prototype.toString.call(x) === "[object String]";
}

function isError(x) {
  return x instanceof Error;
}

export { isString, isError };
