// Modify the signUp function to send a POST request to your backend server
const signUp = async (user) => {
  try {
    const response = await fetch('http://localhost:4000/api/v1/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    
    if (response.ok) {
      const responseData = await response.json();
      showSuccessMessage(responseData.message);
      window.location.href = 'login.html';
    } else {
      const errorData = await response.json();
      showErrorMessage(errorData.error);
    }
  } catch (error) {
    
    showErrorMessage('Something went wrong');
  }
};

// Update the event listener for form submission to call signUp function
document.getElementById('registration').addEventListener('submit', async (event) => {
  event.preventDefault();

  const firstName = document.getElementById('fname').value.trim();
  const lastName = document.getElementById('lname').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('psw').value.trim();

  if (!email || !password || !firstName || !lastName) {
    showErrorMessage('Please enter all credentials');
    return;
  }

  const user = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password
  };

  await signUp(user);
});
