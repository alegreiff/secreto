import create from "zustand";
import { persist } from "zustand/middleware";

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

        INICIO_GRUPOS: "2022-11-21 16:00:00+00",
        FIN_GRUPOS: "2022-12-02 22:00:00+00",
        INICIO_OCTAVOS: "2022-12-03 15:00:00+00",
        FIN_OCTAVOS: "2022-12-06 22:00:00+00",
        INICIO_CUARTOS: "2022-12-09 19:00:00+00",
        FIN_CUARTOS: "2022-12-10 18:00:00+00",
        INICIO_SEMIS: "2022-12-13 19:00:00+00",
        FIN_SEMIS: "2022-12-14 22:00:00+00",
        INICIO_FINALES: "2022-12-14 15:00:00+00",
        FIN_FINALES: "2022-12-18 18:00:00+00",
        LIMITE_GRUPOS: "2022-11-21 14:00:00+00",
        LIMITE_OCTAVOS: "2022-12-03 13:00:00+00",
        LIMITE_CUARTOS: "2022-12-09 17:00:00+00",
        LIMITE_SEMIS: "2022-12-13 17:00:00+00",
        LIMITE_FINALES: "2022-12-14 13:00:00+00",
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
