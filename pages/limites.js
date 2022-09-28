import { Box } from "@chakra-ui/react";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import Plantilla from "../components/layout/MainLayout";
import useDatosPolla from "../store/datospolla";

export default function LimitesPage({ servertime }) {
  const { fechas } = useDatosPolla((state) => state);
  const lafecha = new Date();
  const lafechaformat = format(new Date(), "cccc MMM dd H':'mm a", {
    locale: es,
  });
  //console.log(parseISO("2014-02-11T11:30:30"));
  //console.log(parseISO("2022-11-21T16:00"));
  const tardemiercoles = "2022-09-28 23:44:00+00";
  const fechacompara = new Date(tardemiercoles);

  if (fechacompara.getTime() > lafecha.getTime()) {
    console.log("ES MAYOR LA ARBITRARIA QUE LA ACTUAL");
  } else {
    console.log(
      "ES MENOR",
      lafecha.getTime() - fechacompara.getTime(),
      fechacompara.getTime() - lafecha.getTime()
    );
  }

  //console.log(fechas.HOY);
  const muestraLimite = (nombre = "FASE", fecha) => {
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
      <Box bg="yellow" w="100%" p={4} color="red">
        <h2>HOY</h2>
        {JSON.stringify(servertime)}
      </Box>
      <Box bg="blue" w="100%" p={4} color="white">
        <h2>HOY</h2>
        {JSON.stringify(lafecha)}
      </Box>
      <Box bg="crimson" w="100%" p={4} color="white">
        <h2>COMPARA</h2>
        {JSON.stringify(fechacompara)}
      </Box>
      <Box bg="green" w="100%" p={4} color="white">
        {fechacompara.getTime() > lafecha.getTime()
          ? "ES MAYOR"
          : "HOY ES MENOR"}
      </Box>

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

export async function getServerSideProps(context) {
  const servertime = new Date();
  return {
    props: { servertime }, // will be passed to the page component as props
  };
}
