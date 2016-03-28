const config = {
  google: {
    clientId:  process.env.GOOGLE_CLIENT || "232198205022-3415d0gkl1j915dfkp1fs62ggleft6fh.apps.googleusercontent.com",
    scope: [
      "https://www.googleapis.com/auth/drive.readonly", 
      "https://www.googleapis.com/auth/drive.appdata", 
      "https://www.googleapis.com/auth/drive.metadata"]
  }
};

export default config;
