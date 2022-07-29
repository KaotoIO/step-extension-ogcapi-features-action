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
        <label>Host:</label>
        <input type="url" className="step-extension-ogcapi-features-action-host" required autoFocus value="https://emotional.byteroad.net"></input>
        <button onClick={loadCollections}>Load Collections</button>
      </div>
    </>
  )
};
