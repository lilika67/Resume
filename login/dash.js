document.addEventListener("DOMContentLoaded", async () => {
    const usersTable = document.querySelector("#users-table tbody");
    let response; // Declaring response variable outside try block

    try {
        response = await fetch('http://localhost:4000/api/v1/users', {
            method: 'GET'
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch users. Status: ${response.status}`);
        }
        const responseData = await response.json();

        console.log('Response Data:', responseData); // Log the responseData for debugging

        if (!Array.isArray(responseData) || responseData.length === 0) {
            throw new Error('No users found in response');
        }

        responseData.forEach((user) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.email}</td>
                <td>${new Date(user.createdAt).toLocaleDateString('en-US')}</td>
                <td>
                    <span><i class="ri-delete-bin-line delete"></i></span>
                </td>
            `;
            usersTable.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching or processing users:', error);
        // Log the error without trying to read the response body again
        if (response) {
            console.error('Response status:', response.status);
        }
    }
});
