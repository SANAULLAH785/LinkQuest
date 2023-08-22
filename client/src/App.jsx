import React from "react";
import Layout from "./components/Layout/Layout";
import Homepage from "./Homepage";
import { Provider } from "react-redux";
import store from "./Store";
import "./styles/globals.scss";

const App = () => {
  return (
    <Provider store={store}>
      <Layout>
        <Homepage />
      </Layout>
    </Provider>
  );
};

export default App;
