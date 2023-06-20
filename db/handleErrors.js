export const handleErrors = (code) => {
  if (!code) {
    return {
      status: 500,
      message: "Error de Servidor",
    };
  }

  switch (code) {
    case "22P02": {
      return {
        status: 400,
        message: "Formato no válido en el parámetro de la consulta",
      };
    }
    case "404": {
      return {
        status: 404,
        message: "No existe ese registro",
      };
    }
    case "42601": {
      return {
        status: 500,
        message: "Error de Sintaxis en la Query de Consulta",
      };
    }
    case "42P01": {
      return {
        status: 404,
        message: "No encuentra la tabla a la cual conectarse",
      };
    }

    default:
      return {
        status: 500,
        message: "Error de Server",
      };
  }
};
