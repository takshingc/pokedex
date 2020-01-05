function getMarginTop(id, buffer) {
  const navbardiv = document.getElementById(id);

  if (typeof navbardiv === "undefined" || navbardiv === null) {
    return 50;
  } else {
    return navbardiv.firstChild.clientHeight + buffer;
  }
}

export { getMarginTop };
