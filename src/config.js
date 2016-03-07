const config = {
  google: {
    clientId:  process.env.GOOGLE_CLIENT || "<CLIENT ID HERE>",
    scope: "https://www.googleapis.com/auth/drive"
  }
};

export default config;
