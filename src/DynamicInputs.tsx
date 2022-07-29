import * as React from 'react';

export const DynamicInputs = ({ inputs }) => {

  if (inputs) {
    return (
      <>
        <div className="step-extension-ogcapi-features-action-query">
          <div>
            <label>Bounding Box</label>
            <input type="text" id="bbox" placeholder="-180,-90,180,90"/>
          </div>
          <div>
            <label>Limit</label>
            <input type="number" id="bbox" min="1" max="10000" placeholder="10"/>
          </div>
          {Object.entries(inputs)
              .filter(([key, value], idx) => !!value.type)
              .map(([key, value], idx) => {
                return (
                  <div>
                    <label for="{key}">{value.title}</label>
                    <input className="form-control" type={value.type} id={key} key={idx} />
                  </div>
                )
            })
          } 
        </div>
      </>
    );
  } else {
    return (<></>);
  }
  
};


