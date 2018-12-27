export const handleResponse = (response) => {
  return response.json().then(json => {
    return response.ok ? json : Promise.reject(json);
  });
}

export const validateEmail = (email) => {
  return (/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).test(email);
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