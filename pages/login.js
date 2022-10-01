//import { useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";
import Auth from "../components/auth/Auth";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";

const LoginPage = () => {
  const { data: userdata, error: usererror } = useSWR(
    "/api/auth/user",
    fetcher
  );

  console.log("SWR", userdata);
  console.log("SWR", usererror);

  //const { user: usuario, error } = useUser();
  const [data, setData] = useState();
  const [user, setUser] = useState(null);
  console.log("DESDE LOGIN USER", user);

  useEffect(() => {
    setUser(userdata);
  }, [userdata]);

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
    router.push("/api/auth/logout");
    //console.log("Saliendo babi");
  };

  if (!user?.user)
    return (
      <>
        {usererror && <p>{usererror.message}</p>}
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
