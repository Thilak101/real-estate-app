import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";
import {useDispatch} from "react-redux"
import {signInSuccess} from "../../features/user"
import {useNavigate} from "react-router-dom"
 
const Auth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json()
      dispatch(signInSuccess(data))
      navigate("/")
      
    } catch (err) {
      console.log("could not sign in with google", err);
    }
  };

  return (
    <button
    type="button"
      className="bg-red-700 
    text-white 
    p-3 
    rounded-lg
    uppercase
    hover:opacity-95"
      onClick={handleGoogleClick}
    >
      Continue with google
    </button>
  );
};

export default Auth;
