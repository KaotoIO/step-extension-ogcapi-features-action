import * as React from 'react';

class CollectionsDropDown extends React.Component {

    constructor(props) {
      super(props);   
      
      this.state = {
          options : props.collections.map(collection => <option id="sdf">hjkghjkghjkg</option>)
      };
    }

  loadQueryable(event) {    
      var url = event.target.parentElement.parentElement.getElementsByClassName("step-extension-ogcapi-features-action-host")[0].value;
      url = url + "/collections/" + event.target.value + "/queryables";
      
      fetch(url, {method: "GET", accept: "application/json"})
          .then(response => response.json())
          .then(data => {
               console.log(data.properties);
              }
          );
          
    }
  
  render() {
    
    return (
      <>
        <div>
          <label>Collection:</label>
          <select name="collection" required onChange={this.loadQueryable}>
            {this.state.options}
          </select>
        </div>
      </>
    )
  }
};

export default CollectionsDropDown;

