document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  

  try {
    const response = await fetch(`https://mybrand-backend-v82m.onrender.com/api/v1/blogs/${id}`, {
      method: "GET",
    });
    if (!response.ok) {
      console.log("failed to fetch");
    }
    const blogsData = await response.json();
    const blogObj = blogsData.blog;
    console.log(blogObj);

    document.getElementById("title-inputs").value = blogObj.title;
    document.getElementById("author-inputs").value = blogObj.author;
    document.getElementById("description-inputs").value = blogObj.description;
    
   
    
  } catch (error) {
    console.log(error);
  }
});

document
  .getElementById("editBlog")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const title = document.getElementById("title-inputs").value;
    const author = document.getElementById("author-inputs").value;
    const introduction = document.getElementById("introduction-inputs").value;
    const description = document.getElementById("description-inputs").value;
   
   
    const updatedBlog = {
      title: title,
      author: author,
      description: description,
      introduction:introduction
      
    };
    console.log(updatedBlog);
    
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get("id");
      const response = await fetch(`https://mybrand-backend-v82m.onrender.com/api/v1/blogs/${id}`, {
        
        method: "PUT",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(updatedBlog)
      });
      showSuccessMessage(response.message);
      if(!response.ok){
        console.log('failed to update');
      }
      //redirection

      window.location.href = 'allBlog.html'
      
      
    } catch (error) {
        console.log(error);
    }
  });

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

