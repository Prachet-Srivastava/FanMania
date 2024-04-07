import { Flex, VStack, Text, Box } from "@chakra-ui/react"
import SuggestedHeader from "./SuggestedHeader"
import SuggestedUser from "./SuggestedUser"

const SuggestedUsers = () => {
  return (
 <VStack py={8} px={6} gap={4}>
  <SuggestedHeader/>
  <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
    <Text fontSize={12} fontWeight={"bold"} _hover={{color: "gray.500"}} >
      Suggested for you

    </Text>
    <Text fontSize={12} fontWeight={"bold"} _hover={{color: "gray.400"}} cursor={"pointer"}>
      See All
    </Text>
  </Flex>
<SuggestedUser  name='Prachet Nandan' followers={1392} avatar='/prachet.jpg'/>
<SuggestedUser name='Harshit Shukla' followers={567} avatar='Harshit.jpg'/>
<SuggestedUser name='Jiwan Tandon' followers={1392} avatar='https://bit.ly/code-beast'/>


<Box fontSize={12} color={"gray.500"} mt={5} alignSelf={"start"}>
   © 2023 Built By {" @FanMania"}

</Box>
 </VStack>
  );
};

export default SuggestedUsers