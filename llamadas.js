const apiKey = "okwtriyy3Wa5m0goOuRKS8pLIGQ5t4YwXOCOa3U3";

//eventos
//document.addEventListener("DOMContentLoaded", GetContratoXID);
//const profileScreen = document.getElementById("progile-screen");

document
  .getElementById("BuscarContratoBoton")
  .addEventListener("click", function () {
    //Obtener el valor de Contrato_input
    const contractId = document.getElementById("contrato_input").value.trim();

    if (!contractId) {
      showToast("Por favor, ingresa un número de contrato.", "orange");
      return;
    } else {
      GetContratoXID(contractId);
      GetEdoCuentaXID(contractId);
    }
  });

//funciones para consumo e impresion de datos de la API
function GetContratoXID(parametro) {
  const contrato = parametro;
  const ContenedorColapsible = document.getElementById("collapsible"); // Div que se expande
  const inputs = document.querySelectorAll(".collapsible-input"); // Todos los inputs dentro del div

  // Antes de consultar, limpiar los inputs si el div está abierto
  if (ContenedorColapsible.classList.contains("expanded")) {
    inputs.forEach((input) => (input.value = ""));
  }
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
    .then((resp) => resp.json())
    .then((data) => {
      if (data) {
        showToast("Contrato encontrado con exito.", "green");

        mostrarDatosHTML(data);

        // Expander el formulario si no está expandido
        ContenedorColapsible.classList.add("expanded");
      }
      if (!data) {
        showToast("Lo siento, pero el contrato ingresado no existe.", "red");
      }
    });

  /*  .catch((error) => {
      showToast("Hubo un error con el contrato.", "red");
      console.error(error);
    }); */
}

function showToast(message, color) {
  Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "right",
    backgroundColor: color,
    stopOnFocus: true,
  }).showToast();
}

function mostrarDatosHTML(datos) {
  //mostrar datos en la consola para comprobar su funcionamiento
  console.log(datos);
  //asignar el valor de cada dato de JSON a un input en especifico
  document.getElementById("tarifa_input").value = datos.descripcionTarifa;
  document.getElementById("servicio_input").value = datos.descripcionFormaCobro;
  document.getElementById("direccion_input").value =
    datos.nombreCalle +
    " #" +
    datos.numeroExterior +
    ", " +
    datos.nombreColonia +
    ", " +
    datos.cp;

  document.getElementById("saldo_input").value = "$ " + datos.saldo;
  console.log(datos.saldo);
  GenerarFechavencimiento(datos);
}

//hacer una funcion que recorra 4 vectores con los sectores de cada ciclo, y donde caiga ponerle el dia que vence a una cosntante.

function GenerarFechavencimiento(datos) {
  //array con todos los sectores de AMD
  const sectores = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
    60, 61, 62,
  ];

  //declaracion de variables para tratar la clave de ubicacion y sacar el sector de esta
  let ubicacion = datos.cve_ubica;
  //tomamos los caracteres que nos importan de la cadena
  const sectorApi = parseInt(ubicacion.substring(2, 4));
  let sector = 0;

  //variable para guardar el dia de vencimiento
  let diaVen = "";

  //buscamos el sector al que pertenece el contrato recorriendo el array sectores en un ciclo for
  for (let i in sectores) {
    if (sectorApi == sectores[i]) {
      //cuando se da el match, guardamos el sector encontrado
      sector = sectores[i];
    }
  }
  //definimos a que dia de vencimiento le corresponde el sector encontrado y se guarda el dia de vencimiento
  if (sector > 0 && sector < 14) {
    diaVen = "30";
    console.log(diaVen);
  }
  if (sector >= 14 && sector <= 29) {
    diaVen = "07";
    console.log(diaVen);
  }
  if (sector >= 29 && sector <= 48) {
    diaVen = "14";
    console.log(diaVen);
  }
  if (sector >= 49 && sector <= 62) {
    diaVen = "21";
    console.log(diaVen);
  }
  //concatenar el dia de vencimiento el mes y año actual para formar la fecha de vencimiento completa
  const date = new Date();
  //Obtenemos el mes y año actual
  const month = date.getMonth("MM") + 1;
  const year = date.getFullYear();

  //aplicar criterios para la fecha de vencimiento cuando sean dias festivos o domingos***
  //generamos la fecha de vencimiento concatenando las constantes y seteando el texto en su respectivo campo
  document.getElementById("fecven_input").value =
    diaVen + "/" + month + "/" + year;
}

function GetEdoCuentaXID(parametro) {
  const contrato = parametro;

  fetch(`http://172.16.150.17:4000/api/edocuenta?contrato=${contrato}`, {
    method: "GET", // Método de la petición (puedes usar POST si es necesario)
    headers: {
      "Content-Type": "application/json", // Tipo de contenido
      "X-API-KEY": ` INCREASEDecay02Ni3R10Path99Alter`, // Autorización con la API Key
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      if (data) {
        //showToast("Contrato encontrado con exito.", "green");
        console.log("Esta bien");
        mostrarDatosHTML(data);
      }
      if (!data) {
        // showToast("Lo siento, pero el contrato ingresado no existe.", "red");
        console.log("Esta mal");
      }
    });

  /*  .catch((error) => {
      showToast("Hubo un error con el contrato.", "red");
      console.error(error);
    }); */
}
