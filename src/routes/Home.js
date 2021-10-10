import { useEffect, useState } from "react";
import { dbService, db, storageService, storage } from "fConfig";
import Nweet from "components/Nweet";
import { v4 as uuidv4 } from "uuid";

const Home = ({userObj}) => {

  const [ nweet, setNweet ] = useState("");
  const [ nweets, setNweets ] = useState([]);
  const [ attachment, setAttachment ] = useState("");

  useEffect(() => {
    db.onSnapshot(
      // db.doc(dbService, "nweets"),
      db.collection(dbService, "nweets"),
      snapshot => {
        // console.log(snapshot);
        setNweets(snapshot.docs.map(x => ({id: x.id, ...x.data()})));
      }
    );
  }, []);

  const onSubmit = async e => {
    e.preventDefault();
    let attachmentURL = "";
    if(attachment !== "") {
      const ref = storage.ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const response = await storage.uploadString(ref, attachment, 'data_url');
      attachmentURL = await storage.getDownloadURL(response.ref);
    }

    await db.addDoc(
      db.collection(dbService, "nweets"),
      {
        text: nweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
        attachmentURL,
      }
    );
    setNweet("");
    setAttachment("");
  };

  const onChange = e => {
    e.preventDefault();
    const {
      target: {value},
    } = e;
    setNweet(value);
  };

  const onFileChange = e => {
    const {
      target: {files},
    } = e;
    const theFile = files[0];
    if(theFile) {
      const reader = new FileReader();
      reader.onloadend = e => {
        const {
          currentTarget: {result},
        } = e;
        setAttachment(result);
      };
      reader.readAsDataURL(theFile);
    }
  };

  const onClearAttachment = () => setAttachment("");

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
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Nweet" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachment} >Clear</button>
          </div>
        )}
      </form>
      <div>
        {nweets.map(n => 
          <Nweet
            key={n.id}
            nweetObj={n}  
            isOwner={n.creatorId === userObj.uid}
          />
        )}
      </div>
    </>
  )
};

export default Home;