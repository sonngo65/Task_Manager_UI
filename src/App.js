import logo from "./logo.svg";
import "./App.css";
import Header from "./components/layout/Header";
import "./style/custom.scss";
import LoginForm from "./components/LoginForm";
function App() {
  return (
    <div className="App">
      <Header />
      <LoginForm />
    </div>
  );
}

export default App;
