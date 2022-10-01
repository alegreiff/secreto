import NextLink from "next/link";
import {
  Avatar,
  Button,
  HStack,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import useDatosPolla from "../../store/datospolla";

const UserMenu = ({ user }) => {
  const { fotoperfil } = useDatosPolla((state) => state);
  const imagenPerfil = "";
  if (fotoperfil) {
    imagenPerfil = `https://dsbiqexajjcyswddmxve.supabase.co/storage/v1/object/public/polleres/${user?.id}/perfil.png`;
  }
  return (
    <HStack>
      {/* <Button onClick={handleLogout}> Salir </Button> */}
      <NextLink href="/jefe" passHref>
        <Link>Jefe</Link>
      </NextLink>
      <Menu>
        <MenuButton
          as={Button}
          rounded={"full"}
          variant={"link"}
          cursor={"pointer"}
          minW={0}
        >
          <Avatar size={"md"} src={imagenPerfil} />
        </MenuButton>
        <MenuList>
          <span> {user?.email} lokoo</span>
          <MenuItem>
            {/* <Button onClick={handleLogout}> Salir </Button> */}
          </MenuItem>
          <MenuItem>
            <NextLink href="/perfil/yo" passHref>
              <Link>Perfil</Link>
            </NextLink>
            <NextLink href="/perfil/test" passHref>
              <Link>Test</Link>
            </NextLink>
          </MenuItem>
          <MenuDivider />
          <MenuItem>Link 3</MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
};

export default UserMenu;

/* 

*/
