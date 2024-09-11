//SE DECLARA LA VARIABLE DE TIPO let LLAMADA ROUTES EL CUAL SU VALOR ES UN OBJETO VACÍO 
//Variable que almacena la información de las rutas en la SPA
let ROUTES = {}; /* stores the paths of index.js */ 

//SE DECLARA LA VARIABLE DE TIPO let LLAMADA rootEl, NO TIENE UN VALOR DETERMINADO
let rootEl; /* stores the paths of index.js */  

//DECLARAR FUNCIONES A LAS VARIABLES (FUNCION DECLARATIVA, FUNCION EXPRESADA)
/*FUNCIONES EXPRESADAS: Aquella que se define como una expresión lo cual significa que se 
asigna a una variable. LA función puede ser anónima o nombrada.
*/
//FUNCION PARA ESTABLECER EL ELEMENTO RAÍZ DONDE EL CONTENIDO VA A CAMBIAR/DESAPARECERÁ
/*Se le declara una funcion anónima de tipo flecha a la variable setRootEl, la cual tiene
como parámetro a el (un elemento).
Esta variable se le asigna un export para poder ser utilizado en otro módulo
*/
export const setRootEl = (el) => {  
  rootEl = el;   //A la variable let rootEl se le asigna el valor el, que es el parámetro
  return rootEl; //Se retorna rootEl con su nuevo valor
};

//FUNCION PARA ASIGNAR EL VALOR DEL PARÁMETRO routes AL OBJETO ROUTES
export const setRoutes = (routes) => {
  //*? Throw errors if routes isn't an object
  //CONDICIONAL PARA HACER UNA VERIFICACIÓN DE TIPO (typeof)
  //Si routes no es (!==) un objeto 
  if (typeof routes !== "object") {
    throw new Error("Ups! This isn't an object"); //Arroja una advertencia de que routes no es un objeto
  }
  //*? Throw errors if routes doesn't define an /error route
  //Verificar si la propiedad /error en routes no existe o no está definida (undefined)
  if (routes?.["/error"] === undefined) { /*Se utiliza el operador de encadenamiento opcional (?.) para
    comprobar si routes no es null ni undefined antes de intentar acceder a la propiedad "/error". 
    Si routes es null o undefined, en lugar de lanzar un error, la expresión se evaluará como undefined.
    */ 
    throw new Error("Ups! path '/error' has not been found"); //Lanzar un error con este mensaje específico
  }
  //*? Assign ROUTES Asignar el parámetro routes al objeto (let ROUTES = {};)
  ROUTES = routes; /* update ROUTES with the "routes" argument of index.js */
  return ROUTES;
};


//FUNCION PARA CONVERTIR LOS PARAMS EN OBJETOS
//FUNCION EXPRESADA queryStringToObject, QUE TENDRÁ UNA FUNCIÓN ANÓN
const queryStringToObject = (queryString) => {
  //*? Convert query string to URLSearchParams
  const params = new URLSearchParams(queryString);
  //*? Convert URLSearchParams to an object
  const objParams = Object.fromEntries(params);
  //*? Return the object
  return objParams;
};

//console.log(queryStringToObject("name=Susy"));

//FUNCION PARA RENDERIZAR LA VISTA DE ACUERDO AL PATHNAME DE LA URL
/*Función expresada que le pertenece a la variable renderView, con los parámetros pathname y
props cómo un objeto vacío*/
const renderView = (pathname , props = {}) => { 
  //*?Clear the root element
  rootEl.innerHTML = ""; //Se limpia todo el contenido del elemento raiz (rootEl);
  //*?Find the correct view to render
  //Se crea una función que contiene el pathname de ROUTES
  //La propiedad pathname obtiene su valor pasarle los parametros a la funcion renderView dentro de la funcion onURL
  const viewsFunctions= ROUTES[pathname]; 
  /*const viewsFunctions= ROUTES.pathname; Al acceder a la propiedad por medio del punto arroja undefined
  porque no existe una variable o una propiedad que literal se llame pathname*/
  //console.log(viewsFunctions); //Se imprime en la consola del navegador el pathname de la vista a la que corresponde
  //*? In case not found render the error view
  //
  if (!viewsFunctions) {  //Si viewFunctions es falso (falsy), ejecuta el código que está dentro del if
    //Renderiza la vista que se encuentra en el pathname de errora través del llamado a la función con ()
    rootEl.appendChild(ROUTES["/error"]()); /* Parentheses are placed to call the function */
    //Si no, renderiza en rootEl la vista correspondiente el pathname (viewsFunctions) con su argumento props
  } else rootEl.appendChild(viewsFunctions(props)); /* Parentheses are placed to call the function */
};

//FUNCION PARA MANEJAR LOS CAMBIOS EN LA URL 
export const onURLChange = (location) => {
  //Declarar una variable que guarde el pathname de la url
  //window.location es una objeto del que podemos encontrar el pathname de la url (window.locatio.pathname)
  const path = location.pathname; /* calling the window pathname */
  //const path = window.location.pathname; Se deja en location para que el parámetro de la función quede declarado
  //to-do: search params (objeto)
  //Declarar una constante que guarde los search de la url
  //Los search debemos convertirlos a un objeto, en este caso con la función de queryStringToObject
  const search = queryStringToObject(window.location.search);
  //Una vez obtenido el pathname y search, se pasan como argumentos a la función de renderview
  renderView(path, search); /* connecting onURLChange to renderView */
};

export const navigateTo = (pathname, props={}) => { // 
  const urlSearch = new URLSearchParams(props);
  console.log(urlSearch);
  const urlOrigin = window.origin + pathname + "?" + urlSearch;
  if(window.history && window.history.pushState){
    window.history.pushState(props, '', urlOrigin);
    const searchObj = queryStringToObject(props)
    renderView(pathname, searchObj);
  }
};



/*export const navigateTo = (pathname, props={}) => { //navogateTo tiene 3 propósitos: Recibir una ruta, evía un nuevo estado histórico y representa la nueva vista
  // Agrega una nueva vista al historial
  const nuevaVista = new window.history.pushState(props)
  // new es una palabra reservada para crear algo nuevo
  // render the view with the pathname and props
  return renderView(pathname, props)
}*/


















//TODO: Testing the conditional for error throwing
/* const hola = 'Good morning'
try {
    setRoutes(hola)
} catch(error){
    console.log(error.name, error.message)
} */
//TODO: Exercise to learn how for...in
/* const trabalengua = {
  nombre: 'Pablito',
  accion: 'clavó',
  cosa: 'un clavito'
}
for (const props in trabalengua){
  console.log(trabalengua[props])
} */
