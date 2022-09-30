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
import { Field, useFormik } from "formik";

import * as Yup from "yup";
import { useEffect, useState } from "react";
import {
  supabaseClient,
  supabaseServerClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import Plantilla from "../../components/layout/MainLayout";
import { UploadAvatar } from "../../components/AvatarCustom";

export default function Jefe({ equipos, favoritos }) {
  const [profile, setProfile] = useState(null);
  const [imagen, setImagen] = useState("");
  const { user, error } = useUser();

  useEffect(() => {
    async function getImage(userid) {
      const { data, error } = await supabaseClient.storage
        .from("polleres")
        .getPublicUrl("wefre/006.png");
      /* .list("wefre", {
          limit: 10,
          offset: 0,
          sortBy: { column: "name", order: "asc" },
        }); */

      //.getPublicUrl(`${userid}/perfil.jpg`);

      console.log(data, error);
      //

      /* if (publicURL) {
        setImagen(publicURL);
        console.log(publicURL, error);
        console.log("La imagen es", imagen);
      } */
    }
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
    if (user) {
      loadPerfil();
      getImage(user?.id);
    }
  }, [user]);

  const formik = useFormik({
    initialValues: {
      hinchade: profile?.hincha ? profile.hincha : "",
      polleroalias: profile?.alias ? profile.alias : "",
      userId: user?.id,
      favorito: profile?.favorito ? profile?.favorito : "",
      pollerofoto: "",
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
      console.log(values.pollerofoto);
      const tipo = values.pollerofoto.type.split("/").pop();
      console.log("EXT", tipo);

      //console.log(JSON.stringify(values, null, 2));
      //console.log("OP", profile);
      /* const { data: dataElim, error: errorElim } = await supabaseClient.storage
        .from("polleros")
        .remove([`public/${user?.id}.jpg`]); */

      //console.log("IMAGOS", values.pollerofoto);
      //const { data, error } = await supabaseClient.storage.from("polleres");
      //.listBuckets();
      //.getBucket(`oppa`);

      //.remove([`${user?.id}/perfil.png`]);
      //.getBucket(`pollerows`);
      //.move(`${user?.id}/perfil.jpg`, `${user?.id}/perfilXAS.jpg`);
      /* .update(`${user?.id}/perfil.png`, values.pollerofoto, {
          cacheControl: "3600",
          upsert: false,
        }); */
      //console.log("SUBIDA", data);
      //console.log("INSUBIDA", error);

      /* const { data, error } = await supabaseClient
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
      } */
    },
  });

  /* 


  "polleros/public/po055e5fa9-ffb7-46ed-842e-7c04b4192d5c.jpg"
https://dsbiqexajjcyswddmxve.supabase.co/storage/v1/object/public/oppa/055e5fa9-ffb7-46ed-842e-7c04b4192d5c/perfil.jpg?t=2022-09-30T01%3A28%3A04.935Z

  
  UT https://dsbiqexajjcyswddmxve.supabase.co/storage/v1/object/polleros/public/po055e5fa9-ffb7-46ed-842e-7c04b4192d5c.jpg 400
     https://dsbiqexajjcyswddmxve.supabase.co/storage/v1/object/public/polleros/public/055e5fa9-ffb7-46ed-842e-7c04b4192d5c.jpg
  
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
      <VStack>
        <UploadAvatar />
      </VStack>
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
        <FormControl>
          <Input
            type="file"
            name="pollerofoto"
            onChange={(event) => {
              const files = event.target.files;
              let myFiles = Array.from(files);
              formik.setFieldValue("pollerofoto", myFiles[0]);
            }}
          />
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
