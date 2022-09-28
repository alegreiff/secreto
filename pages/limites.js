import { Box } from "@chakra-ui/react";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import Plantilla from "../components/layout/MainLayout";
import useDatosPolla from "../store/datospolla";

export default function LimitesPage() {
  const { fechas } = useDatosPolla((state) => state);
  const lafecha = new Date();
  console.log(parseISO("2014-02-11T11:30:30"));
  console.log(parseISO("2022-11-21T16:00"));
  //console.log(fechas.HOY);
  const muestraLimite = (nombre = "FASE", fecha) => {
    //console.log(fecha);
    if (fechas) {
      const time = "2019-10-25T08:10:00Z";

      const parsedTime = parseISO(new Date(time));
      //const formattedTime = format(parsedTime, "yyyy-MM-dd kk:mm:ss");
      //console.log(formattedTime);
      //console.log(parsedTime);
    }

    //const formattedTime = format(ini_grupos, "yyyy-MM-dd kk:mm:ss");

    return (
      "<h4>" +
      nombre +
      "</h4>" +
      format(new Date(fecha), "cccc MMM dd H':'mm a", {
        locale: es,
      })
    );
  };
  if (!fechas) {
    return <Box>Cargando</Box>;
  }
  return (
    <Plantilla>
      <h2>Límites</h2>
      {JSON.stringify(lafecha)}
      <Box
        bg="tomato"
        w="100%"
        p={4}
        color="white"
        dangerouslySetInnerHTML={{
          __html: muestraLimite("Límite grupos", fechas.LIMITE_GRUPOS),
        }}
      ></Box>
      <Box
        bg="tomato"
        w="100%"
        p={4}
        color="white"
        dangerouslySetInnerHTML={{
          __html: muestraLimite("Inicio grupos", fechas.INICIO_GRUPOS),
        }}
      ></Box>
      <Box
        bg="tomato"
        w="100%"
        p={4}
        color="white"
        dangerouslySetInnerHTML={{
          __html: muestraLimite("Fin grupos", fechas.FIN_GRUPOS),
        }}
      ></Box>
      <p>*****</p>
      <Box
        bg="tomato"
        w="100%"
        p={4}
        color="white"
        dangerouslySetInnerHTML={{
          __html: muestraLimite("Límite octavos", fechas.LIMITE_OCTAVOS),
        }}
      ></Box>
      <Box
        bg="tomato"
        w="100%"
        p={4}
        color="white"
        dangerouslySetInnerHTML={{
          __html: muestraLimite("Inicio octavos", fechas.INICIO_OCTAVOS),
        }}
      ></Box>
      <Box
        bg="tomato"
        w="100%"
        p={4}
        color="white"
        dangerouslySetInnerHTML={{
          __html: muestraLimite("Fin octavos", fechas.FIN_OCTAVOS),
        }}
      ></Box>
      <p>*****</p>
      <Box
        bg="tomato"
        w="100%"
        p={4}
        color="white"
        dangerouslySetInnerHTML={{
          __html: muestraLimite("Límite cuartos", fechas.LIMITE_CUARTOS),
        }}
      ></Box>
      <Box
        bg="tomato"
        w="100%"
        p={4}
        color="white"
        dangerouslySetInnerHTML={{
          __html: muestraLimite("Inicio cuartos", fechas.INICIO_CUARTOS),
        }}
      ></Box>
      <Box
        bg="tomato"
        w="100%"
        p={4}
        color="white"
        dangerouslySetInnerHTML={{
          __html: muestraLimite("Fin cuartos", fechas.FIN_CUARTOS),
        }}
      ></Box>
      <p>*****</p>
      <Box
        bg="tomato"
        w="100%"
        p={4}
        color="white"
        dangerouslySetInnerHTML={{
          __html: muestraLimite("Límite semis", fechas.LIMITE_SEMIS),
        }}
      ></Box>
      <Box
        bg="tomato"
        w="100%"
        p={4}
        color="white"
        dangerouslySetInnerHTML={{
          __html: muestraLimite("Inicio semis", fechas.INICIO_SEMIS),
        }}
      ></Box>
      <Box
        bg="tomato"
        w="100%"
        p={4}
        color="white"
        dangerouslySetInnerHTML={{
          __html: muestraLimite("Fin semis", fechas.FIN_SEMIS),
        }}
      ></Box>
      <p>*****</p>
      <Box
        bg="tomato"
        w="100%"
        p={4}
        color="white"
        dangerouslySetInnerHTML={{
          __html: muestraLimite("Límite finales", fechas.LIMITE_FINALES),
        }}
      ></Box>
      <Box
        bg="tomato"
        w="100%"
        p={4}
        color="white"
        dangerouslySetInnerHTML={{
          __html: muestraLimite("Inicio finales", fechas.INICIO_FINALES),
        }}
      ></Box>
      <Box
        bg="tomato"
        w="100%"
        p={4}
        color="white"
        dangerouslySetInnerHTML={{
          __html: muestraLimite("Fin finales", fechas.FIN_FINALES),
        }}
      ></Box>
      <p>*****</p>
    </Plantilla>
  );
}
