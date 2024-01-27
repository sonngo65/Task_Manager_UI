import logo from "./logo.svg";
import "./App.css";
import "./style/custom.scss";
import "./style/index.scss";
import PageRouter from "./components/PageRouter";
import store from "./store";
import { Provider } from "react-redux";
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <PageRouter />
      </div>
    </Provider>
  );
}

export default App;
