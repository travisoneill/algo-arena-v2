export function selectButton(side){
  const other = { 1: 2, 2: 1};
  document.getElementById(`${side}`).disabled = true;
  document.getElementById(`${other[side]}`).disabled = false;
}

export function focusPane(side){
  const pane = document.getElementById(`editor-${side}`);
  pane.focus();
  var n = ace.edit(pane).getSession().getValue().split("\n").length;
  ace.edit(pane).gotoLine(n);
}

// module.exports = {
//   selectButton: selectButton,
//   focusPane: focusPane
// }
