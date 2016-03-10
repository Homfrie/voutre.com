import config from '../config';

export const loadScript = ( ) => {
  //Check if already loaded
  return new Promise((resolve, reject) => {
    //TODO add timeOut
    window.gapiAsyncInit = () => {
      resolve();
    };

    (((d, s, id) => {
      const element = d.getElementsByTagName(s)[0];
      const fjs = element;
      let js = element;
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = '//apis.google.com/js/client.js?onload=gapiAsyncInit';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'google-jssdk'));
  });
};

export const authorize = (immediate=false) => {
  return window.gapi.auth.authorize({
    client_id: config.google.clientId,
    scope: config.google.scope, 
    immediate: immediate 
  })
  .then( authResult => {
    if (!authResult || authResult.error)
      return Promise.reject(authResult.error);
    return authResult;
  });
};

export const searchDriveDocs = searchTerm => {
  return window.gapi.client.load('drive', 'v3')
  .then( ( ) => {
    let query =
      "mimeType = 'application/vnd.google-apps.document'";
    if(searchTerm)
      query += ` and name contains '${searchTerm}'`;
    return window.gapi.client.drive.files.list({
      q: query,
      fields: 'nextPageToken, files(id, name, webContentLink)',
      spaces: 'drive'
    });
  });
};
