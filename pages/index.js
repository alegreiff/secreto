import {
  getUser,
  supabaseServerClient,
  supabaseClient,
} from "@supabase/auth-helpers-nextjs";

//import { useUser } from "@supabase/auth-helpers-react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import Plantilla from "../components/layout/MainLayout";
import useDatosPolla from "../store/datospolla";
import styles from "../styles/Home.module.css";

export default function Home({ user, db_partidos }) {
  const partidos = useDatosPolla((state) => state.partidos);
  const setPartidos = useDatosPolla((state) => state.setPartidos);

  useEffect(() => {
    async function cargaPartidos() {
      console.log("Cargando matche's");
      const { data: db_partidos } = await supabaseClient
        .from("partidospower")
        .select("*");
      //.lt("ronda", 4)
      //.eq("ronda", 5)
      //.order("id");

      /* const partidos = db_partidos.map((elem) => ({
        ...elem,
        power: Math.round(elem.LOC.rank + elem.VIS.rank),
      })); */
      setPartidos(db_partidos);
    }

    if (partidos.length === 0) {
      cargaPartidos();
    }
  }, []);

  console.log("PRT", partidos[7]);
  //const { user, error } = useUser();

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Plantilla>
        <main className={styles.main}>
          <h1 className={styles.title}>
            RRSS Hagámoslo juntos <a href="https://nextjs.org">Next.js!</a>
          </h1>
          <Link href="/login">Login</Link>-<Link href="/profile">Perfil</Link>
          <p className={styles.description}>
            Get started by editing{" "}
            <code className={styles.code}>pages/index.js</code>
          </p>
          {user && user?.email}
        </main>
      </Plantilla>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const { user } = await getUser(ctx);

  return { props: { user } };
}
/* 
https://dsbiqexajjcyswddmxve.supabase.co/auth/v1/verify?token=c5207f5c6b789182d62c1b6eb5e1dfb837f24fb6c3dfc09586b7550e&type=recovery&redirect_to=http://localhost:3000/
*/
