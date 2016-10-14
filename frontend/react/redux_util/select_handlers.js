export function selectButton(side){
  const other = { 1: 2, 2: 1};
  document.getElementById(`${side}`).disabled = true;
  document.getElementById(`${other[side]}`).disabled = false;
}

export function  focusPane(side){

}

// module.exports = {
//   selectButton: selectButton,
//   focusPane: focusPane
// }
