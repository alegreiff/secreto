import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import Plantilla from "../../components/layout/MainLayout";

export default function Profile({ user }) {
  return (
    <Plantilla>
      <div>Hello {user.name}</div>
    </Plantilla>
  );
}

export const getServerSideProps = withPageAuth({ redirectTo: "/mamola" });
