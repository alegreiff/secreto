import { Auth } from "@supabase/ui";
import { useUser } from "@supabase/auth-helpers-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import Plantilla from "../components/layout/MainLayout";
import useDatosPolla from "../store/datospolla";
import { useRouter } from "next/router";

const LoginPage = () => {
  const { usuario, clearUsuario } = useDatosPolla((state) => state);
  const { user, error } = useUser();
  const [data, setData] = useState();
  const router = useRouter();

  useEffect(() => {
    async function loadData() {
      const { data } = await supabaseClient.from("equipos").select("*");
      setData(data);
    }
    // Only run query once user is logged in.
    if (user) loadData();
  }, [user]);

  const handleLogout = () => {
    supabaseClient.auth.signOut();
    clearUsuario();
    router.push("/api/auth/logout");
    //console.log("Saliendo babi");
  };

  if (!user)
    return (
      <>
        <Plantilla>
          {error && <p>{error.message}</p>}
          <Auth
            supabaseClient={supabaseClient}
            providers={["google", "github"]}
            socialLayout="horizontal"
            socialButtonSize="xlarge"
          />
        </Plantilla>
      </>
    );

  return (
    <>
      <Plantilla>
        <button onClick={handleLogout}>Sign out</button>
        <p>user:</p>
        <pre>{JSON.stringify(user, null, 2)}</pre>
        <p>client-side data fetching with RLS</p>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Plantilla>
    </>
  );
};
export default LoginPage;
