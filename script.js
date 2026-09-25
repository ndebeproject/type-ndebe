function updateCharacterCount() {
  const field=document.querySelector('.input');
  document.getElementById('charactersRemaining').textContent=`${Array.from(field.value).length} characters`;
}
