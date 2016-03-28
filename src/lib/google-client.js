import config from '../config';

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
  console.info(appState);
  const resource = {
    'name': 'config.json',
    'mimeType': 'application/json'

    //'parents': [ 'appDataFolder']
  };
  const media = {
    mimeType: 'application/json',
    body: JSON.stringify(appState)
  };
  return window.gapi.client.drive.files.create({
    uploadType: 'media',
    resource,
    media,
    //parents: ['appDataFolder'],
    fields: 'id'
  });
};

export const getAppData = id => {

  return window.gapi.client.drive.files.get({
    spaces: ['appDataFolder'],
    fileId: id
  });
};

