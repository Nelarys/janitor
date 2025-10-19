const scriptUrl =
  "https://script.google.com/macros/s/AKfycbwL6E_0pl6rbCqY6lmIqxA3MK8dxMLMrP0C7x-odvCqbd51tlGx797cO8dgpavmpqLDCQ/exec";

const form = document.getElementById("mailingForm");
const subscribeText = document.getElementById("subscribeText");
const resultMessage = document.getElementById("responseMessage");
const emailDisplay = document.getElementById("emailDisplay");
const emailInput = document.getElementById("emailInput");
const submitLink = document.getElementById("submitlink");




// toggles the email form visibility
subscribeText.addEventListener("click", () => {
  subscribeText.style.display = "none";
  form.classList.add("active");
});

// sync up the email display with the hidden email input
emailDisplay.addEventListener("input", () => {
  emailInput.value = emailDisplay.textContent.trim();
});

// send email to list and trigger user feedback
submitLink.addEventListener("click", (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  if (!emailInput.checkValidity()) {
    resultMessage.textContent = "";
    typeWriter("Please enter a valid email address.", 0);
    return;
  }

  submitLink.textContent = "[*] Sending...";

  fetch(scriptUrl, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  })
    .then(() => {
      submitLink.style.display = "none";
      resultMessage.textContent = "";
      typeWriter("Sure, you will hear from me soon!", 0);
    })
    .catch((err) => {
      console.error(err);
      submitLink.textContent = "[ ] Send";
      resultMessage.textContent = "";
      typeWriter("Something went wrong. Please try again later.", 0);
    });
});

function typeWriter(text, i) {
  if (i < text.length) {
    resultMessage.innerHTML = text.substring(0, i + 1) + '<span class="cursor" aria-hidden="true"></span>';

    setTimeout(function () {
      typeWriter(text, i + 1)
    }, Math.random() * 100);
  } else {
    // remove cursor from end if element is done
    resultMessage.innerHTML = text;
    callback();
  }
}




// form.addEventListener('submit', e => {
//   e.preventDefault();

//   const data = {
//     email: form.email.value
//   };

//   fetch(scriptUrl, {
//     method: 'POST',
//     mode: 'no-cors',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data)
//   })
//   .then(response => response.text())
//   .then(() => {
//     resultMessage.textContent = "Added successfully"
//     form.reset();
//   })
//   .catch(err => {
//     console.error(err);
//     resultMessage.textContent = "failed to add to mailinglist"
//   })
// })
