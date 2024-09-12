import { getApiKey } from "./apiKey.js";  //Conectar Open AI a través de la API Key

export const communicateWithOpenAI = async (messages, receiver, context) => {  //Declara una función asíncrona (async) 

  const myApikey = getApiKey("inputApiKey"); 
  const openAIurl = "https://api.openai.com/v1/chat/completions";   // URL que proporciona OpenAI para poder acceder a su API
  
  if (!myApikey) {
    throw new Error("API Key proporcionada no es válida");
  }

  try { //Fetch retorna una promesa
    const res = await fetch(openAIurl, {  //await Esperar a que la promesa de fetch se resuelva para ejecutar el código
      method: "POST",   // Método HTTP que utilizará fetch, POST envía datos
      headers: {  
        "Content-Type": "application/json",   // Indica que se van a enviar datos de tipo JSON
        Authorization: `Bearer ${myApikey}`,  // Autenticación de la clave con el token Bearer
      },
      body: JSON.stringify({ // Convertir el objeto de JavaScript en una cadena de texto en formato JSON.
        model: "gpt-4o",
        messages: [   //Arreglo de mensajes que se enviarán al modelo OpenAI para generar la respuesta
          {
            role: "system",   //Instrucciones al modelo para su comportamiento durante toda la conversación
            content: `Eres ${receiver} una mascota de Disney. Utiliza la información de ${context} para responder los mensjaes. Puedes preguntar el nombre del usuario para mencionarlo solo cuando sea necesario. Mantén la conversación coherente con los mensajes que recibes del usuario. Usa un tono relajado, divertido y juguetón. No saludes en cada respuesta. No utilices emojis.`, 
          },
          {
            role: "user",   //Usuario que envía el mensaje
            content: messages,  // Mensaje del usuario
          },
        ],
        max_tokens: 150,  // Limitar la cantidad de tokens en la respuesta; controla la longitu de la repsuesta
        temperature: 0.7,   //Controla el nivel de "creatividad" o "aleatoriedad" de las respuestas generadas por la IA
      }),
    });
    const responseData = await res.json(); // Convertir la respuesta a JSON
    console.log("Respuesta:", responseData);

    return responseData;

  } catch (error) { 
    console.error("Error:", error); //El objeto error proporciona información sobre lo que salió mal.
  }
  //Aquí es donde debes implementar la petición con fetch o axios
};
