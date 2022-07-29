
import {
  useState
} from 'react';
import * as React from 'react';

export const InputUrl = ({ callbackFunction, callbackForServerUrl }) => {

    const [url, setUrl] = useState("");

    const callBackUrl = (data) => {
      setUrl(data.target.value);
      callbackForServerUrl(data.target.value);
    }


    const loadCollections = (event) => {
          let fullUrl = url + "/collections";
          
          fetch(fullUrl, {method: "GET", accept: "application/json"})
              .then(response => response.json())
              .then(data => {
                   callbackFunction(data.collections);
              });
    }

  return (
    <>
      <div>
        <small className="form-text text-muted">Enter the server you want to query from and load the collections.</small>
        <label for="step-extension-ogcapi-features-action-host">Host</label>
        <input className="form-control" type="url" onChange={callBackUrl} required autoFocus></input>
        <button className="form-control" onClick={loadCollections}>Load Collections</button>
      </div>
    </>
  )
};
