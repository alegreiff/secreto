import { useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";
import Auth from "../components/auth/Auth";

const LoginPage = () => {
  const { user: usuario, error } = useUser();
  const [data, setData] = useState();
  const [user, setUser] = useState(usuario);

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
    //router.push("/api/auth/logout");
    //console.log("Saliendo babi");
  };

  if (!user)
    return (
      <>
        {error && <p>{error.message}</p>}
        <Auth setUser={setUser} />
      </>
    );

  return (
    <>
      <button onClick={handleLogout}>Sign out</button>
      {/* <Link href="/api/auth/logout">Salid</Link> */}
      <p>user:</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <p>client-side data fetching with RLS</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
};

export default LoginPage;
