export default function useFase(fechas) {
  if (fechas.HOY < fechas.INICIO_GRUPOS)
    return new Array("CARGA GRUPOS", 1, true);

  if (fechas.HOY > fechas.INICIO_GRUPOS && fechas.HOY < fechas.INICIO_OCTAVOS) {
    if (fechas.HOY < fechas.FIN_GRUPOS)
      return new Array("JUGANDO GRUPOS", 0, false);
    return new Array("CARGA OCTAVOS", 2, true);
  }

  if (
    fechas.HOY > fechas.INICIO_OCTAVOS &&
    fechas.HOY < fechas.INICIO_CUARTOS
  ) {
    if (fechas.HOY < fechas.FIN_OCTAVOS)
      return new Array("JUGANDO OCTAVOS", 0, false);
    return new Array("CARGA CUARTOS", 3, true);
  }

  if (fechas.HOY > fechas.INICIO_CUARTOS && fechas.HOY < fechas.INICIO_SEMIS) {
    if (fechas.HOY < fechas.FIN_CUARTOS)
      return new Array("JUGANDO CUARTOS", 0, false);
    return new Array("CARGA SEMIS", 4, true);
  }

  if (fechas.HOY > fechas.INICIO_SEMIS && fechas.HOY < fechas.INICIO_FINALES) {
    if (fechas.HOY < fechas.FIN_SEMIS)
      return new Array("JUGANDO SEMIS", 0, false);
    return new Array("CARGA FINALES", 5, true);
  }

  if (fechas.HOY > fechas.INICIO_FINALES)
    return new Array("POLLA FINALIZADA", 0, false);
}

/* 
CASOS

menor INICIO GRUPOS

mayor INICIO GRUPOS y menor que INICIO OCTAVOS

mayor INICIO OCTAVOS y menor que INICIO CUARTOS

mayor que INICIO CUARTOS y menor que INICIO SEMIS

mayor que INICIO SEMIS y menor que INICIO FINALES

mayor que INICIOM FINALES



*/
