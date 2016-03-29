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
  })
  .then( result => {
    return window.gapi.client.load('drive', 'v3')
      .then( ( ) => result );
  });
};

export const updateDocMeta = (id, appDataId) => {
  return window.gapi.client.drive.files.update({
    fileId: id,
    fields: 'appProperties,modifiedTime,name,id',
    appProperties: {
      lastModifiedAt: (new Date( )).toISOString( ),
      appDataId: appDataId.toString( )
    }
  });
};

export const getById = id => {
  return window.gapi.client.drive.files.get({
    spaces: ['drive'],
    fileId: id,
    fields: 'appProperties,modifiedTime,name,id'
  });
};

export const searchDocsByName = searchTerm => {
  let query =
    "mimeType = 'application/vnd.google-apps.document'";
  if(searchTerm)
    query += ` and name contains '${searchTerm}'`;
  return window.gapi.client.drive.files.list({
    q: query,
    fields: 'files(id, name)',
    spaces: ['drive'],
    pageSize: 20
  });
};

export const exportAsHtml = id => {
  return window.gapi.client.drive.files.export({
    fileId: id,
    mimeType: 'text/html'
  });
};

export const saveAppData = appState => {
  const boundary = '-------314159265358979323846';
  const delimiter = `\r\n--${boundary}\r\n`;
  const contentType = 'application/octet-stream';
  const metadata = {
    name: 'voutre.json',
    mimeType: contentType,
    parents: ['appDataFolder']
  };
  const multipart = [{
    'Content-Type': 'application/json',
    body: JSON.stringify(metadata)
  }, {
    'Content-Type': 'application/json',
    body: JSON.stringify(appState)
  }];

  const multipartRequestBody =`
    ${delimiter}
    Content-Type: application/json\r\n\r\n
    ${JSON.stringify(metadata)}
    ${delimiter}
    Content-Type: ${contentType} \r\n
    \r\n
    ${JSON.stringify(appState)}
    \r\n--${boundary}--`;


  return window.gapi.client.request({
    path: "/upload/drive/v3/files",
    method: 'POST',
    params: {'uploadType': 'multipart', alt: 'json'},
    headers: {
      'Content-Type': `multipart/mixed; boundary="${boundary}"`
    },
    body: multipart
  });
};

export const getAppData = id => {
  return window.gapi.client.drive.files.get({
    spaces: ['appDataFolder'],
    fileId: id
  });
};

