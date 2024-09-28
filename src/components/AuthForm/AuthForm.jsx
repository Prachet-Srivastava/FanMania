// import { Box,Image,VStack,Text,Flex } from "@chakra-ui/react";
// import { useState } from "react";

// import Signup from "./Signup";
// import Login from "./Login";
// import GoogleAuth from "./GoogleAuth";
// const AuthForm = () => {
//     const [isLogin, setIsLogin] = useState(true);
  
//     return (
//     <>
//     <Box border={"1px solid gray"} borderRadius={1} padding={1}>
//        <VStack spacing={4}>
//         <Image src ='/FanMania.png' h={'20'} w={'50'} cursor={"pointer"} alt='FanMania logo'/>
        

   
// {isLogin ? <Login/> : <Signup/>}

//         <Flex alignItems={"center"} justifyContent={"center"} my={4} gap={1} w={"full"}>
//             <Box flex={2} h={"1px"} bg={"gray.400"}/>
//             <Text mx={1} color={"white"}>OR</Text>
//             <Box flex={2} h={"1px"} bg={"gray.400"}/>
//         </Flex>

//        <GoogleAuth prefix={isLogin ? "Login":"Sign up"}/>

//        </VStack>
//     </Box>
    
// <Box border={"1px solid gray"} borderRadius={4} padding={1}>
// <Flex alignItems={"center"} justifyContent={"center"}>
//     <Box mx={2} fontSize={14}>
//         {isLogin ? "Don't have an account" : "Already have an account?"}
//     </Box>
//     <Box onClick={()=> setIsLogin(!isLogin)} color={"blue.500"} cursor={"pointer"}>
//         {isLogin ? "Sign Up" : "Log in"}
//     </Box>
// </Flex>
// </Box>
// </>
//   );
// };

// export default AuthForm

import { Box,Image,VStack,Text,Flex } from "@chakra-ui/react";
import { useState } from "react";

import Signup from "./Signup";
import Login from "./Login";
import GoogleAuth from "./GoogleAuth";
const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
  
    return (
    <>
    <Box border={"1px solid gray"} color={"black"} borderRadius={25} padding={6}>
       <VStack spacing={4}>
        <Image src ='/FanMania.png' h={'20'} w={'50'} cursor={"pointer"} alt='FanMania logo'/>
        

   
{isLogin ? <Login/> : <Signup/>}

        <Flex alignItems={"center"} justifyContent={"center"} my={4} gap={1} w={"full"}>
            <Box flex={2} h={"1px"} bg={"gray.400"}/>
            <Text mx={1} color={"black"}>OR</Text>
            <Box flex={2} h={"1px"} bg={"gray.400"}/>
        </Flex>

       <GoogleAuth prefix={isLogin ? "Login":"Sign up"}/>

       </VStack>
    </Box>
    
<Box border={"1px solid gray"} borderRadius={10} padding={1}>
<Flex alignItems={"center"} justifyContent={"center"}>
    <Box mx={2} fontSize={14}>
        {isLogin ? "Don't have an account" : "Already have an account?"}
    </Box>
    <Box onClick={()=> setIsLogin(!isLogin)} color={"blue.500"} cursor={"pointer"}>
        {isLogin ? "Sign Up" : "Log in"}
    </Box>
</Flex>
</Box>
</>
  );
};

export default AuthForm