import React, { useState } from "react";
import axios from "axios";

const initialValues = {
  zipCodeFrom: "",
  zipCodeTo: "",
  units: "",
  message: "",
};


function App() {

  const [values, setValues] = useState(initialValues);
  const [message, setMessage] = useState(false);
  const [response, setResponse] = useState({});
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fromZipCode: values.zipCodeFrom,
        toZipCode: values.zipCodeTo
      })
    };
    fetch('https://localhost:44315/GeoLocation/GetPostalCodeDetails', requestOptions)
      .then(response => response.json())
      .then(response => {
        console.log(response);

        setResponse(response);
        setMessage(true);
        window.setTimeout(() => {
          setMessage(false);
        }, 10000)
      });
  };

  return (

    <div className="container middle-content col-md-10">
      <div className="card">
        <div className="card-body">
          <form>
            <div className="row">
              <div className="form-group col-md-4">
                <label for="zipCodeFrom">Zip Code From</label>
                <input type="text" className="form-control" value={values.zipCodeFrom}
                  onChange={handleInputChange} name="zipCodeFrom" placeholder="Zip Code From" />
              </div>
              <div className="form-group col-md-4">
                <label for="zipCodeTo">Zip Code To</label>
                <input type="text" className="form-control" value={values.zipCodeTo}
                  onChange={handleInputChange} name="zipCodeTo" placeholder="Zip Code To" />
              </div>

            </div>
            <button type="button" onClick={handleSubmit} className="seperate btn btn-primary">Submit</button>
          </form>
        </div>
        {message ? <AlertMessage data={response} /> : ""}
      </div>
    </div>
  );
}
const AlertMessage = props => {
  return <div className="alert alert-success" role="alert">
    <p>The distance between {props.data.FromCity} and {props.data.ToCity} is {props.data.Distance} mi</p>

  </div>
};
export default App;
