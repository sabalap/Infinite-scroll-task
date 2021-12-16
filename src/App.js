import React from "react";
import { Route } from "react-router-dom";
import SingleUser from "./components/SingleUser";
import Users from "./components/Users";
const App = () => {
  return (
    <div className="container">
      <Route path={"/"} exact>
        <Users />
      </Route>
      <Route path={"/user/:id"} exact children={<SingleUser />} />
    </div>
  )
}
export default App;