import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AddUpdateBook from "./components/AddUpdateBook";
import store from "./redux/store";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/book-list" component={Dashboard} />
          <Route path="/book" component={AddUpdateBook} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
