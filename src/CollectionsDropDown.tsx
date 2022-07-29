import * as React from 'react';

export const CollectionsDropDown = ({ collections, callbackFunction }) => {
  const loadQueryable = (event) => {
      let url = event.target.parentElement.parentElement.getElementsByClassName("step-extension-ogcapi-features-action-host")[0].value;
      url = url + "/collections/" + event.target.value + "/queryables";
      
      fetch(url, {method: "GET", accept: "application/json"})
          .then(response => response.json())
          .then(data => {
               console.log(data.properties);
                  callbackFunction(data.properties);
              }
          );
          
    }

    return (
      <>
        <div>
          <label>Collection:</label>
          <select name="collection" required onChange={loadQueryable}>
            {collections.map((collection, idx) => {
              return (
                <option id={collection.id} value={collection.id} key={idx}>
                    [{collection.id}] {collection.description.substring(0,45)} ...
                </option>
              )
            })}
          </select>
        </div>
      </>
    );
};


