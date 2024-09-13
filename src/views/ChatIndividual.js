//IMPORTACION DE FUNCIONES A UTILIZAR
import { data } from "../data/dataset.js";
import { navigateTo } from "../router.js";
import { communicateWithOpenAI } from "../lib/openAIApi.js";
import { renderMessage } from "../components/chatMessage.js";

export const IndividualChat = (props) => {
  //console.log("Imprimiendo los props ", props);

  //Constante para renderizar los caracteres de interés de acuerdo al id del chat invidivual
  const renderCharacter = data.find((element) => element.id === props.soy);
  //console.log(renderCharacter.imageUrl);

  //RENDERIZADO DEL CHAT
  const viewChat = document.createElement("div");
  viewChat.setAttribute("id", "individualChatContainer");
  viewChat.innerHTML = `
    <header id="headerChat">
      <button class= "profile">
        <figure id="characterPhotoName" class="background-color-${renderCharacter.id}">
         <img src="${renderCharacter.imageUrl}" alt="Foto de perfil de ${renderCharacter.name}"> 
        </figure>
        <div class="profileText">
          <p id="characterName">${renderCharacter.name}</p>
          <p id ="moreInfo">Información de la mascota</p>
        </div>  
      </button>

      <div id="optionsIndividualChat">
        <button id= "homeBack" class= "btnHomeBack">
          <img src= "../icons/home.svg" alt= "Inicio">
        </button>
      </div>
    </header>

    <main id="mainChat">
      <div id="chatContainer">
      </div>  
    </main>
    <footer id="footerIndividualChat">
      <div id="divTypingBar">
        <input id="typingBar" type="text" placeholder="Escribe un mensaje para ${renderCharacter.name}..."></input>
        <button id="btnChatSent">
          <img src="../icons/send-button.svg" alt="send-button" id="sendButtonIcon">
        </button>
      </div>
    </footer>
    `;

  //BOTÓN PARA VOLVER A HOME
  const btnBackHome = viewChat.querySelector("#homeBack");
  btnBackHome.addEventListener("click", () => {
    navigateTo("/");
  });

  //CONECTAR LA RESPUESTA DE OPEN AI CON LOS ELEMENTOS DEL CHAT

  const characterId = props.soy; //Argumento para el segundo parámetro de comunicateWithOpenAI
  const idContext = renderCharacter.description;
  const messageUsuario = viewChat.querySelector("#typingBar"); //Input del mensaje
  const sendMessage = viewChat.querySelector("#btnChatSent"); //Botón que envía el mensaje
  const mainContainer = viewChat.querySelector("#chatContainer"); //Espacio dónde se renderizará el contenedor del chat

  sendMessage.addEventListener("click", async () => {
    //console.log(messageUsuario.value); Comprobar que se envía mi mensaje
    if (!messageUsuario.value) return; //Que si no hay valores en el input y se da click en enviar
    //no se haga el envío, cada envío de mensaje genera un costo
    console.log(messageUsuario.value); //Imprimir el mensaje del usuario en la consola

    const userMessage = messageUsuario.value; // Guardar el mensaje del usuario
    //Se guarda para poder utilizarlo como argumento en la función de renderizado
    messageUsuario.value = ""; // Limpiar el input después de enviar

    const userMessageElement = renderMessage(userMessage, null); //Traer la función que renderiza los mensajes
    mainContainer.appendChild(userMessageElement); //Imprimir el mensaje del usuario en main

    const response = await communicateWithOpenAI(
      userMessage,
      characterId,
      idContext
    ); //Traer la función de la API para pasarle los argumentos

    const aiResponse = response.choices[0].message.content; // Extraer la respuesta de la API

    const aiMessageElement = renderMessage(null, aiResponse); //Renderizar la respuesta de la API en el chat
    mainContainer.appendChild(aiMessageElement);
  });
  return viewChat;
};

//HTML para el menú de opciones
/*<button id="chatOptions">
<i class="fa-solid fa-ellipsis" id="optionIcons"></i>
</button>
<button class = "chatGroupBtn"> 
          <img src= "../icons/message-group.svg" alt= "Chat Grupal">
</button>

 <div id="mesaggeSent">
          <div class="dialogueBubbles"></div>
          <figure class="photoBubble" id="photoBubbleCharacter ">
          <img src="" alt="">
          </figure>
        </div>
        <div id="mesaggeReceived">
          <div class="dialogueBubbles"></div>
          <figure class="photoBubble" id="photoBubbleUser">
            <img src="" alt="">
          </figure>
        </div> */