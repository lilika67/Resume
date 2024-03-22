document.addEventListener("DOMContentLoaded", async()=> {
  const commentInput = document.getElementById('comment-input');
  console.log(commentInput);

  const resetForm = () => {
    commentInput.value = "";
  };

  const commentData = {
    commentInput,
  };
  try{
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id");
    const response = await fetch(`https://mybrand-backend-v82m.onrender.com/api/v1/blogs/${id}`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(commentData)
    })
    if(response.ok){
      const responseData = await response.json();
      alert(responseData.message);
      resetForm();
    }

  }catch(error){
    console.log(error);

  }
})