import * as React from 'react';

import InputUrl from './InputUrl';
import CollectionsDropDown from './CollectionsDropDown';
import DynamicInputs from './DynamicInputs';

class OGCForm extends React.Component {

    constructor(props) {
      super(props);   
      
      this.state = {
          inputs : [],
          collections: []
      };
    }
    
    callBackFromInputUrl(collections) {
      this.setState((state, props) => ({ collections: collections}));
    }


  render() {
    
    return (
      <>
        <header className="App-header">
          <p>
  Introduce the server you want to connect to
          </p>
        </header>
        <InputUrl callbackFunction={this.callBackFromInputUrl}/>
        <CollectionsDropDown collections={this.state.collections} />
        <DynamicInputs inputs={this.state.inputs} />
      </>
    )
  }
};

export default OGCForm;

