//IMPORTACION DE FUNCIONES A UTILIZAR
import { data } from "../data/dataset.js";
import { navigateTo } from "../router.js";
import { communicateWithOpenAI } from "../lib/openAIApi.js";

export const IndividualChat = (props) => {
  //console.log("Imprimiendo los props ", props);

  //Constante para renderizar los caracteres de interés de acuerdo al id del chat invidivual
  const renderCharacter = data.find((element) => element.id === props.soy);
  //console.log(renderCharacter.imageUrl);

  const characterId = props.soy; //Argumento para el segundo parámetro de comunicateWithOpenAI

  //RENDERIZADO DEL CHAT
  const viewChat = document.createElement("div");
  viewChat.setAttribute("id", "individualChatContainer");
  viewChat.innerHTML = `
    <header id="headerChat">
      <figure id="characterPhotoName">
        <img src="${renderCharacter.url}" alt="Foto de perfil de ${renderCharacter.name}"> 
      </figure>
      <p id="characterName">${renderCharacter.name}</p>
      <button id="chatOptions">
        <i class="fa-solid fa-ellipsis" id="optionIcons"></i>
      </button>

      <div id="optionsIndividualChat">
        <button id= "homeBack" class= "btnHome">
          <img src= "../icons/home.svg" alt= "Inicio">
        </button>
        <button class = "chatGroupBtn"> 
          <img src= "../icons/message-group.svg" alt= "Chat Grupal">
        </button>
      </div>
    </header>
    <main id="mainChat">
      <div id="chatContainer">
        <div id="mesaggeSent">
          <div class="dialogueBubbles"></div>
          <figure class="photoBubble" id="photoBubbleCharacter /* props */">
            <img src="" alt="">
          </figure>
        </div>
        <div id="mesaggeReceived">
          <div class="dialogueBubbles"></div>
          <figure class="photoBubble" id="photoBubbleUser">
            <img src="" alt="">
          </figure>
        </div>
        <p id="output"></p>
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
  const backHomeBtn = viewChat.querySelector("#homeBack");
  backHomeBtn.addEventListener("click", () => {
    navigateTo("/");
  });

  //CONECTAR LA RESPUESTA DE OPEN AI CON LOS ELEMENTOS DEL CHAT
  const messageUsuario = viewChat.querySelector("#typingBar"); //Input del mensaje
  const answerChat = viewChat.querySelector("#output"); //Parrafo para ver respuesta
  const sendMessage = viewChat.querySelector("#btnChatSent"); //Botón que envía el mensaje

  //Funcion para renderizar los mensajes enviados y recibidos
  //const renderMessage = () => {  };

  sendMessage.addEventListener("click", async () => {
    //console.log(messageUsuario.value); Comprobar que se envía mi mensaje
    if (!messageUsuario.value) return; //Que si no hay valores en el input y se da click en enviar
    //no se haga el envío, cada envío de mensaje genera un costo
    console.log(messageUsuario.value);
    //Traer la funcion del renderizado del mansaje
    //Respuesta
    const response = await communicateWithOpenAI(
      messageUsuario.value,
      characterId
    );
    console.log(response);
    answerChat.innerHTML = response.choices[0].message.content;
  });

  // let messages = []; // Aquí se irán guardando los mensajes enviados/recibidos

  


  return viewChat;
};
