import { FunctionComponent, useState, useEffect } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/app";
import "firebase/auth";

interface IProps {
}

const firebaseAuthConfig = {
  signInFlow: "popup",
  signInOptions: [{
    provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
    requireDisplayName: false
  }],
  signInSuccessUrl: "/"
}

const firebaseAuth: FunctionComponent<IProps> = () => {
  const [renderAuth, setRenderAuth] = useState(false)

  useEffect(() => {
    setRenderAuth(true)
  },[])

  return (
    <div className="mt-16">
      {renderAuth ? <StyledFirebaseAuth uiConfig={firebaseAuthConfig} firebaseAuth={firebase.auth()} /> : null}
    </div>
  )
}

export default firebaseAuth
