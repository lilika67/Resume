const blogForm = document.getElementById("blog-form");
const blogsContainer = document.getElementById("blogs-container");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");
const imageInput = document.getElementById("image-input");
const authorInput = document.getElementById("author-input");

// Function to send a POST request to the backend API to add a new blog
const addBlog = async (blogData) => {
  try {
    const formData = new FormData();
    formData.append('title', blogData.title);
    formData.append('date', blogData.date);
    formData.append('author', blogData.author);
    formData.append('description', blogData.description);
    formData.append('image', blogData.imageFile);

    const response = await fetch('http://localhost:4000/api/v1/blogs', {
      method: 'POST',
      body: {formData}
    });

    if (!response.ok) {
      throw new Error('Failed to add blog');
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error adding blog:', error);
    throw error;
  }
};

// Function to reset form fields and state
const reset = () => {
  titleInput.value = "";
  dateInput.value = "";
  descriptionInput.value = "";
  authorInput.value = "";
  imageInput.value = "";
};

// Event listener for form submission
blogForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const blogObj = {
    title: titleInput.value,
    date: new Date().toISOString(),
    author: authorInput.value,
    description: descriptionInput.value,
    imageFile: imageInput.files[0] || null
  };

  try {
    const responseData = await addBlog(blogObj);
    console.log('Blog added successfully:', responseData);

    // Reset form fields and state
    reset();

    // Fetch and render updated list of blogs
    renderBlogs();
  } catch (error) {
    console.error('Failed to add blog:', error);
    
  }
});

// Function to fetch blogs from the backend API and render them on the page
const renderBlogs = async () => {
  try {
    const response = await fetch('http://localhost:4000/api/v1/blogs');
    if (!response.ok) {
      throw new Error('Failed to fetch blogs');
    }
    const blogData = await response.json();
    blogsContainer.innerHTML = ""; 
    blogData.forEach((blog) => {
      blogsContainer.innerHTML += `
        <div class="blog">
          <p><strong>Title:</strong> ${blog.title}</p>
          <p><strong>Published date:</strong> ${blog.date}</p>
          <p><strong>Author:</strong> ${blog.author}</p>
          <p><strong>Description:</strong> ${blog.description}</p>
          <img src="${blog.image}" alt="Blog Image">
        </div>
      `;
    });
  } catch (error) {
    console.error('Error rendering blogs:', error);
    // Handle error, e.g., display error message to user
  }
};


// Event listener for form submission
blogForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const blogObj = {
    title: titleInput.value,
    date: new Date().toISOString(),
    description: descriptionInput.value,
    author: authorInput.value, 
    imageFile: imageInput.files[0] || null
  };

  try {
    const responseData = await addBlog(blogObj);
    console.log('Blog added successfully:', responseData);

    // Reset form fields and state
    reset();

    // Fetch and render updated list of blogs
    renderBlogs();
  } catch (error) {
    console.error('Failed to add blog:', error);
    // Handle error, e.g., display error message to user
  }
});
