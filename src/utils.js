export const filterParamInObj = (
  target,
  rule = elem => !~[undefined, null, ''].indexOf(elem)
) =>
  Array.isArray(target)
    ? target.filter(elem => rule(elem))
    : Object.fromEntries(Object.entries(target).filter(elem => rule(elem[1])));

export const num2Exp = (num, bit = 3) => (+num.toFixed(bit)).toExponential();
