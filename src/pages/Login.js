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

/*
 useEffect(() => {
  window.gapi.load("auth2", () => {
    window.gapi.auth2
      .init({
        client_id: "261980996205-m4h16c4eus7auq03haj0v3rrjksqi38c.apps.googleusercontent.com",
      })
      .then((auth) => {
        const currentUser = auth.currentUser.get();
        if (currentUser) {
          console.log("Usuario autenticado:", currentUser.getBasicProfile());
        }
      });
  });
}, []);*/

const options = {
  scope: 'email profile',
  prompt: 'select_account'
};

/*const googleAuth = new GoogleAuth({
  clientId: '261980996205-hjhh2e8edvs51td1ks19jdgvhui60dh7.apps.googleusercontent.com'
});
const handleGoogleLogin = async () => {
  try {
    const response = await googleAuth.signIn();
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};*/
/*
const handleGoogleLogin = async (response) => {
  const { tokenId } = response;
  
  const authenticationData = {
    Token: tokenId
  };*/
 const handleGoogleLogin = (response) => {
 // window.gapi.auth2.getAuthInstance().signIn().then((googleUser) => {
  //  console.log("Usuario autenticado:", googleUser.getBasicProfile());
 // });

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
    const auth2 = window.gapi.auth2.getAuthInstance();
    const googleUser = await auth2.signIn();
    const accessToken = googleUser.getAuthResponse().id_token;
  
    const cognitoUser = new CognitoUser({
      Username: googleUser.getBasicProfile().getEmail(),
      Pool: userPool
    });
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
  }

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
      <GoogleLogin
        clientId="261980996205-nm2bsterdg3vqdp00qqaan8mho4tvl5t.apps.googleusercontent.com"
        onSuccess={handleGoogleLogin}
        onFailure={handleGoogleLogin}
      />
            <button onClick={handleGoogleSignIn}>Ingresar con Google ok</button>


    </div>
  );
};

export default Login;
