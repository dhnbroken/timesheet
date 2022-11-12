export function authHeader () {
  const userStr = localStorage.getItem('user');
  let user = {
    result: {
      accessToken: ''
    }
  };
  if (userStr) { user = JSON.parse(userStr); }

  if (user && user.result.accessToken) {
    return { Authorization: 'Bearer ' + user.result.accessToken };
  } else {
    return { Authorization: '' };
  }
}
