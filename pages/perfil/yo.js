import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";

import * as Yup from "yup";
import { useEffect, useState } from "react";
import {
  supabaseClient,
  supabaseServerClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import Plantilla from "../../components/layout/MainLayout";

export default function Jefe({ equipos, favoritos }) {
  const [profile, setProfile] = useState(null);
  const { user, error } = useUser();
  console.log("FAVS", favoritos);

  useEffect(() => {
    async function loadPerfil() {
      const { data: profile, error } = await supabaseClient
        .from("usuarios")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profile) {
        setProfile(profile);
      }
    }
    // Only run query once user is logged in.
    if (user) loadPerfil();
  }, [user]);

  /* useEffect(() => {
    carga();
  }, []);

  const carga = async () => {
    const { data: profile, error } = await supabaseClient
      .from("usuarios")
      .select("*")
      .eq("id", user?.id);
    //.single();
    console.log("DF", profile);
  }; */

  const formik = useFormik({
    initialValues: {
      hinchade: profile?.hincha ? profile.hincha : "",
      polleroalias: profile?.alias ? profile.alias : "",
      userId: user?.id,
      favorito: profile?.favorito ? profile?.favorito : "",
      //userId: "jkio8",
    },
    enableReinitialize: true,

    validationSchema: Yup.object({
      polleroalias: Yup.string()
        .required("Nombre de pollero requerido")
        .min(6, "Mínimo seis caracteres")
        .max(20, "Máximo 20 caracteres"),
      hinchade: Yup.string().required("Seleccione una opción"),
      favorito: Yup.string().required("Seleccione su equipo más querido"),
    }),
    onSubmit: async (values, actions) => {
      //console.log(JSON.stringify(values, null, 2));
      console.log("OP", profile);

      const { data, error } = await supabaseClient
        .from("usuarios")
        .update({
          hincha: values.hinchade,
          alias: values.polleroalias,
          favorito: values.favorito,
        })
        .eq("id", user?.id)
        .single();
      if (data) {
        setProfile(data);
        //actions.resetForm();
      }
      if (error) {
        console.log(error);
      }
    },
  });

  /* 
  
const { data, error } = await supabase
  .from('usuarios')
  .update({ other_column: 'otherValue' })
  .eq('some_column', 'someValue')

  */

  const updateProfile = async (values) => {
    return data;
  };

  return (
    <Plantilla>
      <VStack
        as="form"
        justifyContent="center"
        mx="auto"
        h="100vh"
        w={{ base: "90%", md: 500 }}
        onSubmit={formik.handleSubmit}
      >
        <Heading>Perfil {profile?.hincha} </Heading>
        <FormControl
          isInvalid={formik.errors.hinchade && formik.touched.hinchade}
        >
          <FormLabel>Hincha de</FormLabel>
          <Select
            placeholder="¿De quién es hincha en Colombia?"
            name="hinchade"
            value={formik.values.hinchade}
            {...formik.getFieldProps("hinchade")}
          >
            {equipos &&
              equipos.map((eq, i) => (
                <option key={i} value={eq.nombre}>
                  {eq.nombre}
                </option>
              ))}
          </Select>
          <FormErrorMessage>{formik.errors.hinchade}</FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={formik.errors.favorito && formik.touched.favorito}
        >
          <FormLabel>Mi favorito es...</FormLabel>
          <Select
            placeholder="El campeón será"
            name="favorito"
            value={formik.values.favorito}
            {...formik.getFieldProps("favorito")}
          >
            {favoritos &&
              favoritos.map((eq) => (
                <option key={eq.id} value={eq.id}>
                  {eq.nombre}
                </option>
              ))}
          </Select>
          <FormErrorMessage>{formik.errors.hinchade}</FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={formik.errors.polleroalias && formik.touched.polleroalias}
        >
          <Input
            name="polleroalias"
            placeholder="Su nombre único e irrepetible como pollero"
            value={formik.values.polleroalias}
            {...formik.getFieldProps("polleroalias")}
            disabled={profile?.alias ? true : false}
          ></Input>

          <FormErrorMessage>{formik.errors.polleroalias}</FormErrorMessage>
        </FormControl>
        <FormControl>
          <Input
            name="userId"
            value={formik.values.userId}
            {...formik.getFieldProps("userId")}
            disabled
          ></Input>
        </FormControl>
        <Button type="submit" variant="outline" colorScheme="teal">
          Guardar perfil
        </Button>
      </VStack>
    </Plantilla>
  );
}

export const getServerSideProps = withPageAuth({
  redirectTo: "/",
  async getServerSideProps(ctx) {
    // Run queries with RLS on the server
    const { data: equipos } = await supabaseServerClient(ctx)
      .from("listahinchas")
      .select(
        `
        nombre:unnest
        `
      );
    const { data: favoritos } = await supabaseServerClient(ctx)
      .from("equipos")
      .select("id, nombre");

    return { props: { equipos, favoritos } };
  },
});

/* export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (!user) {
    return { props: {}, redirect: { destination: "/" } };
  }
  const { data: profile, error } = await supabase
    .from("usuarios")
    .select("id")
    .eq("id", user.id)
    .single();
  console.log("perfil", user.id, profile);
  const perfil = profile;

  if (error) {
    console.log("ERROR", error);
  }

  return { props: { user, perfil } };
} */

/* 
[{"id":"5a47d784-6ea8-4864-9ecf-22b2f07a0e83","created_at":"2022-09-22T01:30:23+00:00","username":"Ja Y me","correo":"a.legreiff@gmail.com","isPollero":true,"favorito":2,"hincha":"Independiente Santa Fe","isPagado":false,"alias":"Jardinero"}]
5a47d784-6ea8-4864-9ecf-22b2f07a0e83
5a47d784-6ea8-4864-9ecf-22b2f07a0e83


*/
