import * as React from 'react';
// @ts-ignore
import css from './App.css';
// @ts-ignore
import bootstrap from "./bootstrap";
import {OGCForm} from './OGCForm';

bootstrap(() => {});
function App() {
  return (
    <div className="App">
        <OGCForm />
    </div>
  );
}

export default App;
