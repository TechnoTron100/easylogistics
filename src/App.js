import { Routes, Route, Navigate } from "react-router-dom"
import AddUser from "./components/AddUser"
import Login from "./components/Login"
import TrackDelivery from "./components/TrackDelivery"
import Delivery from "./components/Delivery"
import { useState } from "react"


function App() {
  const [IsAuthenticated, SetAuthentication] = useState(false);

  const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        element={
          IsAuthenticated ? (
            <Component />
          ) : (
            <Navigate to="/" replace state={{ from: rest.location }} />
          )
        }
      />
    );
  };

  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login IsAuthenticated={IsAuthenticated} SetAuthentication={SetAuthentication} />} />
          <Route path="signup" element={<AddUser IsAuthenticated={IsAuthenticated} />} />
          <Route path="delivery" element={IsAuthenticated ? <Delivery IsAuthenticated={IsAuthenticated} /> : <Navigate to={"/"} />} />
          <Route path="track-delivery" element={IsAuthenticated ? <TrackDelivery IsAuthenticated={IsAuthenticated} /> : <Navigate to={"/"} />} />
        </Routes>
      </div>
    </>
  )
}

export default App