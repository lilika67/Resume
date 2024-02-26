
document.addEventListener("DOMContentLoaded", ()=>{
  const form = document.querySelector("#registration");
  const fullNameInput = document.querySelector("#usrname");
  const emailInput = document.querySelector("#email");
  const passwordInput = document.querySelector("#psw");
  const confirmPasswordInput = document.querySelector("#cpsw");
  

  let users = [];

        // Load existing messages
        const existingUsers = localStorage.getItem('users')

        if (existingUsers !== null) {
            const usersList = JSON.parse(existingUsers)
            messages = [...users, ...usersList]
        }
        //reset all input fields
        const reset = () =>{
            fullNameInput.value = '';
            emailInput.value = '';
            passwordInput.value = '';
            confirmPasswordInput.value = '';
            users = []
        }
        form.addEventListener('submit', (e)=>{
            reset();
        })
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const fullName = fullNameInput.value
            const email = emailInput.value
            

            const newUser = {
                fullName: fullName,
                email: email
              
            }

            users = [...users, newUser]         

            localStorage.setItem("users", JSON.stringify(users))

            alert("You have been registered successfully")
        });
})
    document.addEventListener("DOMContentLoaded", () => {
        const usersTable = document.querySelector("#users-table tbody");

        const usersStr = localStorage.getItem("users");

        if (usersStr !== null) {
            const users = JSON.parse(usersStr);

            messages.forEach((user) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${user.fullName}</td>
                    <td>${user.email}</td>
                    <td>${new Date().toLocaleDateString('en-US')}</td>
                    <td>
                        <span></i><i class="ri-delete-bin-line delete"></i></span>
                        
                    </td>
                `;
                usersTable.appendChild(row);
            });
        }
    });
//function to delete user row
document.addEventListener("click", (event) => {
            if (event.target.classList.contains("delete")) {
                const row = event.target.closest("tr");
                row.remove();
                
            }
        });

