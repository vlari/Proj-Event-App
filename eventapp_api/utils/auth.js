
export const getUserToken = (req) => {
  let userToken;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    userToken = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.userToken) {
    // If using cookies
    userToken = req.cookies.userToken;
  }

  return userToken;
};
