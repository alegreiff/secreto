import create from "zustand";
import { persist } from "zustand/middleware";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const useDatosPolla = create(
  persist(
    (set, get) => ({
      partidos: [],
      setPartidos: (params) => {
        set((state) => ({
          partidos: params,
        }));
      },
      registro: true,
      /* EN LA CONFIGURACIÓN VAN LAS FECHAS CON HORA COLOMBIA + CINCO */
      fechas: {
        //HOY: new Date("2022-11-21 19:00"),
        HOY: "2022-11-20T23:00:00Z",

        INICIO_GRUPOS: "2022-11-21T16:00:00Z",
        FIN_GRUPOS: "2022-12-02T22:00:00Z",
        INICIO_OCTAVOS: "2022-12-03T15:00:00Z",
        FIN_OCTAVOS: "2022-12-06T22:00:00Z",
        INICIO_CUARTOS: "2022-12-09T19:00:00Z",
        FIN_CUARTOS: "2022-12-10T18:00:00Z",
        INICIO_SEMIS: "2022-12-13T19:00:00Z",
        FIN_SEMIS: "2022-12-14T22:00:00Z",
        INICIO_FINALES: "2022-12-14T15:00:00Z",
        FIN_FINALES: "2022-12-18T18:00:00Z",
        LIMITE_GRUPOS: "2022-11-21T14:00:00Z",
        LIMITE_OCTAVOS: "2022-12-03T13:00:00Z",
        LIMITE_CUARTOS: "2022-12-09T17:00:00Z",
        LIMITE_SEMIS: "2022-12-13T17:00:00Z",
        LIMITE_FINALES: "2022-12-14T13:00:00Z",
      },

      total: 0,
      totalqty: 0,
      cartContent: [],
      addTocart: (params) => {
        set((state) => ({
          totalqty: state.totalqty + 1,
          total: state.total + parseFloat(params.price),
          cartContent: [...state.cartContent, params],
        }));
      },
      updatecart: ({ params, mycart }) => {
        set((state) => ({
          totalqty: state.totalqty + 1,
          total: state.total + parseFloat(params.price),
          cartContent: mycart,
        }));
      },
      clearCart: () => set({ totalqty: 0, total: 0, cartContent: [] }),
      removeFromCart: (params) =>
        set((state) => ({
          total: state.total - params.price * params.quantity,
          totalqty: state.totalqty - params.quantity,
          cartContent: state.cartContent.filter(
            (item) => item.id !== params.id
          ),
        })),
    }),
    { name: "datospolla" }
  )
);
export default useDatosPolla;
