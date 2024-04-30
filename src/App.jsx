
// import { Route, Routes, Navigate }  from 'react-router-dom';
// import HomePage from './pages/HomePage/HomePage';
// import AuthPage from './pages/AuthPage/AuthPage';
// import PageLayout from './layouts/PageLayout/PageLayout';
// import ProfilePage from './pages/ProfilePage/ProfilePage';
// import Movies from './pages/Movies';
// import Navbar from './components/Navbar/Navbar';

// import { useAuthState } from 'react-firebase-hooks/auth';
// import { auth } from './firebase/firebase';
// function App() {
  
  
//   const [authUser] = useAuthState(auth);
//   return (
//     <>
  
//   <PageLayout>
//   <Routes>
//    <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/auth"/>}/>
//    <Route path='/auth' element={!authUser ? <AuthPage /> : <Navigate to ="/"/>} />
//    <Route path='/:username' element={<ProfilePage />} />
//   </Routes>
//   </PageLayout>
//   </>

//   );
  
    
  
// }

// export default App


import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import AuthPage from './pages/AuthPage/AuthPage';
import PageLayout from './layouts/PageLayout/PageLayout';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import Movies from './pages/Movies';
import Navbar from './components/Navbar/Navbar';
import MovieSearch from './components/MovieSearch';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/firebase';

function App() {
  const [authUser] = useAuthState(auth);

  return (
    <>
      <Navbar />
      <PageLayout>
        <Routes>
          <Route
            path='/'
            element={authUser ? (
              <>
                <HomePage />
                <MovieSearch />
              </>
            ) : (
              <Navigate to='/auth' />
            )}
          />
          <Route path='/auth' element={!authUser ? <AuthPage /> : <Navigate to='/' />} />
          <Route path='/:username' element={<ProfilePage />} />
          <Route path='/movies' element={<Movies />} />
        </Routes>
      </PageLayout>
    </>
  );
}

export default App;
