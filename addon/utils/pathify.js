
export default function pathify (data, prefix) {
  var result = [];
  if (prefix) result.push(prefix);
  if (data && typeof data === 'object')
    for (var p in data)
      if (data.hasOwnProperty(p) && /^[a-z_$][a-z0-9_$]*$/i.test(p))
        result = result.concat(pathify(data[p], (prefix ? prefix + '.' : '') + p.camelize()));
  return result;
}
