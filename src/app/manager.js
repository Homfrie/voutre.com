/**
 * @param options {object}
 * @param options.canvasSelector
 * @public
 * @constructor
 **/

import _ from 'lodash';
import gapi from 'gapi';
import $ from 'jquery';
import fastclick from 'fastclick';

const CLIENT_ID = "232198205022-3415d0gkl1j915dfkp1fs62ggleft6fh.apps.googleusercontent.com";
const SCOPE = "https://www.googleapis.com/auth/drive";

class Manager {
  constructor( ) {
    gapi.auth.authorize({
      client_id: CLIENT_ID, 
      scope: SCOPE, 
      immediate: true
    }, this.onAuthorize.bind(this) )
    this.setElements( );
    this.addEvents( );
  }
  setElements( ) {
    this.$googleSignin = $('#google-signin');
  }
  addEvents( ) {
    this.$googleSignin.on('click', this.onAuthClick.bind(this));
  }
  onAuthorize( e ) {
    console.info( "OnAuthorize", e );
    console.info( e.status, e.status.signed_in );
    if (e.status && e.status.signed_in ) {
      this.$googleSignin.hide( );
      console.info( "LOADING DATA" );
      this.loadData( );
    } else {
      this.$googleSignin.show( );
    }
  }
  onAuthClick( ) {
    gapi.auth.authorize({
      client_id: CLIENT_ID, 
      scope: SCOPE, 
      immediate: false
    }, this.onAuthorize.bind(this) );
  }
  loadData( ) {
    console.info( "test" );
    gapi.client.load('drive', 'v3')
      .then( ( ) => {
        console.info( 111 );
        return gapi.client.drive.files.list({
          fields: 'nextPageToken, files(id, name)',
          spaces: 'drive'
        });
      } )
      .then( response => {
        console.info( response );
      } );
  }
}

 export default Manager;
