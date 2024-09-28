
// import { Button, Center, Container, Flex, Image } from "@chakra-ui/react";
// import { Link } from "react-router-dom";
// import { FaFilm } from 'react-icons/fa';
// import { BsCameraReels } from "react-icons/bs";
// import { NotificationsLogo } from "../../assets/contants";

// const Navbar = () => {
// 	return (
// 		<Container maxW="container.lg" my={4}>
// 				<Link to="/movies">
//         <NotificationsLogo /> Interest
//       </Link>      
// 		</Container>
// 	);	
  
// };
// export default Navbar;


// import { Link } from "react-router-dom";

//  import { Button, Center, Container, Flex, Image } from "@chakra-ui/react";
//  import { NotificationsLogo } from "../../assets/contants";


// const Navbar = () => {
//     return (
//         <Container maxW="container.lg" my={4}>
//             <Link to="/movies"
//             _hover={{ bg: "whiteAlpha.400" }}
//             borderRadius={6}
// 				p={2}
// 				w={{ base: 10, md: "full" }}
// 			//	justifyContent={{ base: "center", md: "flex-start" }}
//             >

//                 <Flex align="center">
//                     <NotificationsLogo />
//                     <span style={{ marginLeft: '8px' }}>Interest</span>
//                 </Flex>
//             </Link>
//         </Container>
//     );
// };

// export default Navbar;
import { Link } from "react-router-dom";
import { Container, Flex } from "@chakra-ui/react";
import { NotificationsLogo } from "../../assets/contants";

const Navbar = () => {
    return (
        <Container maxW="container.lg" my={4} >
          
            <Link
                to="/movies"
                style={{ textDecoration: 'none' }} // Ensures no underline on hover
                _hover={{
                    bg: "whiteAlpha.400", // Sets the background color to whiteAlpha.400 on hover
                    borderRadius: 6, // Rounds the corners of the button
                    padding: '8px', // Adds padding to the link
                }}
            >
                <Flex align="center">
                    <NotificationsLogo />
                    <span style={{ marginLeft: '8px' }}>Interest</span>
                </Flex>
            </Link>
            
        </Container>
    );
};

export default Navbar;
// import { Box, Flex, Tooltip } from "@chakra-ui/react";
// import { NotificationsLogo } from "../../assets/contants";

// const Notifications = () => {
// 	return (
// 		<Tooltip
// 			hasArrow
// 			label={"Notifications"}
// 			placement='right'
// 			ml={1}
// 			openDelay={500}
// 			display={{ base: "block", md: "none" }}
// 		>

// 			<Link to="/movies">
//       <Flex
// 				alignItems={"center"}
// 				gap={4}
// 				_hover={{ bg: "whiteAlpha.400" }}
// 				borderRadius={6}
// 				p={2}
// 				w={{ base: 10, md: "full" }}
// 				justifyContent={{ base: "center", md: "flex-start" }}
// 			>
// 				<NotificationsLogo />
// 				<Box display={{ base: "none", md: "block" }}>Notifications</Box>
// 			</Flex>
//       </Link>
// 		</Tooltip>
// 	);
// };

// export default Navbar;