import {API_URL} from "../config";

export default class AuthService {
    // Initializing important variables
    constructor() {
      //this.domain = domain || 'http://localhost:8080' // API server domain
      this.fetch = this.fetch.bind(this) // React binding stuff
      this.login = this.login.bind(this)
      this.getProfile = this.getProfile.bind(this)
    }

    login(email, password) {
      // Get a token from api server using the fetch api
      return this.fetch(`${API_URL}/oauth/token`, {
          method: 'POST',
          body: JSON.stringify({
              email: email,
              password: password,
              grant_type: "password"
          })
      }).then(res => {
          this.setToken(res.access_token, res.created_at + res.expires_in) // Setting the token in localStorage
          return Promise.resolve(res);
      })
    }

    loggedIn() {
      // Checks if there is a saved token and it's still valid
      const token = this.getToken() // GEtting token from localstorage
      return !!token && !this.isTokenExpired(token) // handwaiving here
    }

    isTokenExpired(token) {
      try {
          //const decoded = jwt_decode(token);
          if (token.expiration < Date.now() / 1000) { // Checking if token is expired. N
              return true;
          }
          else
              return false;
      }
      catch (err) {
          return false;
      }
    }

    setToken(idToken, expiration) {
      // Saves user token to localStorage
      localStorage.setItem('id_token', idToken)
      localStorage.setItem('token_exp', expiration)
    }

    getToken() {
      // Retrieves the user token from localStorage
      return {token: localStorage.getItem('id_token'), expiration: localStorage.getItem('token_exp')}
    }

    logout() {
      // Clear user token and profile data from localStorage
      localStorage.removeItem('id_token');
      localStorage.removeItem('token_exp');
    }

    getProfile() {
      // Using jwt-decode npm package to decode the token
      return this.getToken();
    }


    fetch(url, options) {
      // performs api calls sending the required authentication headers
      const headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }

      // Setting Authorization header
      // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
      if (this.loggedIn()) {
          headers['Authorization'] = 'Bearer ' + this.getToken()
      }

      return fetch(url, {
          headers,
          ...options
      })
          .then(this._checkStatus)
          .then(response => response.json())
    }

    _checkStatus(response) {
      // raises an error in case response status is not a success
      if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
          return response
      } else {
          var error = new Error(response.statusText)
          error.response = response
          throw error
      }
    }
}