import { auth, firestore } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import useAuthStore from "../store/authStore";

const useLogin = () => {
    const [signInWithEmailAndPassword, loading, error] = useSignInWithEmailAndPassword(auth);
    const loginUser = useAuthStore((state) => state.login);

    const login = async (inputs) => {
        try {
            if (!inputs.email || !inputs.password) {
                throw new Error("Please fill in all fields.");
            }

            const userCred = await signInWithEmailAndPassword(inputs.email, inputs.password);
            if (userCred) {
                const docRef = doc(firestore, "users", userCred.user.uid);
                const docSnap = await getDoc(docRef);
                const userData = docSnap.data();
                if (!userData) {
                    throw new Error("User data not found.");
                }

                loginUser(userData);
            }
        } catch (error) {
            throw new Error("Login failed: " + error.message);
        }
    };

    return { loading, error, login };
};

export default useLogin;
