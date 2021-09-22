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
        setUserObj(user);
      }
      else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : "initializing..."}
    </>
  );
}

export default App;
