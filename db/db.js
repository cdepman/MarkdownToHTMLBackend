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
    console.log("Authenticated successfully with payload:", result.auth);
    console.log("Auth expires at:", new Date(result.expires * 1000));
  }
});

var onComplete = function(error) {
  if (error) {
    console.log('Synchronization failed');
  } else {
    console.log('Synchronization succeeded');
  }
};

var setFullTimeEmailA = exports.setFullTimeEmailA = function(text, html){
  emailStore.update({
    fullTime: { 
      emaila: { 
        text: text,
        html: html
      }
    }
  }, onComplete);
}

var setFullTimeEmailB = exports.setFullTimeEmailB = function(text, html){
  emailStore.update({
    fullTime: { 
      emailb: { 
        text: text,
        html: html
      }
    }
  }, onComplete);
}

var setPartTimeEmailA = exports.setPartTimeEmailA = function(text, html){
  emailStore.update({
    partTime: { 
      emaila: { 
        text: text,
        html: html
      }
    }
  }, onComplete);
}



var setPartTimeEmailB= exports.setPartTimeEmailB = function(text, html){
  emailStore.update({
    partTime: { 
      emailb: { 
        html: html
      }
    }
  }, onComplete);
}

var setPartTimeEmailBHTML = exports.setPartTimeEmailBHTML = function(html){
  emailStore.update({
    partTime: { 
      emailb: { 
        html: html
      }
    }
  }, callback);
}