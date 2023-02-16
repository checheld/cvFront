import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import store from './store/ConfigureStore';
// import { createUserManager, OidcProvider } from 'redux-oidc';

// const config = {
//   authority: "https://localhost:5001",
//   //authority: "https://identity-server-1.herokuapp.com",
//   client_id: "leviossacv",
//   redirect_uri: "http://localhost:3000/signin-oidc",
//   silent_redirect_uri: "http://localhost:3000/silent_renew",
//   post_logout_redirect_uri: "http://localhost:3000",
//   // redirect_uri: "https://levicvfrontapp.herokuapp.com/signin-oidc",
//   // silent_redirect_uri: "https://levicvfrontapp.herokuapp.com/silent_renew",
//   // post_logout_redirect_uri: "https://levicvfrontapp.herokuapp.com",
//   response_type: "code",
//   scope: "scope2",
//   client_secret: "99HlRwEKPV4a2+3v5oohMg==",
//   automaticSilentRenew: true,
//   filterProtocolClaims: true,
//   loadUserInfo: true
// }

// const userManager = createUserManager(config);

ReactDOM.render(
  <Provider store={store}>
    {/* <OidcProvider store={store} userManager={userManager}> */}
      <App />
    {/* </OidcProvider> */}
  </Provider>,
  document.getElementById('root')
);
