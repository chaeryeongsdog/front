const dialog = document.querySelector('dialog');
function openDialog() {
  dialog.showModal(dialog);
  dialog.style.display="flex";
}
function closeDialog() {
  dialog.close();
  dialog.style.display="none"
}