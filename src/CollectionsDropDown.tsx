import * as React from 'react';

export const CollectionsDropDown = ({ collections, callbackFunction, serverUrl }) => {

  const loadQueryable = (event) => {
      let url = serverUrl + "/collections/" + event.target.value + "/queryables";
      
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
          <select  className="form-control" name="collection" required onChange={loadQueryable}>
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


