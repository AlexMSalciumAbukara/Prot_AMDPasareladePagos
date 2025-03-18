//url de la API a consumir
//const url = `https://d0cxa2s8xh.execute-api.us-east-1.amazonaws.com/development/user/contratoSuite?contratoID${parametro}`;

const apiKey = "okwtriyy3Wa5m0goOuRKS8pLIGQ5t4YwXOCOa3U3";

//eventos
//document.addEventListener("DOMContentLoaded", GetContratoXID);

document
  .getElementById("BuscarContratoBoton")
  .addEventListener("click", function () {
    //Obtener el valor de Contrato_input
    const usu_cont = document.getElementById("contrato_input").value;
    //llamado a la funcion GetContratoXID
    GetContratoXID(usu_cont);
  });

//funciones para consumo e impresion de datos de la API
function GetContratoXID(parametro) {
  //parametro = 1236;
  const contrato = parametro;
  fetch(
    `https://d0cxa2s8xh.execute-api.us-east-1.amazonaws.com/development/user/contratoSuite?contratoID=${contrato}`,
    {
      method: "GET", // Método de la petición (puedes usar POST si es necesario)
      headers: {
        "Content-Type": "application/json", // Tipo de contenido
        "X-API-KEY": ` ${apiKey}`, // Autorización con la API Key
      },
    }
  )
    .then((resp) => {
      if (!resp.ok) {
        throw new Error(
          `Error en la petición: ${resp.status} ${resp.statusText}`
        );
      }
      return resp.json();
    })
    .then((data) => mostrarDatosHTML(data))
    .catch((error) => console.error("Error al consumir la API:", error));
}

function mostrarDatosHTML(datos) {
  //mostrar datos en la consola para comprobar su funcionamiento
  console.log(datos);
  //asignar el valor de cada dato de JSON a un input en especifico
  document.getElementById("tarifa_input").value = datos.descripcionTarifa;
  document.getElementById("servicio_input").value = datos.descripcionFormaCobro;
  document.getElementById("saldo_input").value = "$ " + datos.saldo;
}
