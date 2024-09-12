import { communicateWithOpenAI } from "../src/lib/openAIApi.js";
import { getApiKey } from "../src/lib/apiKey.js";

/*Mock en pruebas unitarias (como en Jest), es una simulacion de una función
o módulo para controlar su comportamiento durante las pruebas
* Esta función simulada puede devolver cualquier valor que queramos y nos permite verificar
si fue llamada, cuántas veces fue llamada y con qué argumentos.
*/

//MOCKS DE LA FUNCIÓN getApiKey CON jest.mock para reemplazar un módulo con una versión somulada en las pruebas.
jest.mock("../src/lib/apiKey", () => ({
  getApiKey: jest.fn(),
}));

//Bloque de pruebas para evaluar la función comunicateWithOpenAI
describe("communicateWithOpenAI", () => {
  beforeEach(() => {
    jest.clearAllMocks(); //Al iniciar la prueba se reestableceran todos los mocks para cada prueba
    //global.fetch = jest.fn(); //Reemplaza el método fetch global del navegador con una versión mockeada con jest.fn()
  });

  //COMPROBAR QUE COMMUNICATE MANEJA CORRECTAMENTE CUANDO UNA API KEY ES INVALIVDA (lanza el error adecuado)
  test("Debería devolver un error si la API key no es válida", async () => {
    getApiKey.mockReturnValue(null);

    await expect(communicateWithOpenAI(getApiKey())).rejects.toThrow(
      "API Key proporcionada no es válida"
    );
  });

  test("Devuelve una respuesta acorde a una mascota de Disney", async () => {
    //Simular que getApiKey devuelve una clave válida
    getApiKey.mockReturnValue("apiKey-valida"); //Necesaria para que funcione la solicitud de OpenAI

    //Primero declarar global.fetch para despues poder utilizarlo
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            role: "system",
            content: "Hola, me llamo Pluto, soy el mejor amigo de Mickey Mouse",
          }),
      })
    );

    const response = await communicateWithOpenAI("Hola"); //Se llama a la función pasándole Hola como argumento

    expect(response.role).toBe("system");

    expect(response.content).toBe(
      "Hola, me llamo Pluto, soy el mejor amigo de Mickey Mouse"
    );
  });

  

  /*global.fetch = jest.fn(() =>  //Da undefined
      Promise.resolve({
        json: () =>
          Promise.resolve({
            messages: [
              {
                // Datos que esperamos recibir
                role: "system",
                content:
                  "Hola, me llamo Pluto, soy el mejor amigo de Mickey Mouse",
              },
            ]
          }),
      })
    );*/
}); //Fin del bloque describe
