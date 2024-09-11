export const renderMessage = ( senderMessage, receiverMessage) => {
  const messageContainer = document.createElement('div');
  messageContainer.setAttribute("class","containerMessage");

  if (senderMessage) { //Mensaje de usuario
    const userMessage = document.createElement('div');
    userMessage.setAttribute('class','messageUser');
    userMessage.innerHTML = senderMessage;
    messageContainer.appendChild(userMessage);
  }
  
  if (receiverMessage) { // Respuesta de la API
    const aiMessage = document.createElement('div');
    aiMessage.setAttribute('class','messageReceiver');
    aiMessage.textContent = receiverMessage;
    messageContainer.appendChild(aiMessage);
  }
  return messageContainer
};

