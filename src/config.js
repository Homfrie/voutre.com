const config = {
  apiUrl: process.env.NODE_ENV === 'development' ? 
    'http://api.voutre.llc/api/v1' : '',
  facebook: {
    clientId: 963457067098458,
    scope: 'email,public_profile,user_friends'
  },
  oauthRedirectUrl: process.env.NODE_ENV === 'development' ? 
    'http://client.voutre.llc/' : 'http://www.voutre.com/',
  google: {
    clientId:  process.env.GOOGLE_CLIENT || "232198205022-3415d0gkl1j915dfkp1fs62ggleft6fh.apps.googleusercontent.com",
    scope: [
      "https://www.googleapis.com/auth/drive.readonly", 
      "https://www.googleapis.com/auth/drive.appdata", 
      "https://www.googleapis.com/auth/drive.metadata"]
  }
};

export default config;
