const form = document.getElementById('preview-contact');
const confirmation = document.getElementById('confirmation');
if (form && confirmation) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    form.hidden = true;
    confirmation.hidden = false;
    confirmation.focus();
  });
  document.getElementById('back-to-form').addEventListener('click', () => {
    confirmation.hidden = true;
    form.hidden = false;
    form.querySelector('input').focus();
  });
  // Keep the preview inert if JavaScript cannot initialise.
  document.getElementById('preview-fields').disabled = false;
}
