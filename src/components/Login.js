import { Link, useNavigate } from "react-router-dom";
import '../index.css'
import firebase from '../firebase'
import { useState, useRef } from "react";

const Login = ({ IsAuthenticated, SetAuthentication }) => {

  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  const navigator = useNavigate();

  const db = firebase.firestore();
  const collectionRef = db.collection("users");

  const mobileNo = useRef();
  const password = useRef();


  const signIn = () => {
    setLoading(true);
    const userExists = collectionRef
      .where("Mobile No".toLowerCase(), "==", mobileNo.current.value.toLowerCase())
      .where("Password".toLowerCase(), "==", password.current.value.toLowerCase());
    if (userExists) {
      setResponse("Logged in Successful")
      setSuccess(true);
      setLoading(false);
      SetAuthentication(true);
      navigator("/delivery")
    } else {
      setResponse("Failed...something went wrong");
      setLoading(false)
      setSuccess(false);
    }
  }

  return (
    <div>
      <header>
        <h1>Login Form</h1>
      </header>
      {response ?
        <label className={`response ${isSuccess ? 'response-success' : 'response-failed'}`}>{response}</label >
        : ""}
      <div className="w3ls-contact">
        <form>
          <div className="agile-field-txt">
            <label>Mobile No:</label>
            <input
              type="text"
              id="user_name"
              name="name"
              ref={mobileNo}
              placeholder=" "
              required=""
            />
          </div>
          <div className="agile-field-txt">
            <label>Password</label>
            <input
              type="text"
              ref={password}
              name="name"
              placeholder=" "
              required
            />
          </div>
          <div className="w3ls-contact w3l-sub">
            {loading ? <p>Signing In...</p>
              :
              <Link className="signIn" to="delivery">
                <input type="submit" value="Sign In" onClick={signIn} />
              </Link>}
          </div>
          <Link to="/signup" className="btn-bottom">Don't have an account? <span>Sign Up</span></Link>
        </form>
      </div >
    </div >
  );
}

export default Login;