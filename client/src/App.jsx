import React from "react";
import Layout from "./components/Layout/Layout";
import Homepage from "./Homepage";
import "./styles/globals.scss";

const App = () => {
  return (
    <div style={{ maxWidth: "100vw", overflow: "hidden" }}>
      <Layout>
        <Homepage />
      </Layout>
    </div>
  );
};

export default App;
