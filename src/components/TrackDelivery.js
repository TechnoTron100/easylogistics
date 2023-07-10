import { useRef, useState } from 'react';
import '../index.css'
import firebase from '../firebase'
import { Link } from 'react-router-dom';

const TrackDelivery = ({ IsAuthenticated }) => {

  const [response, setResponse] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  const db = firebase.firestore();

  const trackingId = useRef();



  const getTrackingDetail = async () => {

    setLoading(true);
    try {
      const querySnapshot = db.collection("deliveries")
        .where("TrackingId", "==", trackingId.current.value)
        .get();
      console.log("Got snapshot")
      if (!(await querySnapshot).empty) {
        const documentData = (await querySnapshot).docs[0].data();
        console.log(documentData)
        setStatus(documentData)
        setLoading(false)
        setSuccess(true);
        console.log("Data set")
      }
      else {
        setResponse("Tracking number not recognized");
        setLoading(false)
        setSuccess(false);
      }
    }
    catch (error) {
      setResponse("Failed...something went wrong");
      setLoading(false)
      setSuccess(false);
    }
  }

  return (
    <div>
      <header>
        <h1>Track Delivery</h1>
      </header>
      {response ? <label className={`response ${isSuccess ? 'response-success' : 'response-failed'}`}>{response}</label > : ""}
      <div className="w3ls-contact">
        <form>
          <div className="agile-field-txt">
            <label>Tracking Number</label>
            <input
              type="text"
              id="full_name"
              name="name"
              ref={trackingId}
              placeholder=" "
              required=""
            />
          </div>
          <div className="w3ls-contact w3l-sub">
            {loading ? <p>Tracking...</p> : <input type="submit" value="Track Delivery" onClick={getTrackingDetail} />}
          </div>
          {isSuccess ? <p className='delivery-status'>Delivery status:&nbsp;
            <span>{status.Status.toUpperCase()}</span></p>
            : ""}
          <div className="btn-bottom">
            <Link to="/delivery" className='color-white'>Want to book a delivery? <span>Book Delivery</span></Link>
          </div>
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

export default TrackDelivery;