document.addEventListener("DOMContentLoaded", ()=>{
  const form = document.querySelector("#form");
  const fullNameInput = document.querySelector("#name");
  const emailInput = document.querySelector("#email");
  const messageInput = document.querySelector("#message");

  let messages = [];

        // Load existing messages
        const existingMessages = localStorage.getItem('messages')

        if (existingMessages !== null) {
            const messagesList = JSON.parse(existingMessages)
            messages = [...messages, ...messagesList]
        }
        const reset = () => {
            fullNameInput.value = "";
            emailInput.value = "";
            messageInput.value = "";
            messages = [];
          };
          form.addEventListener("submit", () => {
            reset();
          });
        
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const fullName = fullNameInput.value
            const email = emailInput.value
            const message = messageInput.value

            const clientMessage = {
                fullName: fullName,
                email: email,
                message: message
            }

            messages = [...messages, clientMessage]         

            localStorage.setItem("messages", JSON.stringify(messages))

            alert("Message sent successfully")
        });
})