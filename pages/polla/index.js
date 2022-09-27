import { getUser } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";
import Plantilla from "../../components/layout/MainLayout";
import supabase from "../../utils/useSupabase";

export default function PageIndexPolla({ user }) {
  if (!user?.email) {
    window.location.reload();
  }
  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event == "PASSWORD_RECOVERY") {
        const newPassword = prompt(
          "What would you like your new password to be?"
        );
        const { data, error } = await supabase.auth.update({
          password: newPassword,
        });

        if (data) alert("Password updated successfully!");
        if (error) alert("There was an error updating your password.");
      }
    });
  }, []);
  return (
    <Plantilla>
      <h4>Solo los justos podrán entenderlo</h4>
    </Plantilla>
  );
}

export async function getServerSideProps(ctx) {
  const { user } = await getUser(ctx);

  return { props: { user } };
}
