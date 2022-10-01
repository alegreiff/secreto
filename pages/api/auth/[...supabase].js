import { handleAuth } from "@supabase/auth-helpers-nextjs";
console.log("pasa por lo que es el api");
export default handleAuth({ logout: { returnTo: "/" } });
