import { useEffect, useState } from "react";
import { dbService, db } from "fConfig";

const Home = ({userObj}) => {
  console.log(userObj);
  const [ nweet, setNweet ] = useState("");
  const [ nweets, setNweets ] = useState([]);

  const onSubmit = async e => {
    e.preventDefault();
    const docRef = await db.addDoc(
      db.collection(dbService, "nweets"),
      {
        text: nweet,
        createAt: Date.now(),
        creatorId: userObj.uid,
      }
    );
    console.log(docRef);
    setNweet("");
  };

  const getNweets = async () => {
    const dbNweets = await db.getDocs(db.collection(dbService, "nweets"));
    dbNweets.forEach(doc => {
      setNweets(x => [{...doc.data(), id: doc.id}, ...x]);
    });
  };

  const onChange = e => {
    e.preventDefault();
    const {
      target: {value},
    } = e;
    setNweet(value);
  };

  useEffect(() => {
    db.onSnapshot(
      db.doc(dbService, "", ""),
      doc => {
        console.log("");
      }
    );
  }, []);


  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {nweets.map(n => (
          <div key={n.id}>
            <h4>{n.text}</h4>
          </div>
        ))}
      </div>
    </>
  )
};

export default Home;