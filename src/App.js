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
import LoginG from './pages/LoginG';
import ListarRegistros from './pages/ListarRegistros';
import IngresoConfaObj from './pages/IngresoConfaObj';



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
         <Route path="/IngresoConfaObj" component={IngresoConfaObj} />
         
         <Route path="/ListarRegistros" component={ListarRegistros} />
         ListarRegistros
          <ProtectedRoute path="/IngresoConfa" component={IngresoConfa} />
          <Route path="/LoginG" component={LoginG} />
          
        </Switch>
      </Router>
      
    </div>
  );
}

