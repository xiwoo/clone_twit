import { useState } from "react";
import { dbService, db, storageService, storage } from "fConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
    <div className="nweet">
      {
        editing ? 
        (
          <>
            <form onSubmit={onSubmit} className="container nweetEdit">
              <input 
                value={newNweet} 
                onChange={onChange}
                required
                placeholder="Edit your nweet"
                autoFocus
                className="formInput"
              />
              <input type="submit" value="Update Nweet" className="formBtn" />
            </form>
            <button onClick={toggleEditing} className="formBtn cancelBtn" >Cancel</button>
          </>
        ) : (
          <>
            <h4>{nweetObj.text}</h4>
            <div>{nweetObj.createdAt}</div>
            {
              nweetObj.attachmentURL && (
                <img src={nweetObj.attachmentURL} width="50px" height="50px" />
              )
            }
            {
              isOwner && (
                <div className="nweet__actions">
                  <span onClick={onDeleteClick}>
                    <FontAwesomeIcon icon={faTrash} />
                  </span>
                  <span onClick={toggleEditing}>
                    <FontAwesomeIcon icon={faPencilAlt} />
                  </span>
                </div>
              )
            }
          </>
        )
      }
    </div>
  )
};

export default Nweet;