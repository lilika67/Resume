const blogForm = document.getElementById("blog-form");
const blogsContainer = document.getElementById("blogs-container");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");
const imageInput = document.getElementById("image-input");
const authorInput = document.getElementById("author-input");
const introductionInput = document.getElementById("introduction-input");

// Function to send a POST request to add a new blog
const addBlog = async (blogData) => {
  try {
    const formData = new FormData();
    formData.append('title', blogData.title);
    formData.append('date', blogData.date);
    formData.append('author', blogData.author);
    formData.append('introduction', blogData.introduction);
    formData.append('description', blogData.description);
    formData.append('image', blogData.imageFile);

    const response = await fetch('https://mybrand-backend-v82m.onrender.com/api/v1/blogs', {
      method: 'POST',
      body: formData
    });
    console.log(response);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to add blog');
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error adding blog:', error);
    throw error;
  }
};

// Function to reset form fields
const resetForm = () => {
  titleInput.value = "";
  descriptionInput.value = "";
  introductionInput.value = "";
  authorInput.value = "";
  imageInput.value = "";
};

// Function to render blogs
const renderBlogs = async () => {
  try {
    const response = await fetch('https://mybrand-backend-v82m.onrender.com/api/v1/blogs');
    if (!response.ok) {
      throw new Error('Failed to fetch blogs');
    }
    const blogData = await response.json();
    
    
    // Check if blogData is undefined or null
    

    blogsContainer.innerHTML = ""; 
    blogData.addedBlog.forEach((blog) => {
      blogsContainer.innerHTML += `
        <div class="blog">
          <p><strong>Title:</strong> ${blog.title}</p>
          <p><strong>Published date:</strong> ${new Date(blog.date).toLocaleDateString()}</p>
          <p><strong>Author:</strong> ${blog.author}</p>
          <p><strong>Description:</strong> ${blog.description}</p>
          <p><strong>Introduction:</strong> ${blog.introduction}</
          <img src="${blog.image}" alt="Blog Image">
        </div>
      `;
    });
  } catch (error) {
   console.log(error);
  }
};
// Event listener for form submission
blogForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const blogObj = {
    title: titleInput.value,
    date: new Date().toISOString(),
    author: authorInput.value,
    introduction: introductionInput.value,
    description: descriptionInput.value,
    imageFile: imageInput.files[0] || null
  };

  try {
    const responseData = await addBlog(blogObj);
    
    showSuccessMessage(responseData.message);

    // Reset form fields
    resetForm();

    // Fetch and render updated list of blogs
    renderBlogs();
  } catch (error) {
    console.error('Failed to add blog:', error);
   
  }
});

// Initial render of blogs
renderBlogs();


// Function to show success message
function showSuccessMessage(message) {
  Toastify({
      text: message || "You successfully added Blog!",
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

