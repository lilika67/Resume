document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Basic input validation
    if (!email || !password) {
      showErrorMessage('Please enter both email and password.');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/v1/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const messageData = await response.json();
        showErrorMessage(messageData.error);
        
      }

      // Extract the role from the response
      const userData = await response.json();
      
      console.log(userData);

      // Redirect based on role
      console.log(userData)
      if (userData.user.role === 'admin') {

        window.location.href = 'dash.html'; 
      } else {
        window.location.href = '../index.html'; 
      }
    } catch (error) {
      showErrorMessage('Error: Something went wrong during login');
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