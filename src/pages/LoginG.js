import React, { useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import Login from './Login';


function LoginG() {  

  //261980996205-nm2bsterdg3vqdp00qqaan8mho4tvl5t.apps.googleusercontent.com
useEffect(() => {

  window.gapi.load('client:auth2', () => {
    window.gapi.client.init({
        clientId: '261980996205-nm2bsterdg3vqdp00qqaan8mho4tvl5t.apps.googleusercontent.com',
        plugin_name: "chat"
    })})

  // gapi.load('client:auth2', start);
    }, []);

  const onSuccess = response => {
  console.log('SUCCESS', response);
   };
  const onFailure = response => {
    console.log('FAILED', response);
    };
   const onLogoutSuccess = () => {
    console.log('SUCESS LOG OUT');
     };

    return (
    <div>
   <GoogleLogin
   clientId={'261980996205-nm2bsterdg3vqdp00qqaan8mho4tvl5t.apps.googleusercontent.com'}
  onSuccess={onSuccess}
  onFailure={onFailure}
  scope={'https://www.googleapis.com/auth/userinfo.email'}
 
  buttonText="Login"
  cookiePolicy={'single_host_origin'}
     />
 

    </div>
    );

}

export default LoginG;