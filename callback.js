//funciones para llamar al cliente de google

window.handleCredentialResponse = function (response) {
  // Decodificar el token JWT para obtener los datos del usuario
  const data = parseJwt(response.credential);
  console.log("Datos del usuario:", data);
  submitProfileInfo(data);
};

function submitProfileInfo(datos) {
  // Get the value entered by the user

  var username = datos.name;
  var email = datos.email;
  var picture = datos.picture;

  console.log(username, " ", email, " ", picture);
  // Store the value in localStorage
  localStorage.setItem("Profile_User", username);
  localStorage.setItem("Profile_Email", email);
  localStorage.setItem("Profile_Picture", picture);

  // Redirect to the second page
  window.location.href = "/amd_pago_en_linea_lobby";
}

// Función para decodificar el token JWT
function parseJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  return JSON.parse(atob(base64));
}

//cerrar sesion de google en mi aplicacion web
function signOut() {
  google.accounts.id.disableAutoSelect();
  console.log("Sesión cerrada, pero permisos siguen activos.");
  alert("Has cerrado sesión correctamente.");
  location.reload();
}
