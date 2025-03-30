import './App.css'
import * as React from "react";
import {UsersListExample} from "./examples/UsersListExample";
import {UsersExample} from "./examples/UsersExample";

function App() {
  return (
      <div>
          <h1>useFetch</h1>
          <UsersExample />

          <hr />

          <h1>useList</h1>
          <UsersListExample />
      </div>
  )
}

export default App
