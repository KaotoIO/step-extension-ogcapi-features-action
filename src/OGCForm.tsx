import { useState } from 'react';
import { InputUrl } from './InputUrl';
import { CollectionsDropDown } from './CollectionsDropDown';
import { DynamicInputs } from './DynamicInputs';
import * as React from 'react';
import { IStepProps } from 'kaoto/dts/types';

export interface IOGCForm {
  saveConfig?: (newConfig: any) => void;
  step?: IStepProps;
}

export const OGCForm = ({ saveConfig, step }: IOGCForm) => {
  const [inputs, setInputs] = useState({});
  const [collections, setCollections] = useState([]);
  const [serverUrl, setServerUrl] = useState('');
  const [collection, setCollection] = useState('');
  const [query, setQuery] = useState('');

  const saveHandler = () => {
    var values = {};
    step?.parameters?.forEach(updateParameter);

    function updateParameter(p) {
      if (p[key] == 'url') {
        values[key] = serverUrl;
      } else if (p[key] == 'collection') {
        values[key] = collection;
      } else if (p[key] == 'bbox') {
        values[key] = document.getElementsByClassName(
          'step-extension-ogcapi-features-action-bbox'
        )[0].value;
      } else if (p[key] == 'limit') {
        values[key] = document.getElementsByClassName(
          'step-extension-ogcapi-features-action-limit'
        )[0].value;
      } else if (p[key] == 'split') {
        values[key] = document.getElementsByClassName(
          'step-extension-ogcapi-features-action-split'
        )[0].value;
      } else if (p[key] == 'query') {
        let query = '';
        let children = document.getElementsByClassName(
          'step-extension-ogcapi-features-action-query'
        )[0].children;
        for (let i = 0; i < children.length; i++) {
          let element = children.item(i).children.item(1);
          query = query + '&' + element[data - id] + '=' + element.value;
        }
        values[key] = query;
      }
    }

    if (saveConfig) saveConfig(values);
  };

  const callBackFromInputUrl = (data) => {
    setCollections(data);
    saveHandler();
  };

  const callBackFromCollections = (data) => {
    setInputs(data);
    saveHandler();
  };

  const callBackForServerUrl = (data) => {
    setServerUrl(data);
    saveHandler();
  };

  return (
    <>
      <header className="App-header"></header>
      <div className="form-group">
        <InputUrl
          callbackFunction={callBackFromInputUrl}
          callbackForServerUrl={callBackForServerUrl}
        />
        <CollectionsDropDown
          collections={collections}
          serverUrl={serverUrl}
          callbackFunction={callBackFromCollections}
          setCollection={setCollection}
        />
        <div>
          <label>Bounding Box</label>
          <input
            type="text"
            placeholder="-180,-90,180,90"
            className="form-control step-extension-ogcapi-features-action-bbox"
          />
        </div>
        <div>
          <label>Limit</label>
          <input
            type="number"
            min="1"
            max="10000"
            placeholder="10"
            className="form-control step-extension-ogcapi-features-action-limit"
          />
        </div>
        <DynamicInputs inputs={inputs} />
        <div className="form-check step-extension-ogcapi-features-action-split">
          <input className="form-check-input" type="checkbox" value="" />
          <label className="form-check-label">
            Split features. When checked, it will return one message per feature instead of the full
            geoJSON.
          </label>
        </div>
        <button onClick={saveHandler}>Save</button>
      </div>
    </>
  );
};
