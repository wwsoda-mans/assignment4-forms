// Used only on Task 3 and Task 4.
document.querySelectorAll('form[data-validate]').forEach(function(form) {
  const fields = form.querySelectorAll('input:not([type="radio"]):not([type="checkbox"]), textarea, select');
  const result = form.querySelector('.result');
  const password = form.querySelector('#password');
  const confirmPassword = form.querySelector('#confirmPassword');

  function validateField(field) {
    let valid = field.checkValidity();
    if (field === confirmPassword && password) {
      valid = valid && field.value === password.value;
    }
    field.classList.toggle('is-valid', valid);
    field.classList.toggle('is-invalid', !valid);
    return valid;
  }

  function validateChoices(name, feedbackId, errorMessage) {
    const options = form.querySelectorAll('input[name="' + name + '"]');
    const feedback = form.querySelector('#' + feedbackId);
    if (!options.length || !feedback) return true;
    const chosen = Array.from(options).some(function(option) { return option.checked; });
    feedback.textContent = chosen ? 'Looks good!' : errorMessage;
    feedback.className = 'feedback-text ' + (chosen ? 'success' : 'error');
    return chosen;
  }

  fields.forEach(function(field) {
    field.addEventListener('input', function() {
      validateField(field);
      if (field === password && confirmPassword && confirmPassword.value) {
        validateField(confirmPassword);
      }
      result.textContent = '';
    });
    field.addEventListener('change', function() { validateField(field); });
  });

  form.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(function(option) {
    option.addEventListener('change', function() {
      validateChoices('gender', 'genderFeedback', 'Choose a gender.');
      validateChoices('hobbies', 'hobbiesFeedback', 'Choose at least one hobby.');
      result.textContent = '';
    });
  });

  form.addEventListener('submit', function(event) {
    event.preventDefault(); // No backend: do not navigate or send data.
    let valid = true;
    fields.forEach(function(field) {
      if (!validateField(field)) valid = false;
    });
    if (!validateChoices('gender', 'genderFeedback', 'Choose a gender.')) valid = false;
    if (!validateChoices('hobbies', 'hobbiesFeedback', 'Choose at least one hobby.')) valid = false;
    result.textContent = valid ? 'Form is valid! (Demo only; nothing was sent.)' : 'Please fix the highlighted fields.';
    result.className = 'result mt-3 ' + (valid ? 'text-success' : 'text-danger');
  });

  form.addEventListener('reset', function() {
    fields.forEach(function(field) {
      field.classList.remove('is-valid', 'is-invalid');
    });
    form.querySelectorAll('.feedback-text').forEach(function(feedback) {
      feedback.textContent = '';
      feedback.className = 'feedback-text';
    });
    result.textContent = '';
  });
});
