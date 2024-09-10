import Home from "./views/Home.js"; //Traemos la función de Home (donde están todas las tarjetas)
import { About } from "./views/About.js"; //Traemos la función que contiene la vista de about
import { Error } from "./views/Error.js"; //Traemos la funcion que contiene la vista de error page
import { IndividualChat } from "./views/ChatIndividual.js"; //Traemos la funcion que contiene la vista de chat individual
import { setRootEl, setRoutes, onURLChange } from "./router.js"; //Traemos la funciones del router
import { ApiKey } from "./views/ViewApikey.js"; //Traemos la funcion de la vista de apikey

//En este archivo definirás tus rutas e importarás los componentes que vas a renderizar.
/*CONSTANTE routes ES UN OBJETO QUE CONTIENE LOS PATHNAME DE LA URL;
Los pathname son pares de key-value; key es el pathname de la URL y el value es la vista
*/
const routes = {
  "/": Home,     //Home es la función que contiene todo el código que renderizará esta vista
  "/about": About,
  "/error": Error,
  "/chat": IndividualChat,
  "/apikey": ApiKey,
};


//Asignar a la funcion setRoutes el objeto routes
setRoutes(routes); /* routes are being saved in ROUTES */

//window hace referencia a la ventana del navegador; agregamos un manejador de eventos 
window.addEventListener("DOMContentLoaded", () => {
  setRootEl(document.getElementById("root"));
  onURLChange(window.location);
});

window.addEventListener("popstate", ()=> {
  onURLChange(window.location);
});

/*TODO:
1.- Definir rutas en router.
2.- Pasar "root element" a router.
3.- Invocar el router para renderizar la vista correcta.*/
