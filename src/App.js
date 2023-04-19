import React from "react";
import "./styles.css";
import Navbar from "./compenents/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from './ProtectedRoute';
// PAGES
import Signup from "./pages/Signup";
import Login from './pages/Login';
import IngresoConfa from "./pages/IngresoConfa";
import CargarArchivo from "./pages/CargarArchivo";
     //  <Route path="/IngresoConfa" component={IngresoConfa}   />
export default function App() {
  return (
    <div className="App">
     
      <Router>
        <Navbar />
        <Switch>
        <Route path="/" exact component={Login} />
         <Route path="/signup"  component={Signup} />
         <Route path="/CargarArchivo" component={CargarArchivo} />
          <ProtectedRoute path="/IngresoConfa" component={IngresoConfa} />
          
        </Switch>
      </Router>
      
    </div>
  );
}

