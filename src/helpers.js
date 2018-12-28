export const handleResponse = (response) => {
  return response.json().then(json => {
    return response.ok ? json : Promise.reject(json);
  });
}

export const checkStatus = (response) => {
  // raises an error in case response status is not a success
  if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
      return response
  } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
  }
}

const EMAIL_REGEX = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;

export const validateEmail = (email) => {
  return EMAIL_REGEX.test(email);
}


export const validateField = (input, type) => {
  switch(type) { 
    case "email": { 
      return EMAIL_REGEX.test(input);
    } 
    case "password": { 
      return PASSWORD_REGEX.test(input);
    } 
  } 
}
