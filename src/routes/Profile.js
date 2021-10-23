import { authService, auth, dbService, db } from "fConfig";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Profile = ({ userObj, refreshUser }) => {
  const history = useHistory();
  const [ newDisplayName, setNewDisplayName ] = useState(userObj.displayName);
  
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  const onChange = event => {
    const {
      target: {value},
    } = event;
    setNewDisplayName(value);
  }

  const onSubmit = async event => {
    event.preventDefault();
    if(userObj.displayName !== newDisplayName) {
      await auth.updateProfile(authService.currentUser, {
        displayName: newDisplayName
      });
      refreshUser();
    }
  }
  
  useEffect(() => {
    getMyNweets();
  }, []);

  const getMyNweets = async () => {
    console.log(userObj.uid);
    const nweets = await db.query(
      db.collection(dbService, "nweets"), 
      db.where("creatorId", "==", userObj.uid),
      db.orderBy("createdAt", "asc")
    );
    console.log(nweets);
    const snapshot = await db.getDocs(nweets);
    console.log(snapshot.docs);
    snapshot.docs.forEach(x => console.log(x.data()))
  }

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input 
          type="text" 
          placeholder="Display name" 
          onChange={onChange} 
          value={newDisplayName}
          autoFocus
          className="formInput"
        />
        <input type="submit" value="Update Profile" 
          className="formBtn"
          style={{marginTop: 10,}}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick} >
        Log out
      </span>
    </div>
  )
};

export default Profile;