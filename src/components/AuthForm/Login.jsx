// import { Input, Button, Alert, AlertIcon } from "@chakra-ui/react";
// import { useState } from "react";
// import useLogin from "../../hooks/useLogin";

// const Login = () => {
//     const [inputs, setInputs] = useState({
//         email: '',
//         password: '',
//     });

//     const { loading, error, login } = useLogin();

//     return (
//         <>
//             <Input
//                 placeholder='Email'
//                 fontSize={14}
//                 type='email'
//                 value={inputs.email}
//                 size={"sm"}
//                 onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
//             />
//             <Input
//                 placeholder='Password'
//                 fontSize={14}
//                 type='password'
//                 value={inputs.password}
//                 size={'sm'}
//                 onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
//             />
            
            

//             <Button
//                 w={"full"}
//                 colorScheme="blue"
//                 size={"sm"}
//                 fontSize={14}
//                 isLoading={loading}
//                 onClick={() => login(inputs)}
//             >
//                 Log in        
//             </Button>
//         </>
//     );
// };

// export default Login;

import { Input, Button, Alert, AlertIcon } from "@chakra-ui/react";
import { useState } from "react";
import useLogin from "../../hooks/useLogin";


const Login = () => {
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });

    const { loading, error, login } = useLogin();
    const handleSubmit = (e) => {
        e.preventDefault();
        login(inputs);
    };

    return (
        <>
        
            <Input
            
                borderColor="gray"
                borderRadius = "8px"
                placeholder="Email"
                
                fontSize={14}
                type='email'
                value={inputs.email}
                size={"sm"}
                onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
           
            />
            
            <Input
                placeholder="Password"
                borderColor="gray"
                borderRadius = "8px"
                fontSize={14}
                type='password'
                value={inputs.password}
                size={'sm'}
                onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            />
            
            <Button
                w={"full"}
                colorScheme="blue"
                size={"sm"}
                fontSize={14}
                isLoading={loading}
                onClick={() => login(inputs)}
            >
                Log in        
            </Button>
        </>
    );
};

export default Login;
