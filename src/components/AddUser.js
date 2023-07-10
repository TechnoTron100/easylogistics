import { useState, useRef } from "react";
import '../index.css'
import firebase from '../firebase'
import { Link } from "react-router-dom";

const AddUser = ({IsAuthenticated}) => {

  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  const db = firebase.firestore();
  const collectionRef = db.collection("users");

  const fullName = useRef();
  const mobileNo = useRef();
  const password = useRef();

  const registerUser = async () => {
    await collectionRef.add({
      "Full Name": fullName.current.value.toLowerCase(),
      "Mobile No": mobileNo.current.value.toLowerCase(),
      "Password": password.current.value.toLowerCase()
    }).then((res) => {
      console.log(res);
      setResponse("User created successfully")
      setSuccess(true);
      setLoading(false)
    }).catch((err) => {
      console.error(err);
      setResponse("Failed...something went wrong");
      setLoading(false)
      setSuccess(false);
    });
  }

  const SignUp = async () => {
    setLoading(true);
    const collectionExists = new Promise((resolve, reject) => {
      collectionRef.get().then(snapshot => {
        resolve(snapshot.exists);
      }, err => {
        reject(err);
      });
    });

    collectionExists.then(exists => {
      if (exists) {
        const userExists = collectionRef.where("Mobile No", "==", mobileNo.current.value);
        if (userExists === false) {
          registerUser()
        } else {
          setResponse("User already exists");
          setLoading(false)
          setSuccess(false);
        }
      } else {
        registerUser();
      }
    });
  }

  return (
    <div>
      <header>
        <h1>Sign Up Form</h1>
      </header>
      {response ? <label className={`response ${isSuccess ? 'response-success' : 'response-failed'}`}>{response}</label > : ""}
      <div className="w3ls-contact">
        <form>
          <div className="agile-field-txt">
            <label>Full Name:</label>
            <input
              type="text"
              id="full_name"
              name="name"
              ref={fullName}
              placeholder=" "
              required=""
            />
          </div>
          <div className="agile-field-txt">
            <label>Mobile No:</label>
            <input
              type='tel'
              ref={mobileNo}
              name="name"
              placeholder=" "
              required
            />
          </div>
          <div className="agile-field-txt">
            <label>Password:</label>
            <input
              type="password"
              ref={password}
              name="name"
              placeholder=" "
              required
            />
          </div>
          <div className="w3ls-contact w3l-sub">
            {loading ? <p>Signing Up...</p> : <input type="submit" value="Sign Up" onClick={SignUp} />}
          </div>
          <Link to="/" className="btn-bottom">Already have an account? <span>Login</span></Link>
        </form>
      </div>
      <div div className="copy-wthree" >
        <p>
          ©{Date.now} Logistics | All Rights Reserved |&nbsp;
          <a href="https://www.codebeans.com.ng" target="_blank" rel='noreferrer'>CodeBeans</a>
        </p>
      </div>
    </div >
  );
}

export default AddUser;