export function generarMatriu(width, height) {
    var matriz = [];
    for (var amp = 0; amp < width; amp++) {
      matriz[amp] = [];
      for (var alt = 0; alt < height; alt++) {
        matriz[amp][alt] = false;
      }
    }
    return matriz;
  }
  
  export function checkPosi(posX, posY, matriu) {
    for (var x = posX - 20; x <= posX + 20; x++) {
      for (var y = posY - 20; y <= posY + 20; y++) {
        if (matriu[x] && matriu[x][y]) {
          return true;
        }
      }
    }
    return false;
  }
  