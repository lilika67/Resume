const emailInput = document.querySelector("#email");
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#form-2");

  const resetForm = () => {
    emailInput.value = "";
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    console.log(emailInput.value);

    if (!email) {
      alert(emailInput.value, "Please fill in all fields");
      return;
    }

    const subscriberData = {
      email,
    };

    try {
      const response = await fetch("http://localhost:4000/api/v1/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subscriberData),
      });

      if (response.ok) {
        const responseData = await response.json();
        alert(responseData.message);
        resetForm();
      } else {
        const errorData = await response.json();
        alert(errorData.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  });
});
