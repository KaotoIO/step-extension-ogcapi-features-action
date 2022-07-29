import {
  useState
} from 'react';
import {
  InputUrl
} from './InputUrl';
import {
  CollectionsDropDown
} from './CollectionsDropDown';
import {
  DynamicInputs
} from './DynamicInputs';
import * as React from 'react';

export const OGCForm = () => {
  const [inputs, setInputs] = useState({});
  const [collections, setCollections] = useState([{description: "Load Collections from a server"}]);
  const [serverUrl, setServerUrl] = useState("");

  const callBackFromInputUrl = (data) => {
    setCollections(data);
  }

  const callBackFromCollections = (data) => {
    setInputs(data);
  }

  const callBackForServerUrl = (data) => {
    setServerUrl(data);
  }

  return (
    <>
      <header
        className="App-header">
      </header>
      <div className="form-group">
        <InputUrl
          callbackFunction={callBackFromInputUrl}
          callbackForServerUrl={callBackForServerUrl}/>
        <CollectionsDropDown
          collections={collections}
          serverUrl={serverUrl}
          callbackFunction={callBackFromCollections}/>
        <DynamicInputs
          inputs={inputs}/>
      </div>
    </>
  )
};


