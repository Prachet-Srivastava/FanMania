import { Button, Container, Flex, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaFilm } from 'react-icons/fa';
import { BsCameraReels } from "react-icons/bs";

const Navbar = () => {
	return (
		<Container maxW="container.lg" my={4}>
			<Flex w="full" justifyContent={{ base: "center", sm: "space-between" }} alignItems="center">
				{/* <Image src="/FanMania.png" h={20} display={{ base: "none", sm: "block" }} cursor="pointer" /> */}
				<Flex gap={4}>
				{/* <Link to="/movies">
        <BsCameraReels /> Click to search a title
      </Link> */}
					
	
				</Flex>
			</Flex>
		</Container>
	);
};

export default Navbar;



