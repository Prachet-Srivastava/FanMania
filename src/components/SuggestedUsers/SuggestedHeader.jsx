import { Avatar, Text, Flex, Button, Link as RouterLink } from "@chakra-ui/react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import useLogout from "../../hooks/useLogout";
import useAuthStore from "../../store/authStore";

const SuggestedHeader = () => {
  const { handleLogout, isLoggingOut } = useLogout();
  const authUser = useAuthStore((state) => state.user);

  if (!authUser) {
    return null;
  }

  return (
    <Flex justifyContent="space-between" alignItems="center" w="full">
      <Flex alignItems="center" gap={2}>
        <Link to={authUser.username} as={RouterLink}>
          <Avatar size="lg" src={authUser.profilePicURL} />
        </Link>
        <Link to={authUser.username} as={RouterLink}>
          <Text fontSize={12} fontWeight="bold">
            {authUser.username}
          </Text>
        </Link>
      </Flex>
      <Button
        size="xs"
        backgroundColor="transparent"
        _hover={{ background: "transparent" }}
        fontSize={14}
        fontWeight="medium"
        color="blue.400"
        onClick={handleLogout}
        isLoading={isLoggingOut}
        cursor="pointer"
      >
        Log out
      </Button>
    </Flex>
  );
};

export default SuggestedHeader;
