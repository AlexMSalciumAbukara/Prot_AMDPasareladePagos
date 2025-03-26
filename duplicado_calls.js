const apiKey = "okwtriyy3Wa5m0goOuRKS8pLIGQ5t4YwXOCOa3U3";

window.onload = function () {
  // Get the value from localStorage
  var usu_nombre = localStorage.getItem("Profile_User");
  var usu_correo = localStorage.getItem("Profile_Email");
  var usu_foto = localStorage.getItem("Profile_Picture");

  var value = localStorage.getItem("myValue");

  console.log(value);
  GetContratoXID(value);
  GetEdoCuentaXID(value);
  mostrarDatosUserGoogle(usu_nombre, usu_correo, usu_foto);
};

//funciones para consumo e impresion de datos de la API
function GetContratoXID(parametro) {
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
    .then((resp) => resp.json())
    .then((data) => {
      if (data) {
        console.log("contrato bien");
        mostrarDatosUsuario(data);
      }
      if (!data) {
        console.log("contrato mal");
      }
    });

  /*  .catch((error) => {
      showToast("Hubo un error con el contrato.", "red");
      console.error(error);
    }); */
}

function GetEdoCuentaXID(parametro) {
  const contrato = parametro;

  fetch(`http://172.16.150.17:4000/api/edocuenta?contrato=${contrato}`, {
    method: "GET", // Método de la petición
    headers: {
      "Content-Type": "application/json", // Tipo de contenido
      "X-API-KEY": ` INCREASEDecay02Ni3R10Path99Alter`, // Autorización con la API Key
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      if (data) {
        console.log("contrato bien");
        mostrarDatosEdoCuenta(data);
      }
      if (!data) {
        console.log("contrato mal");
      }
    });

  /*  .catch((error) => {
      showToast("Hubo un error con el contrato.", "red");
      console.error(error);
    }); */
}

function mostrarDatosUsuario(datos1) {
  //mostrar datos en la consola para comprobar su funcionamiento
  console.log(datos1);
  //asignar el valor de cada dato de JSON a un input en especifico
  document.getElementById("contrato_input").innerHTML = datos1.contratoID;
  document.getElementById("tarifa_input").innerHTML = datos1.descripcionTarifa;
  document.getElementById("servicio_input").innerHTML =
    datos1.descripcionFormaCobro;
  document.getElementById("giro_input").innerHTML = datos1.descripcionGiro;
  document.getElementById("usuario_input").innerHTML =
    datos1.nombre + " " + datos1.apellidoPaterno + " " + datos1.apellidoMaterno;
  document.getElementById("domicilio_input").innerHTML =
    datos1.direccionCompleta;
  document.getElementById("rfc_input").innerHTML = " ";
  document.getElementById("ubicacion_input").innerHTML = datos1.cve_ubica;
  document.getElementById("medidor_input").innerHTML = datos1.numeroMedidor;
  document.getElementById("totalapagar_input").innerHTML = datos1.saldo;
}

function mostrarDatosEdoCuenta(datos) {
  //mostrar datos en la consola para comprobar su funcionamiento
  console.log(datos);
  //asignar el valor de cada dato de JSON a un input en especifico
  document.getElementById("gejec_input").innerHTML = datos[0].gastos_ejecucion;
  document.getElementById("recargos_input").innerHTML = datos[0].recargos;
  document.getElementById("serv_agua_input").innerHTML = "$ " + datos[0].agua;
  document.getElementById("serv_alcan_input").innerHTML =
    "$ " + datos[0].drenaje;
  document.getElementById("serv_sane_input").innerHTML =
    "$ " + datos[0].saneamiento;
  let rezagos_totales =
    parseInt(datos[0].rezagos_agua) +
    parseInt(datos[0].rezagos_drenaje) +
    parseInt(datos[0].rezagos_saneamiento);
  document.getElementById("rezagos_input").innerHTML =
    "$ " + rezagos_totales.toFixed(2);
  let subtotal_1 =
    parseInt(datos[0].agua) +
    parseInt(datos[0].drenaje) +
    parseInt(datos[0].saneamiento);
  document.getElementById("subtotal1_input").innerHTML =
    "$ " + subtotal_1.toFixed(2);
  let otros_conceptos = datos[0].otros_cargos;
  document.getElementById("otros_cargos_input").innerHTML =
    "$ " + otros_conceptos.toFixed(2);
  document.getElementById("subtotal2_input").innerHTML =
    "$ " + otros_conceptos.toFixed(2);
  document.getElementById("total_pagar_input").innerHTML =
    "$ " + datos[0].Monto.toFixed(2);
}

function mostrarDatosUserGoogle(nombre, correo, foto) {
  // Mostrar los datos en la página
  document.getElementById("user-name").textContent = nombre;
  document.getElementById("user-email").textContent = correo;
  document.getElementById("user-picture").src = foto;
}

//cerrar sesion de google en mi aplicacion web
function signOut() {
  google.accounts.id.disableAutoSelect();
  console.log("Sesión cerrada, pero permisos siguen activos.");
  alert("Has cerrado sesión correctamente.");
  location.reload();
}
