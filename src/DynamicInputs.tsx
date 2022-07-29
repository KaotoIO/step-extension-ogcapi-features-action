import * as React from 'react';

class DynamicInputs extends React.Component {
  
    constructor(props) {
      super(props);   
      
      this.state = {
          dynamicInputs : props.inputs.map(inputs => <input type="text"/>)
      };
    }

    render() {
      return (
        <>
          <div className="step-extension-ogcapi-features-action-query">
            {this.state.dynamicInputs}
          </div>
        </>
      )
    }
};

export default DynamicInputs;

