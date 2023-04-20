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


const userPool = new CognitoUserPool({
  UserPoolId: 'us-east-1_MQwendKCy',
  ClientId: '7fh5usiukn07fht43mv3hp35o0'
});

const signInWithGoogle = (googleUser) => {
  console.log('signInWithGoogle :>> ', googleUser);
  // Autenticación con Google exitosa, se obtiene el token de acceso.
  const idToken = googleUser.getAuthResponse().id_token;

  const authData = {
    IdToken: idToken,
  };

  const authDetails = new AuthenticationDetails(authData);
  
  const userData = {
    Username: 'google-' + googleUser.getBasicProfile().getId(),
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);

  cognitoUser.authenticateUser(authDetails, {
    onSuccess: (result) => {
      console.log(result);
      // Inicio de sesión con Cognito exitoso.
    },
    onFailure: (error) => {
      console.log(error);
    }
  });
};


  const LoginG = () => {
    const onSuccess = (googleUser) => {
      console.log('onSuccess :>> ', onSuccess);
      signInWithGoogle(googleUser);
    };
  
    const onFailure = (error) => {
      console.log(error);
    };
  
    return (
      <div>
        <GoogleLogin
          clientId="261980996205-nm2bsterdg3vqdp00qqaan8mho4tvl5t.apps.googleusercontent.com"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
        />
      </div>
    );
  };

export default LoginG;
