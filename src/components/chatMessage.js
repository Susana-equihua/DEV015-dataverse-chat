export const renderMessage = ( send, receiver) => {
  const messageContainer = document.createElement('div');
  messageContainer.setAttribute("class","containerMessage");
  const msg = []
  msg.forEach(() =>{
    const message = document.createElement('div');
    message.setAttribute("class","mensaje");
    message.innerHTML = send && receiver;    
  });

}