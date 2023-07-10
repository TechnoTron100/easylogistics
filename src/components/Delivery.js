import { useRef, useState } from 'react';
import '../index.css'
import firebase from '../firebase'
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';


function Delivery({IsAuthenticated}) {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [trackingId, setTrackingId] = useState("");
  const [copy, setCopyText] = useState("Copy");

  const db = firebase.firestore();
  const collectionRef = db.collection("deliveries");

  const fullName = useRef();
  const mobileNo = useRef();
  const movingFrom = useRef();
  const movingTo = useRef();

  const bookDelivery = () => {
    setLoading(true);
    const guid = uuidv4();
    collectionRef.add({
      "Full Name": fullName.current.value.toLowerCase(),
      "Mobile No": mobileNo.current.value.toLowerCase(),
      "Address From": movingFrom.current.value.toLowerCase(),
      "Address To": movingTo.current.value.toLowerCase(),
      "Status": "Pending".toLowerCase(),
      "TrackingId": guid.toLowerCase()
    }).then((res) => {
      console.log(res);
      setResponse("Delivery booked successfully! Your tracking Id is: ")
      setTrackingId(guid)
      setSuccess(true);
      setLoading(false)
    }).catch((err) => {
      console.error(err);
      setResponse("Failed...something went wrong");
      setLoading(false)
      setSuccess(false);
    });
  }

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    setCopyText("Copied");
    setTimeout(() => {
      setCopyText("Copy")
    }, 5000);
  }

  return (
    <div>
      <header>
        <h1>Easy Delivery</h1>
      </header>
      {response ? <label className={`response ${isSuccess ? 'response-success' : 'response-failed'}`}>{response}
        <span className='trackingId'>{trackingId}<button className='copy' onClick={() => copyText(trackingId)}>{copy}</button></span></label> : ""}
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
              type="text"
              ref={mobileNo}
              name="name"
              placeholder=" "
              required
            />
          </div>
          <div className="agile-field-txt">
            <label>Moving from</label>
            <textarea
              ref={movingFrom}
              name="Comments"
              placeholder="Street Address or ZIP code"
              required
            ></textarea>
          </div>
          <div className="agile-field-txt">
            <label>Moving to</label>
            <textarea
              ref={movingTo}
              name="Comments"
              placeholder="Street Address or ZIP code"
              required
            ></textarea>
          </div>
          <div className="w3ls-contact w3l-sub">
            {loading ? <p>Booking...</p> : <input type="submit" value="Book" onClick={bookDelivery} />}
          </div>
          <Link to="/track-delivery" className="btn-bottom">Waiting for a delivery? <span>Track it</span></Link>
        </form>
      </div>
      <div div className="copy-wthree" >
        <p>
          ©{Date.now} Logistics | All Rights Reserved |&nbsp;
          <a href="https://www.codebeans.com.ng" target="_blank" rel='noreferrer'>CodeBeans</a>
        </p>
      </div>
    </div>
  );
}

export default Delivery;
