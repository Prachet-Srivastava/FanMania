import { useEffect, useState } from 'react';
import useShowToast from './useShowToast';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import useUserProfileStore from '../store/userProfileStore';

const useGetUserProfileByUser = (username) => {
  const [isLoading, setIsLoading] = useState(true);
  const showToast = useShowToast();
  const setUserProfile = useUserProfileStore(state => state.setUserProfile);
  const userProfile = useUserProfileStore(state => state.userProfile);

  useEffect(() => {
    const getUserProfile = async () => {
      setIsLoading(true);
      console.log('Fetching user profile for username:', username);
      try {
        const q = query(collection(firestore, "users"), where("username", "==", username));
        const querySnapshot = await getDocs(q);
        console.log('Query Snapshot:', querySnapshot);

        if (querySnapshot.empty) {
          console.log('User profile not found for username:', username);
          setUserProfile(null);
        } else {
          const userDoc = querySnapshot.docs[0].data();
          setUserProfile(userDoc);
          console.log('User profile found:', userDoc);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        showToast('Error', error.message, 'error');
      } finally {
        setIsLoading(false);
      }
    };

    getUserProfile();
  }, [setUserProfile, username, showToast]);

  return { isLoading, userProfile };
};

export default useGetUserProfileByUser;
