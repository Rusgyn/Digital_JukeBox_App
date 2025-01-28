// helper functions

const isUserLoggedIn = (reqSession: any) => {
  return reqSession.loggedAdminUser?.id !== undefined;
}

export default isUserLoggedIn;