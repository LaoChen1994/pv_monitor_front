export const filterParamInObj = (
  target,
  rule = elem => !~[undefined, null, ''].indexOf(elem)
) =>
  Array.isArray(target)
    ? target.filter(elem => rule(elem))
    : Object.fromEntries(Object.entries(target).filter(elem => rule(elem[1])));
