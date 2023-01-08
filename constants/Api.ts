// import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
// import {navigate} from '../App';
// import {SCREENS} from '../common';
// import Router from "next/dist/server/router";
import Router from 'next/router';
// import axios from './interceptor';
import qs from 'qs';
import { differenceInSeconds } from 'date-fns';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const _instance = axios.create({
  baseURL: BASE_URL,
});

// const getToken = async () => {
//   var data = qs.stringify({
//     grant_type: "client_credentials",
//     client_id: "48978cfe",
//     client_secret: "c7aca2ae3850eeb873aa9a0f6035f87b",
//     scope: "openid",
//   });

//   const response = await axios.post(
//     "https://keycloak-edge-redhat-rhmi-user-sso.apps.aosmith-prod.hd1m.p1.openshiftapps.com/auth/realms/aosmith-dev/protocol/openid-connect/token",
//     data
//   );
//   console.log(response.data.access_token);
//   localStorage.setItem("token", response.data.access_token);
//   localStorage.setItem("token_creation_time", new Date().toJSON());
//   return response.data.access_token;
// };

// Add a request interceptor
_instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    let token = localStorage.getItem('token');
    let token_creation_time = localStorage.getItem('token_creation_time');
    config.headers = {
      ...config.headers,
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${
      //   (token_creation_time &&
      //     differenceInSeconds(new Date(), new Date(token_creation_time)) >
      //       295) ||
      //   !token
      //     ? getToken()
      //     : token
      // }`,
      ApiKey: '7a7a981957491155b8d7a55868692e4c',
    };
    // }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.data.status === 401) {
      Router.push('/sign-in');
    }
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // console.log(
    //   "line 49",
    //   error.response.data,
    //   error.response.data === "Authentication failed"
    // );
    return Promise.reject(error);
  }
);

// _instance.interceptors.request.use(
//   (config) => {
//     //TODO: use a Global, Static variable for userToken
//     return AsyncStorage.getItem('userToken').then((token) => {
//       if (token) {
//         // console.log('token', token);
//         let Authorization = 'Bearer ' + token;
//         config.headers = {
//           ...config.headers,
//           Authorization,
//         };
//       } else {
//         console.log('No token');
//       }
//       return config;
//     });

//     // return config;
//   },
//   (error) => {
//     console.log('interceptor', error);
//     return Promise.reject(error);
//   },
// );

// _instance.interceptors.response.use(undefined, (error) => {
//   let status, data;
//   if (error) {
//     if (error.response) {
//       if (error.response.status) {
//         if (error.response.status === 401) {
//           navigate(SCREENS.APP.FORCE_LOGOUT, {});
//         }
//         status = error.response.status;
//         data = error.response.data;
//       }
//       // console.log(error.response.status);
//       // console.log(JSON.stringify(error.response));
//     }
//   }

//   return Promise.reject({status, data});
// });

export { _instance as API, BASE_URL };
