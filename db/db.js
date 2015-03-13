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

var setFullTimeEmailAMarkdown = exports.setFullTimeEmailAMarkdown = function(markdown){
  emailStore.update({
    fullTime: { 
      emaila: { 
        markdown: markdown
      }
    }
  }, onComplete);
}

var setFullTimeEmailAHTML = exports.setFullTimeEmailAHTML = function(html){
  emailStore.update({
    fullTime: { 
      emaila: { 
        html: html
      }
    }
  }, onComplete);
}

var setFullTimeEmailBMarkdown = exports.setFullTimeEmailBMarkdown = function(markdown){
  emailStore.update({
    fullTime: { 
      emailb: { 
        markdown: markdown
      }
    }
  }, onComplete);
}

var setFullTimeEmailBHTML = exports.setFullTimeEmailBHTML = function(htmn){
  emailStore.update({
    fullTime: { 
      emailb: { 
        html: html
      }
    }
  }, onComplete);
}

var setPartTimeEmailAMarkdown = exports.setPartTimeEmailAMarkdown = function(markdown){
  emailStore.update({
    partTime: { 
      emaila: { 
        html: html
      }
    }
  }, onComplete);
}

var setPartTimeEmailAHTML = exports.setPartTimeEmailAHTML = function(html){
  emailStore.update({
    partTime: { 
      emaila: { 
        html: html
      }
    }
  }, onComplete);
}

var setPartTimeEmailBMarkdown = exports.setPartTimeEmailBMarkdown = function(markdown){
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