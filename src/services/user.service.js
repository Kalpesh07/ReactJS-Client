export const userService = {
    login,
    logout,
    register
  };
   
  function login(username, password) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password
      })
    };
    
    return fetch(`https://jqhg599730.execute-api.ap-south-1.amazonaws.com/v1/auth/login`, requestOptions)
      .then(handleResponse)
      .then(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('user', JSON.stringify(user.user));
          return user;
        
      });
  }
   
  // remove user from local storage to log user out
  function logout() {
    localStorage.removeItem('user');
  }
   
  // register user request
  function register(user) {
  const requestOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(user)
  };
  return fetch(`http://localhost:3001/auth/register`, requestOptions).then(handleResponse);
  }
   
  function handleResponse(response) {
    return response.text().then(text => {
      const data = text && JSON.parse(text);
      console.log(data);
      if (!response.ok) {
        if (response.status === 401) {
          // auto logout if 401 response returned from api
          logout();
          // location.reload(true);
        }
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }else if(data.error === true){
        const error = (data && data.message);
        return Promise.reject(error);
      }
   
      return data;
    });
  }