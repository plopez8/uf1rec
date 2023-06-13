function calcularEdad(fecha) {
    var hoy = new Date();
    var fechaNacimiento = new Date(fecha);
    var edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    var dias = Math.floor((hoy - fechaNacimiento) / (1000 * 60 * 60 * 24));
  
    if (hoy.getMonth() < fechaNacimiento.getMonth() || (hoy.getMonth() === fechaNacimiento.getMonth() && hoy.getDate() < fechaNacimiento.getDate())) {
      edad--;
    }
  
    var diasCompletos = edad * 365;
    var diasAdicionales = dias - diasCompletos;
  
    return edad + " años y " + diasAdicionales + " días";
  }
  
  export { calcularEdad };
  