function getMarginTop(id, buffer) {
  return document.getElementById(id).firstChild.clientHeight + buffer;
}

export { getMarginTop };
