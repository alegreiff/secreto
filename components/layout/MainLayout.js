import { ReactNode } from "react";
import NextLink from "next/link";

import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  Container,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import UserMenu from "./UserMenu";
import { useUser } from "@supabase/auth-helpers-react";

const Links = ["Dashboard", "Projects", "Team"];

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);

export default function Plantilla({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user, error } = useUser();

  return (
    <Container maxW="container.xl">
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>Logo</Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {/* {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))} */}
              <NextLink href="/" passHref>
                <Link>Home</Link>
              </NextLink>
              <NextLink href="/polla" passHref>
                <Link>Polla</Link>
              </NextLink>
              <NextLink href="/partidos" passHref>
                <Link>partidos</Link>
              </NextLink>
              <NextLink href="/perfil/test" passHref>
                <Link>test profile</Link>
              </NextLink>
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            {user ? <UserMenu user={user} /> : ""}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      <Box p={4}>
        <h4> {user?.email} </h4>
        {children}
      </Box>
    </Container>
  );
}
