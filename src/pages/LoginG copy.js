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


const LoginG = () => {

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

 const handleGoogleLogin = (response) => {


 const { tokenId } = response;
  
  const authenticationData = {
    Token: tokenId
  };
  console.log(response);
};

 const responseGoogle = (response) => {
  console.log("response>"+JSON.stringify(response));
 // history.push("/IngresoConfa");
  console.log('responseGoogle :>> ', response);
  var profile = response.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  console.log(response);
};

const responseGoogleError = (error) => {

  console.log("responseGoogleError>"+JSON.stringify(error));
  history.push("/IngresoConfa");
};

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
  const userPool = new CognitoUserPool(poolData);

  async function handleGoogleSignIn() {

    const userPool = new CognitoUserPool(poolData);
    const auth2 = window.gapi.auth2.getAuthInstance();
    const googleUser = await auth2.signIn();
    const accessToken = googleUser.getAuthResponse().id_token;
    console.log("googleUser :>> ", googleUser);
      console.log("accessToken :>> ", accessToken);

    const cognitoUser = new CognitoUser({
      Username: googleUser.getBasicProfile().getEmail(),
      Pool: userPool
    });
    console.log("cognitoUser :>> ", cognitoUser);


    const authDetails = new AuthenticationDetails({
      Username: googleUser.getBasicProfile().getEmail(),
      Password: accessToken
    });
    cognitoUser.authenticateUser(authDetails, {
      onSuccess: function (result) {
        console.log('Usuario autenticado correctamente en AWS Cognito', result);
      },
      onFailure: function (err) {
        console.error(err);
      },
      newPasswordRequired: function () {},
      mfaRequired: function () {},
      customChallenge: function () {}
    });
    history.push("/IngresoConfa");
  }

  return (
    <div>
      <h1>Login</h1>
     
      <GoogleLogin
        clientId="261980996205-nm2bsterdg3vqdp00qqaan8mho4tvl5t.apps.googleusercontent.com"
        onSuccess={handleGoogleSignIn}
        onFailure={handleGoogleSignIn}
      />

<button onClick={handleGoogleSignIn}>Ingresar con Google ok</button>
           


    </div>
  );
};

export default LoginG;
