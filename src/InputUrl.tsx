import * as React from 'react';

class InputUrl extends React.Component {

    constructor(props) {
      super(props);   
    }

    loadCollections(event) {
          let url = event.target.parentElement.getElementsByClassName("step-extension-ogcapi-features-action-host")[0].value;
          url = url + "/collections";
          
          fetch(url, {method: "GET", accept: "application/json"})
              .then(response => response.json())
              .then(data => {
                   props.callbackFunction(data.collections);
              });
    }
    
    render() {
    
      return (
        <>
          <div>
            <label>Host:</label>
            <input type="url" className="step-extension-ogcapi-features-action-host" required autoFocus value="https://emotional.byteroad.net"></input>
            <button onClick={this.loadCollections.bind(this)}>Load Collections</button>
          </div>
        </>
      )
    }
};

export default InputUrl;

