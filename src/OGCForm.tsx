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

function encodeURI(data) {
  return Object.keys(data)
    .map(function (key) {
      return [key, data[key]].map(encodeURIComponent).join('=');
    })
    .join('&');
}

export const OGCForm = ({ saveConfig, step }: IOGCForm) => {
  let initialValues = {};
  step?.parameters?.forEach((p) => {
    if (p['value']) {
      initialValues[p['title']] = p['value'];
    } else {
      initialValues[p['title']] = null;
    }
  });

  const [inputs, setInputs] = useState({});
  const [collections, setCollections] = useState([]);
  const [serverUrl, setServerUrl] = useState(initialValues['url']);
  const [collection, setCollection] = useState(initialValues['collection']);
  const [bbox, setBBOX] = useState(initialValues['bbox']);
  const [limit, setLimit] = useState(initialValues['limit']);
  const [split, setSplit] = useState(initialValues['split']);
  const [query, setQuery] = useState(initialValues['query']);

  console.log(step);
  console.log(initialValues);
  console.log(serverUrl);

  const saveHandler = () => {
    // let values = {};
    // step?.parameters?.forEach(updateParameter);

    let values = {
      url: serverUrl,
      collection: collection,
      bbox: bbox,
      limit: limit,
      split: split,
      query: query,
    };

    // delete undefined values
    Object.keys(values).forEach((key) => {
      if (!values[key] || values[key] === '') {
        delete values[key];
      }
    });

    // console.log('values: ', values);

    // function updateParameter(p) {
    //   if (p['title'] == 'url') {
    //     values[p['title']] = serverUrl;
    //   } else if (p['title'] == 'collection') {
    //     values[p['title']] = collection;
    //   } else if (p['title'] == 'bbox') {
    //     values[p['title']] = bbox;
    //   } else if (p['title'] == 'limit') {
    //     values[p['title']] = limit;
    //   } else if (p['title'] == 'split') {
    //     values[p['title']] = split;
    //   } else if (p['title'] == 'query') {
    //     values[p['title']] = query;
    //   }
    // }

    if (saveConfig) {
      saveConfig(values);
    }
  };

  const callBackFromInputUrl = (data) => {
    setCollections(data);
    //saveHandler();
  };

  const callBackFromCollections = (data) => {
    setInputs(data);
    //saveHandler();
  };

  const callBackForServerUrl = (data) => {
    setServerUrl(data);
    //saveHandler();
  };

  const handleDynamicInputs = (data) => {
    // console.log('data: ', data);
    const encoded = encodeURI(data);
    setQuery(encoded);
  };

  return (
    <>
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
          <label>
            <span>BBOX</span>
            <br />
            <small className="form-text text-muted">
              Limit features on the following Bounding Box.
            </small>
          </label>
          <input
            type="text"
            placeholder="-180,-90,180,90"
            onChange={(e) => {
              setBBOX(e.target.value);
            }}
          />
        </div>
        <div>
          <label>
            <span>Limit</span>
            <br />
            <small className="form-text text-muted">Maximum amount of features to return.</small>
            <br />
          </label>
          <input
            type="number"
            min="1"
            max="10000"
            placeholder="10"
            onChange={(e) => {
              setLimit(e.target.value);
            }}
          />
        </div>
        <DynamicInputs handleDynamicInputs={handleDynamicInputs} inputs={inputs} />
        <div className="form-check step-extension-ogcapi-features-action-split">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            onChange={(e) => {
              setSplit(e.target.value);
            }}
          />
          <label className="form-check-label">
            <span>Split features.</span>
            <br />
            <small className="form-text text-muted">
              When checked, it will return one message per feature instead of the full geoJSON.
            </small>
          </label>
        </div>
        <button onClick={saveHandler}>Save</button>
      </div>
    </>
  );
};

export default OGCForm;
