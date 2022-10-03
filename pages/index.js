import { Box, Button } from "@chakra-ui/react";
import {
  getUser,
  supabaseServerClient,
  supabaseClient,
} from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

//import { useUser } from "@supabase/auth-helpers-react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import useSWR from "swr";
import Plantilla from "../components/layout/MainLayout";
import useFase from "../hooks/useFase";
import useDatosVivos from "../store/datosFlash";
import useDatosPolla from "../store/datospolla";
import styles from "../styles/Home.module.css";
import { fetcher } from "../utils/fetcher";

export default function Home({ user, db_partidos }) {
  const partidos = useDatosPolla((state) => state.partidos);
  const setPartidos = useDatosPolla((state) => state.setPartidos);

  const { fechas, fase, setFase } = useDatosVivos((state) => state);
  const { usuario, setUsuario } = useDatosPolla((state) => state);
  console.log("ZUSTAND_USER", usuario);
  const tempo = useFase(fechas);
  /* const HOYDIA = format(new Date(fechas.HOY), "cccc MMM dd H':'mm a", {
    locale: es,
  }); */
  const HOYDIA = fechas.HOY;

  const { data: userdata, error: usererror } = useSWR(
    "/api/auth/user",
    fetcher
  );

  const { user: userx, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading) {
      if (userx) {
        setUsuario(userx);
      }
    }
  }, [isLoading, userx, setUsuario]);

  useEffect(() => {
    async function cargaPartidos() {
      //console.log("Cargando matche's");
      const { data: db_partidos } = await supabaseClient
        .from("partidospower")
        .select("*");

      setPartidos(db_partidos);
    }

    if (partidos.length === 0) {
      cargaPartidos();
    }
  }, []);

  const clearLocalStorage = () => {
    localStorage.clear();
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Plantilla>
        {/* {JSON.stringify(user)} */}
        <Button onClick={clearLocalStorage}> Limpia storage </Button>
        <Box bg="teal.400" p={10}>
          No es mi polla, no es tu polla, es Nuestra Polla
        </Box>
        <h1 className={styles.title}>
          ETAPA
          <a href="#">
            {tempo[0]} - {tempo[1]} - {tempo[2] ? "ABIERTO" : "CERRADO"}
          </a>
        </h1>
        <Link href="/login">Login</Link>-<Link href="/profile">Perfil</Link>
        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.js</code>
        </p>
        {userdata && userdata?.user?.email}
      </Plantilla>
    </>
  );
}

/* export async function getServerSideProps(ctx) {
  const { user } = await getUser(ctx);
  console.log("USER", user);

  return { props: { user } };
} */
