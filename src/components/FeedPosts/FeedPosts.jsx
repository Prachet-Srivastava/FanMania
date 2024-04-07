import { Box, Container, Skeleton, SkeletonCircle, VStack, Flex } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import FeedPost from './FeedPost'

const FeedPosts = () => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        },2000)
    },[])
  return (
    <Container maxW={"container.sm"} py={10} px={2}>
        {isLoading && [0,1,2,3].map((_,idx) => (
            <VStack key={idx} gap={4} alignItems={"flex-start"} mb={10}>
                <Flex gap="2">
                 <SkeletonCircle size='10'/>
                 <VStack gap={2} alignItems={"flex-start"}>
                 <Skeleton height='10px' w={"200px"}/>
                 

                 </VStack>
                </Flex>

                <Skeleton w={"full"}>
                    <Box h={"500px"}>contents wrapped</Box>
                </Skeleton>
            </VStack>
        ))}
        {!isLoading && (
            <>
       <FeedPost img='/h.jpg' username='Harshit' avatar='/Harshit.jpg' />
       <FeedPost img='/t.jpg' username='Jiwan'   avatar='/t.jpg'/>
       <FeedPost img='/s.jpeg' username='Prachet' avatar='/prachet.jpg'/>
       <FeedPost img='/p.jpg' username='Zenzo'  avatar='/p.jpg'/>
       <FeedPost img='/gif.gif' username='Zenzo'  avatar='/p.jpg'/>
       <FeedPost img='/h1.jpg' username='Harshit' avatar='/Harshit.jpg' />
       <FeedPost img='/drac.jpg' username='Prachet' avatar='/prachet.jpg'/>
       <FeedPost img='/h2.jpg' username='Harshit' avatar='/Harshit.jpg' />
       <FeedPost img='/harry.png' username='Jiwan'   avatar='/t.jpg'/>
       <FeedPost img='/j1.gif' username='Zenzo'  avatar='/p.jpg'/>
            </>
        )}
       
        
        </Container>
  );
};

export default FeedPosts