document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#form");
  const fullNameInput = document.querySelector("#name");
  const emailInput = document.querySelector("#email");
  const messageInput = document.querySelector("#message");

  const resetForm = () => {
      fullNameInput.value = "";
      emailInput.value = "";
      messageInput.value = "";
  };

  form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const fullName = fullNameInput.value.trim();
      const email = emailInput.value.trim();
      const message = messageInput.value.trim();

      if (!fullName || !email || !message) {
          showErrorMessage("Please fill in all fields");
          return;
      }

      const messageData = {
          fullName,
          email,
          message
      };

      try {
          const response = await fetch('https://mybrand-backend-v82m.onrender.com/api/v1/messages', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(messageData)
          });

          if (response.ok) {
              const responseData = await response.json();
              showSuccessMessage(responseData.message);
              resetForm();
          } else {
              const errorData = await response.json();
              showErrorMessage(errorData.error);
          }
      } catch (error) {
          console.error("Error:", error);
          showErrorMessage("An error occurred. Please try again later.");
      }
  });
});

function deleteMessage(){
    
}

// Function to show success message
function showSuccessMessage(message) {
  Toastify({
      text: message || "Operation completed successfully!",
      duration: 3000,
      close: true,
      backgroundColor:"green",
      className: "toastify-success"
  }).showToast();
}

// Function to show error message
function showErrorMessage(message) {
  Toastify({
      text: message || "Error: Something went wrong!",
      duration: 3000,
      close: true,
      backgroundColor:"red",
      className: "toastify-error"
  }).showToast();
}
