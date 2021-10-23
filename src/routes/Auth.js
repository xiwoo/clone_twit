import { authService, auth } from "fConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import AuthForm from 'components/AuthForm';

const Auth = () => {

  const onSocialClick = async event => {

    const {
      target: {name},
    } = event;

    let provider;

    if(name === "google") {
      provider = new auth.GoogleAuthProvider();
    } else if(name === "github") {
      provider = new auth.GithubAuthProvider();
    }
    await auth.signInWithPopup(authService, provider, auth.browserPopupRedirectResolver)
  }

  return (
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color="#04AAFF"
        size="3x"
        style={{marginBottom: 30}}
      />
      <AuthForm />
      <div className="authBtns">
        <button onClick={onSocialClick} name="google" className="authBtn">
          Continue with Google <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button onClick={onSocialClick} name="github" className="authBtn">
          Continue with Github <FontAwesomeIcon icon={faGithub} />
        </button>
      </div> 
    </div>
  )
};

export default Auth;