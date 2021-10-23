import { useState } from "react";
import { dbService, db, storageService, storage } from "fConfig";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const NweetFactory = ({userObj}) => {
  
  const [ nweet, setNweet ] = useState("");
  const [ attachment, setAttachment ] = useState("");
  
  const onSubmit = async e => {
    e.preventDefault();
    if(nweet === '') {
      return;
    }
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
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input
          className="factoryInput__input"
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="&rarr;" className="factoryInput__arrow"/>
      </div>
      <label htmlFor="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input id="attach-file" type="file" accept="image/*" onChange={onFileChange} style={{opacity: 0,}}/>
      {attachment && (
        <div className="factoryForm__attachment">
          <img src={attachment} style={{ backgroundImage: attachment, }} />
          <div className="factoryForm__clear" onClick={onClearAttachment} >
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
  )
};

export default NweetFactory;