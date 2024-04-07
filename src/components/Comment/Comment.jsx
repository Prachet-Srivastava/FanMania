import { Flex ,Avatar,Text} from "@chakra-ui/react"

const Comment=({ createdAt, username, profilePic, text})=> {
  return <Flex gap={4}>
  <Avatar  src={profilePic} name={username} size={"sm"}/>
  <Flex direction={"column"}>
    <Flex gap={2}>
        <Text fontWeight={"bold"} fonstSize={12}>
            {username}
        </Text>
        <Text fonstSize={14}>{text}</Text>
    </Flex>
    <Text fonstSize={12} color={'gray'}>
        {createdAt}
    </Text>
  </Flex>
  </Flex>
}

export default Comment