document.addEventListener("DOMContentLoaded", async () => {
    const usersTable = document.querySelector("#users-table tbody");
    let response;

    try {
       response = await fetch('http://localhost:4000/api/v1/users', {
            method: 'GET'
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch users. Status: ${response.status}`);
        }
        const responseData = await response.json();

        console.log('Response Data:', responseData); 

        if ( responseData.length === 0) {
            throw new Error('No users found in response');
        }

        responseData.allUsers.forEach((user) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>${new Date(user.createdAt).toLocaleDateString('en-US')}</td>
                <td>
                    <span><i class="ri-delete-bin-line delete"></i></span>
                </td>
            `;
            usersTable.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching or processing users:', error);
        if (response) {
            console.error('Response status:', response.status);
        }
    }
});

//function to delete message row
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete")) {
        const row = event.target.closest("tr");
        row.remove();
        
    }
});
