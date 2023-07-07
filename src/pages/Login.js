import React, { useState, useContext,useEffect } from 'react';
import { CognitoUser, AuthenticationDetails,CognitoUserPool } from "amazon-cognito-identity-js";
import UserPool from "./UserPool";
import "./form.css";
import {useHistory } from "react-router-dom";
//https://docs.aws.amazon.com/es_es/apigateway/latest/developerguide/apigateway-enable-cognito-user-pool.html
//https://www.youtube.com/watch?v=yhD2XJVFQUg&list=PLDckhLrNepPR8y-9mDXsLutiwsLhreOk1&index=2
import { gapi } from "gapi-script";
import jwtDecode from 'jwt-decode';
import { GoogleLogin } from 'react-google-login';


const Login = () => {

  const poolData = {
    UserPoolId: 'us-east-1_MQwendKCy',
    ClientId: '7fh5usiukn07fht43mv3hp35o0'
  };
  
 // const authContext = useAuthContext();
  // const navigate = useNavigate();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [respuestaLogin, setRespuestaLogin] = useState("");
 // const [authenticated, setAuthenticated] = useState(false);



  const onSubmit = (event) => {
    
    event.preventDefault();

    const user = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (data) => {

        const accessToken = data.getAccessToken().getJwtToken();
        const decodedToken = jwtDecode(accessToken);
        console.log("accessToken :>> ", accessToken);
        console.log("decodedToken :>> ", decodedToken);
        console.log("decodedToken :>> ", decodedToken.sub);
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('userId', decodedToken.sub);
        localStorage.setItem('tk', accessToken);


       // setToken(accessToken);
     //   setAuthenticated(true);
        console.log("onSucess :>> ", data);
       // console.log("tk :>> ", data.idToken.jwtToken);
        localStorage.setItem("tk", data.idToken.jwtToken);
        
        history.push("/IngresoConfa");
      },
      onFailure: (data) => {
        setRespuestaLogin(" Incorrect username or password.");
        console.log("onFailure :>> ", data);
       
      },
      newPasswordRequired: (data) => {
        console.log("newPasswordRequired :>> ", data);
        setRespuestaLogin(" Incorrect username or password...");
      },
    });
  };
 

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <br />
        <label htmlFor="email">
          Email
          <input
            type="textarea"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="textarea"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <input type="submit" name="Login" value="Login" />
        <label><h1>{respuestaLogin}</h1></label>


      </form>



    </div>
  );
};

export default Login;
