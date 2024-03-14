const sendMessage = async(message) => {
  try{
    const response = await fetch('http://localhost:4000/api/v1/messages',{
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