import * as React from 'react';

export const DynamicInputs = ({ handleDynamicInputs, inputs }) => {
  const [localValues, setLocalValues] = React.useState({});

  const handleChange = (e) => {
    console.log('event: ', e.target.value);
    if (!e.target.value) return;
    let name = e.target.name;
    setLocalValues({ ...localValues, [name]: e.target.value });
    handleDynamicInputs({ ...localValues, [name]: e.target.value });
  };

  if (inputs) {
    return (
      <>
        <div className="step-extension-ogcapi-features-action-query">
          <form onChange={handleChange}>
            {Object.entries(inputs)
              .filter(([key, value], idx) => !!value.type)
              .map(([key, value], idx) => {
                return (
                  <div key={idx}>
                    <label>{value.title}</label>
                    <input
                      className="form-control"
                      name={value.title}
                      type={value.type}
                      data-id={key}
                      key={idx}
                    />
                  </div>
                );
              })}
          </form>
        </div>
      </>
    );
  } else {
    return <></>;
  }
};
