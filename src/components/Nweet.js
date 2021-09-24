import { useState } from "react";
import { dbService, db, storageService, storage } from "fConfig";

const Nweet = ({nweetObj, isOwner}) => {

  const [ editing, setEditing ] = useState(false);
  const [ newNweet, setNewNweet ] = useState(nweetObj.text);

  const onDeleteClick = async () => {
    if(window.confirm("삭제하시겠습니까?")) {
      await db.deleteDoc(db.doc(dbService, `nweets/${nweetObj.id}`));
      if(nweetObj.attachmentURL !== "") {
        const ref = storage.ref(storageService, nweetObj.attachmentURL);
        await storage.deleteObject(ref);
      }
    }
  };

  const onChange = e => {
    const {
      target: {value}
    } = e;
    setNewNweet(value);
  };

  const onSubmit = async e => {
    e.preventDefault();
    await db.updateDoc(db.doc(dbService, `nweets/${nweetObj.id}`), {text: newNweet});
    setEditing(false);
  };

  const toggleEditing = () => setEditing(prev => !prev);

  return (
    <div>
      {
        editing ? 
        (
          <>
            <form onSubmit={onSubmit}>
              <input value={newNweet} onChange={onChange}/>
              <input type="submit" value="Update Nweet" />
            </form>
            <button onClick={toggleEditing}>Cancel</button>
          </>
        ) : (
          <>
            <h4>{nweetObj.text}</h4>
            {
              nweetObj.attachmentURL && (
                <img src={nweetObj.attachmentURL} width="50px" height="50px" />
              )
            }
            {
              isOwner && (
                <>
                  <button onClick={onDeleteClick}>Delete Nweet</button>
                  <button onClick={toggleEditing}>Edit Nweet</button>
                </>
              )
            }
          </>
        )
      }
    </div>
  )
};

export default Nweet;