// users.js

// Datos de usuarios almacenados en formato JSON
const usersData = {
    users: [
      {
        username: "pau",
        password: "patata",
        dateOfBirth: "1990-01-01",
      },
      {
        username: "paco",
        password: "patata",
        dateOfBirth: "2020-05-10",
      },
    ],
  };
  
  // Función para verificar el acceso de un usuario
  function verifyUser(username, password) {
    // Buscar el usuario en los datos almacenados
    const user = usersData.users.find(
      (user) => user.username === username && user.password === password
    );
  
    // Retornar true si el usuario existe y las credenciales son correctas
    return !!user;
  }
  function saveUser(username) {
    // Obtener los datos del usuario del objeto usersData
    const user = usersData.users.find((user) => user.username === username);
  
    // Verificar si se encontró el usuario
    if (user) {
      // Guardar los datos del usuario en el localStorage
      localStorage.setItem("usuario", user.username);
      localStorage.setItem("dateOfBirth", user.dateOfBirth);
      // Otros datos que desees guardar
  
      console.log("Usuario guardado en el localStorage");
    } else {
      console.log("Usuario no encontrado");
    }
  }
  // Exportar la función verifyUser para que esté disponible en otros archivos
  export { verifyUser, saveUser };
  