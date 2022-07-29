import * as React from 'react';

export const DynamicInputs = ({ inputs }) => {
  return (
    <>
      <div className="step-extension-ogcapi-features-action-query">
        {inputs?.map((i, idx) => {
          return (
            <input type={'text'} key={idx} />
          )
        })}
      </div>
    </>
  )
};


