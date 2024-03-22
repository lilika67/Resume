const sendMessage = async(message) => {
  try{
    const response = await fetch('https://mybrand-backend-v82m.onrender.com/api/v1/messages',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message),
    });
    console.log(response);
  }catch 
  (error){
    console.log(error);
  }
}

