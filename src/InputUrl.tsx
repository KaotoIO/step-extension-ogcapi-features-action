import * as React from 'react';

export const InputUrl = ({ callbackFunction }) => {
    const loadCollections = (event) => {
          let url = event.target.parentElement.getElementsByClassName("step-extension-ogcapi-features-action-host")[0].value;
          url = url + "/collections";
          
          fetch(url, {method: "GET", accept: "application/json"})
              .then(response => response.json())
              .then(data => {
                   callbackFunction(data.collections);
              });
    }

  return (
    <>
      <div>
        <small className="form-text text-muted">Enter the server you want to query from and load the collections.</small>
        <label for="step-extension-ogcapi-features-action-host">Host:</label>
        <input className="form-control" type="url" id="step-extension-ogcapi-features-action-host" required autoFocus value="https://emotional.byteroad.net"></input>
        <button onClick={loadCollections}>Load Collections</button>
      </div>
    </>
  )
};
