export function getDocPath (path, root = '/docs') {
  if (path.includes(root)) {
    return path.split(`${root}/`)[1].replace('.md', '').toLowerCase()
  }

  return path.replace('.md', '').toLowerCase()
}

/* eslint-disable */
function setValue(object, objPath, value) {
    var a = objPath
    var o = object;
    for (var i = 0; i < a.length - 1; i++) {
        var n = a[i];
        if (n in o) {
            o = o[n];
        } else {
            o[n] = {};
            o = o[n];
        }
    }
    o[a[a.length - 1]] = value;
}

// const getValue = (obj, objPath) => objPath.reduce((a, b) => a[b], obj)

function deepFind(obj, currentPath) {
  var paths = currentPath
    , current = obj
    , i;

  for (i = 0; i < paths.length; ++i) {
    if (current[paths[i]] == undefined) {
      return undefined;
    } else {
      current = current[paths[i]];
    }
  }
  return current;
}
