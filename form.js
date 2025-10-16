const scriptUrl = 'https://script.google.com/macros/s/AKfycbwL6E_0pl6rbCqY6lmIqxA3MK8dxMLMrP0C7x-odvCqbd51tlGx797cO8dgpavmpqLDCQ/exec';
const form = document.getElementById('mailingForm');
const resultMessage = document.getElementById('responseMessage');

form.addEventListener('submit', e => {
  e.preventDefault();

  const data = {
    email: form.email.value
  };

  fetch(scriptUrl, {
    method: 'POST',
    // mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(response => response.text())
  .then(result => {
    console.log('HERE');
    console.log(result);
    if (result === 'duplicate') {
      resultMessage.textContent = "you're already on the list"
    } else if (result === 'success') {
      resultMessage.textContent = "Added successfully"
    } else {
      resultMessage.textContent = "unexpected response :/"
    }
    form.reset();
  })
  .catch(err => {
    console.error(err);
    resultMessage.textContent = "failed to add to mailinglist"
  })
})
