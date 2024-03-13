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
      const userData = await response.json();
      // Assuming the response from the server contains user data, you can do something with it if needed
      console.log(userData);
      window.location.href = 'login.html';
    } else {
      // Handle server errors or invalid responses
      console.error('Sign up failed:', response.statusText);
      alert('Sign up failed. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again later.');
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
    alert('Please enter all credentials');
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
