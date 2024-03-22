
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#form-2");
  const email= document.querySelector("#emailz");

  const resetForm = () => {
    email.value = "";
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let userEmail = email.value.trim();
    

    console.log(userEmail)
    if (!userEmail) {
      showErrorMessage("Please fill in all fields");
      return;
    }

    const subscriberData = {
      email:userEmail,
    };

    try {
      const response = await fetch("https://mybrand-backend-v82m.onrender.com/api/v1/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subscriberData),
      });

      if (response.ok) {
        const responseData = await response.json();
        showSuccessMessage(responseData.message);
        resetForm();
      } else {
        const errorData = await response.json();
        alert(errorData.error);
      }
    } catch (error) {
      
      showErrorMessage("An error occurred. Please try again later.");
      console.error("Error:", error);
    }
  });
});

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

