import "./styles/globals.scss";
import Header from "./components/Header";

function App() {
  return (
    <>
      <div className="App">
        <Header />
        Hello World
        <div>
          hello 2<div className="div2">Hello Div 2s</div>
          <div>hello 3</div>
        </div>
      </div>
    </>
  );
}

export default App;
