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
  const [inputs, setInputs] = useState([]);
  const [collections, setCollections] = useState([]);

  const callBackFromInputUrl = (data) => {
    setCollections(data);
  }

  const callBackFromCollections = (data) => {
    setInputs(data);
  }

  return (
    <>
      <header
        className="App-header">
        <p>
          Introduce the server
          you want
          to
          connect
          to
        </p>
      </header>
      <InputUrl
        callbackFunction={callBackFromInputUrl}/>
      <CollectionsDropDown
        collections={collections}
        callbackFunction={callBackFromCollections}/>
      <DynamicInputs
        inputs={inputs}/>
    </>
  )
};


