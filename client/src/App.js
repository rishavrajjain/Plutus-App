import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';

import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Dashboard from './pages/Dashboard';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/routing/PrivateRoute';
import Holdings from './pages/Holdings';
import Profile from './components/auth/Profile';
import Leaderboard from './pages/Leaderboard';
import Home from './pages/Home';

function App() {
  return (
    <Router>
    <ToastContainer/>
    <Switch>
      <Route exact path="/" component={Home}></Route> 
      <Route exact path="/login" component={Login}></Route>
      <Route exact path="/signup" component={Signup}></Route>
      <PrivateRoute exact path="/dashboard" component={Dashboard}></PrivateRoute>
      <PrivateRoute exact path="/holdings" component={Holdings}></PrivateRoute>
      <PrivateRoute exact path="/leaderboard" component={Leaderboard}></PrivateRoute>
      <PrivateRoute exact path="/profile" component={Profile}></PrivateRoute>
    </Switch>
    
    </Router>
  );
}

export default App;
