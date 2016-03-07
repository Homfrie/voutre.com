let instance = null;
import config from '../config';
class GoogleClient {
  constructor() {
    if(!instance) {
      instance = this;
      instance.isLoaded = false;
    }
    return instance;
  }
  load(callback) {
    this.addGAPIScript(callback);
  }
  addGAPIScript(callback) {
    if(this.isLoaded) {
      callback();
      return;
    }
    window.gapiAsyncInit = (e) => {
      this.isLoaded = true;
      callback(e);
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
  }
  authorize(onAuthSuccess, onAuthFailure, immediate=false) {
    window.gapi.auth.authorize({
      client_id: config.google.clientId,
      scope: config.google.scope, 
      immediate: immediate 
    }, this.onAuthorize.bind(this, onAuthSuccess, onAuthFailure));
  }
  onAuthorize(onAuthSuccess, onAuthFailure, e) {
    if(e.status && e.status.signed_in)
      onAuthSuccess(e);
    else
      onAuthFailure( );
  }
  searchDriveDocs(searchTerm) {
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
  }
}

export default GoogleClient;
