var Firebase = require('firebase'); 
var schema = require('./schema')
var fireBaseConfig = require('../config.js').firebase;
var Promise = require('bluebird');

// set database
var emailStore = exports.db = new Firebase(fireBaseConfig.dbAddress);

// authorize with custom token
emailStore.authWithCustomToken(fireBaseConfig.AUTH_TOKEN, function(error, result) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully!");
  }
});

// create db sync result callback
var onComplete = function(error) {
  if (error) {
    console.log('Synchronization failed');
  } else {
    console.log('Synchronization succeeded');
  }
};

// db setters for each email
var setFullTimeEmailA = exports.setFullTimeEmailA = function(text, html){
  emailStore.child('/fullTime/emailA').update({ 
        text: text,
        html: html
      }, onComplete);
}

var setFullTimeEmailB = exports.setFullTimeEmailB = function(text, html){
  emailStore.child('/fullTime/emailB').update({ 
        text: text,
        html: html
      }, onComplete);
}

var setPartTimeEmailA = exports.setPartTimeEmailA = function(text, html){
  emailStore.child('/partTime/emailA').update({ 
        text: text,
        html: html
      }, onComplete);
}


var setPartTimeEmailB= exports.setPartTimeEmailB = function(text, html){
  emailStore.child('/partTime/emailB').update({ 
        text: text,
        html: html
      }, onComplete);
}
