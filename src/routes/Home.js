import { useEffect, useState } from "react";
import { dbService, db } from "fConfig";
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";

const Home = ({userObj}) => {

  const [ nweets, setNweets ] = useState([]);

  useEffect(() => {
    db.onSnapshot(
      db.query(db.collection(dbService, "nweets"), db.orderBy("createdAt", "desc")),
      snapshot => {
        setNweets(snapshot.docs.map(x => ({id: x.id, ...x.data()})));
      }
    );
  }, []);

  return (
    <div className="container">
      <NweetFactory 
        userObj={userObj}
      />
      <div style={{marginTop: 30}}>
        {nweets.map(n => 
          <Nweet
            key={n.id}
            nweetObj={n}  
            isOwner={n.creatorId === userObj.uid}
          />
        )}
      </div>
    </div>
  )
};

export default Home;