// import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Pages/Home/Home';
import Explore from './Pages/Explore/Explore';
import Dashboard from './Pages/Dashboard/Dashboard';
import Login from './Pages/Authenticate/Login/Login';
import Register from './Pages/Authenticate/Register/Register';
import AuthProvider from './contexts/AuthProvider';
import NotFound from './Pages/Shared/NotFound/NotFound';
import PrivateRoute from './Pages/Authenticate/PrivateRoute/PrivateRoute';
import ProductDetails from './Pages/ProductDetails/ProductDetails';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/explore">
              <Explore />
            </Route>
            <PrivateRoute path="/dashboard">
              <Dashboard />
            </PrivateRoute>
            <Route exact path="/">
              <Home />
            </Route>
            <PrivateRoute path="/product_details/:id">
              <ProductDetails />
            </PrivateRoute>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
