export function selectButton(side){
  const other = { 1: 2, 2: 1};
  document.getElementById(`${side}`).disabled = true;
  document.getElementById(`${other[side]}`).disabled = false;
}

export function focusPane(side){
  const pane = document.getElementById(`editor-${side}`);
  pane.querySelector('.ace_text-input').focus();
}

export function getActiveEditor(){
  const button1 = document.getElementById('1');
  const button2 = document.getElementById('2');
  let active;
  if(button1.disabled){ active = 1; }
  if(button2.disabled){ active = 2; }
  const editor = document.getElementById(`editor-${active}`);
  return ace.edit(editor);
}


// module.exports = {
//   selectButton: selectButton,
//   focusPane: focusPane
// }
