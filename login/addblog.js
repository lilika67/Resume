const blogForm = document.getElementById("blog-form");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const openblogFormBtn = document.getElementById("open-blog-form-btn");
const closeblogFormBtn = document.getElementById("close-blog-form-btn");
const addOrUpdateblogBtn = document.getElementById("add-or-update-blog-btn");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const blogsContainer = document.getElementById("blogs-container");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");
const imageInput = document.getElementById("image-input");

let blogData = JSON.parse(localStorage.getItem("blogs")) || [];
let currentblog = {};

const saveToLocalStorage = () => {
  localStorage.setItem("blogs", JSON.stringify(blogData));
};

const reset = () => {
  titleInput.value = "";
  dateInput.value = "";
  descriptionInput.value = "";
  imageInput.value = "";
  blogForm.classList.add("hidden");
  currentblog = {};
};

const renderblogs = () => {
  blogsContainer.innerHTML = "";
  blogData.forEach(({ id, title, date, description, image }) => {
    blogsContainer.innerHTML += `
      <div class="blog" id="${id}">
        <p><strong>Title:</strong> ${title}</p>
        <p><strong>Published date:</strong> ${date}</p>
        <p><strong>Description:</strong> ${description}</p>
        ${image ? `<img src="${image}" alt="Blog Image" style="max-width: 100%;" />` : ''}
        <button type="button" class="edit-btn" data-id="${id}">Edit</button>
        <button type="button" class="delete-btn" data-id="${id}">Delete</button>
      </div>
    `;
  });
};

const editblog = (id) => {
  const blogToEdit = blogData.find((blog) => blog.id === id);
  if (blogToEdit) {
    titleInput.value = blogToEdit.title;
    dateInput.value = blogToEdit.date;
    descriptionInput.value = blogToEdit.description;
    currentblog = blogToEdit;
    blogForm.classList.remove("hidden");
  }
  console.log("Edit button clicked for ID:", id);
  
  
};

const deleteblog = (id) => {
  blogData = blogData.filter((blog) => blog.id !== id);
  saveToLocalStorage();
  renderblogs();
  alert("are you sure you want to delete this blog?");
};

openblogFormBtn.addEventListener("click", () => {
  blogForm.classList.remove("hidden");
});

closeblogFormBtn.addEventListener("click", () => {
  const formInputsContainValues =
    titleInput.value || dateInput.value || descriptionInput.value || imageInput.value;

  if (formInputsContainValues) {
    confirmCloseDialog.showModal();
  } else {
    reset();
  }
});

cancelBtn.addEventListener("click", () => confirmCloseDialog.close());

discardBtn.addEventListener("click", () => {
  confirmCloseDialog.close();
  reset();
});

blogsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-btn")) {
    const blogId = e.target.getAttribute("data-id");
    editblog(blogId);
  } else if (e.target.classList.contains("delete-btn")) {
    const blogId = e.target.getAttribute("data-id");
    deleteblog(blogId);
  }
});

blogForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const dataArrIndex = blogData.findIndex((item) => item.id === currentblog.id);
  const blogObj = {
    id: currentblog.id || `${titleInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
    title: titleInput.value,
    date: new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString('en-US', {hour12: false}),
    description: descriptionInput.value,
    image: null, // Initialize image as null
    imageFile: imageInput.files[0] || null, // Check if an image file was selected
  };

  if (blogObj.imageFile) {
    const reader = new FileReader();
    reader.onload = function (event) {
      blogObj.image = event.target.result; 
      if (dataArrIndex === -1) {
        blogData.unshift(blogObj);
      } else {
        blogData[dataArrIndex] = blogObj;
      }
      saveToLocalStorage();
      renderblogs();
      reset();
    };
    reader.readAsDataURL(blogObj.imageFile); 
  } else {
    if (dataArrIndex === -1) {
      blogData.unshift(blogObj);
    } else {
      blogData[dataArrIndex] = blogObj;
    }
    saveToLocalStorage();
    renderblogs();
    reset();
  }
});

renderblogs();
