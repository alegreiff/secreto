import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import supabase from "../../utils/useSupabase";

import Swal from "sweetalert2";
import { useRouter } from "next/router";

const Auth = ({ setUser }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();

  const checkEmail = async (email) => {
    let { data: usuario, error } = await supabase
      .from("usuarios")
      .select("id")
      .eq("correo", email);
    return usuario?.length;
  };

  const signInWithGitHub = async () => {
    /* supabase.auth.signIn({
      provider: "github",
    }); */

    const rutaRedireccion = window.location.origin + "/polla/";
    const { user, session, error } = await supabase.auth.signIn(
      {
        provider: "github",
      },
      {
        redirectTo: rutaRedireccion,
      }
    );
  };

  const changeForm = () => {
    setIsSignUp((value) => !value);
  };

  const handleSignIn = async () => {
    try {
      const { user, session, error } = await supabase.auth.signIn({
        email,
        password,
      });
      if (error) throw error;
      if (user) {
        //setUser(user);
        router.push("/");
      }
      Swal.fire({
        title: "Bienvenido",
        confirmButtonText: "Sisas",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
      });
    }
  };

  const handleSignUp = async () => {
    const check = await checkEmail(email);
    if (!check) {
      try {
        const { user, session, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;
        console.log("USER", user, "Session", session, "ERROR", error);
        if (user) {
          console.info(user.identities);
        }
        Swal.fire({
          title: "Vamos bien",
          text: `Se ha enviado un correo de verificación a ${email}. Revisa incluso en SPAM`,
          confirmButtonText: "Sisas",
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: error.message,
        });
      }
    } else {
      Swal.fire({
        title: "Resultado",
        text: `El correo ${email} ya está registrado`,
        icon: "error",
        showCancelButton: true,
        confirmButtonText: "Me equivoqué",
        cancelButtonText: "Ah. Entonces ingresaré",
      }).then((result) => {
        if (result.isDismissed) {
          changeForm();
        }
      });
    }
  };

  return (
    <Flex
      minH={"100vh"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>
            {isSignUp ? "Crea tu cuenta" : "Ingresa"}
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4} as="form">
            <Button onClick={signInWithGitHub}>Log in with GitHub</Button>
            <FormControl id="email">
              <FormLabel>Correo electrónico</FormLabel>
              <Input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="correo"
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Contraseña</FormLabel>
              <Input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo seis caracteres"
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              ></Stack>
              {isSignUp && (
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={handleSignUp}
                >
                  Crear cuenta
                </Button>
              )}
              {!isSignUp && (
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={handleSignIn}
                >
                  Ingresar
                </Button>
              )}
              <Button colorScheme="red" onClick={changeForm}>
                {!isSignUp
                  ? "¿Nuevo usuario?, regístrese"
                  : "Ya tengo cuenta. Ingresar"}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Auth;
