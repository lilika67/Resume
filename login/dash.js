document.addEventListener("DOMContentLoaded", async () => {
   

    try {
       const usersTable = document.getElementById("users-div");
       const response = await fetch('https://mybrand-backend-v82m.onrender.com/api/v1/users', {
            method: 'GET',
        });
        if (!response.ok) {
            console.log('failed to get users');
            return;
        }
        

        // if ( responseData.length === 0) {
        //     throw new Error('No users found in response');
        // }
        const responseData = await response.json();
        console.log(responseData);
        const allUsers = responseData.allUsers;
        allUsers.forEach(userObj => {
            // const row = document.createElement("tr");
            // const isUser = user.role === "visitor";

            // row.innerHTML = `
            //     <td data-cell="firstName">${user.firstName}</td>
            //     <td data-cell="lastName">${user.lastName}</td>
            //     <td data-cell="email">${user.email}</td>
            //     <td data-cell="role">${user.role}</td>
            //     <td data-cell="RegisteredDate">${new Date(user.createdAt).toLocaleDateString('en-US')}</td>
            //     <td>
        
            //     ${isUser ? `<button id="delete" style="background-color:red;color:white;padding:6px;margin-left:25px;" onclick="deleteUser('${user._id}')">Delete</button>`:""}
            //     </td>
            // `;
            let html=`
        
        <div id ="myUsers">
        <div class="user"><span style="font-weight:bold">FirstName:</span> ${userObj.firstName}</div>
        <div class="user"><span style="font-weight:bold">LastName:</span> ${userObj.lastName}</div>
        <div class="user"><span style="font-weight:bold">email:</span> ${userObj.email}</div>
        <div class="user"><span style="font-weight:bold">Role:</span> ${userObj.role}</div>
        <div><button id="delete" style="background-color:red;color:white;padding:5px;margin-left:25px;" onclick="deleteUser('${userObj._id}')">Delete</button></div>
        </div>
        
        
        `
            usersTable.innerHTML += html;
        });
        
    } catch (error) {
        console.log(error);
    }
});

//function to delete message row
const deleteUser = async(id)=>{
  
    try{

      
        const response = await fetch(`https://mybrand-backend-v82m.onrender.com/api/v1/users/${id}`, {
          method: 'DELETE',
          headers: {'Content-Types': "application/json"}
        })
        const usersData = await response.json();
        console.log(usersData);

      if(!response.ok)  {
        return ("failed to delete")
      }
      
      location.reload();


    }catch(error){

    }
}
