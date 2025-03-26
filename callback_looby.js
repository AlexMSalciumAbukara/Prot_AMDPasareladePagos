window.onload = function () {
  // Get the value from localStorage

  var usu_nombre = localStorage.getItem("Profile_User");
  var usu_correo = localStorage.getItem("Profile_Email");
  var usu_foto = localStorage.getItem("Profile_Picture");
  mostrarDatosUserGoogle(usu_nombre, usu_correo, usu_foto);
};

function mostrarDatosUserGoogle(nombre, correo, foto) {
  // Mostrar los datos en la página
  document.getElementById("user-name").textContent = nombre;
  document.getElementById("user-email").textContent = correo;
  document.getElementById("user-picture").src = foto;
}
