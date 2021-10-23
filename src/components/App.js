import { useEffect, useState } from 'react';
import { authService } from "fConfig";
import AppRouter from "components/Router";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  const [ userObj, setUserObj ] = useState(null);
  
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        setIsLoggedIn(user);
        setUserObj({
          uid: user.uid,
          displayName: user.displayName,
          // updateProfile: (args) 
        });
      }
      else {
        // setIsLoggedIn(false);
        setUserObj(false);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    setUserObj(authService.currentUser);
  }

  return (
    <>
      {init ? <AppRouter 
        isLoggedIn={isLoggedIn} 
        userObj={userObj} 
        refreshUser={refreshUser}
      /> : "initializing..."}
    </>
  );
}

export default App;
