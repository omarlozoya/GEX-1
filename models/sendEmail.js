//By Roni
//Using SendGrid as our email service
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
console.log('Base URL = ' +  process.env.BASE_URL);
//Function that will take in a seller, and email them their token
//Used Upon user registration to confirm email
module.exports.sellerSendVerificationEmail = function(user, callback){
  const msg = {
    to: user.email,
    from: 'do_not_reply@requiren.com',
    fromname: 'Requiren',
    templateId: 'd-479988c021f8483ab911fe7222a9c253',
    dynamic_template_data: {
      name: user.first_name,
      tokenID: process.env.BASE_URL + '/postactivation/' + user.confirmationToken,
    },
  };
  sgMail.send(msg).then(() => {
  }).catch((error) => {
    console.log('error', error);
  });
}

//Function that will take in a seller, and email them account verifcation completed
//Used Upon user has activated their email
module.exports.sellerEmailVerified = function(user, callback){
  const msg = {
    to: user.email,
    from: 'do_not_reply@requiren.com',
    fromname: 'Requiren',
    templateId: 'd-48ecbc2363a1462985a1e8e5278b39fb',
    dynamic_template_data: {
      name: user.first_name,
    },
  };
  sgMail.send(msg).then(() => {
  }).catch((error) => {
    console.log('error', error);
  });
}

//Function that will take in a seller, and request ID then email applicable sellers with a link to the request
//Used Upon buyer submitting a new request
module.exports.NotifySellerNewRequest= function(seller, request, callback){
  const msg = {
    to: seller.email,
    from: 'do_not_reply@requiren.com',
    fromname: 'Requiren',
    templateId: 'd-33099325b30c4edc940590551c708f87',
    dynamic_template_data: {
      name: seller.first_name,
      requestTitle: request.Title
    },
  };
  //console.log('Sent Notification to seller ' + seller.email + ' With Request ' + request._id);
  
  sgMail.send(msg).then(() => {
  }).catch((error) => {
    console.log('error', error);
  });
}

//Function that will take in a buyer, and email them their token
//Used Upon user registration to confirm email
module.exports.buyerSendVerificationEmail = function(user, callback){
  const msg = {
    to: user.email,
    from: 'do_not_reply@requiren.com',
    fromname: 'Requiren',
    templateId: 'd-7cf04e6e25e94052bb05d77abaa3ec37',
    dynamic_template_data: {
      name: user.first_name,
      tokenID: process.env.BASE_URL + '/postactivation/' + user.confirmationToken,
    },
  };
  sgMail.send(msg).then(() => {
  }).catch((error) => {
    console.log('error', error);
  });
}

//Function that will take in a buyer, and email them account verifcation completed
//Used Upon user has activated their email
module.exports.buyerEmailVerified = function(user, callback){
  const msg = {
    to: user.email,
    from: 'do_not_reply@requiren.com',
    fromname: 'Requiren',
    templateId: 'd-519aad8cef944b698a9bf2c77b435852',
    dynamic_template_data: {
      name: user.first_name,
    },
  };
  sgMail.send(msg).then(() => {
  }).catch((error) => {
    console.log('error', error);
  });
}

//Function that will take in a buyer, and request then email applicable buyer with a link to the request
//Used Upon buyer submitting a new request
module.exports.NotifyBuyerNewOffer= function(buyer, request, callback){
  const msg = {
    to: buyer.email,
    from: 'do_not_reply@requiren.com',
    fromname: 'Requiren',
    templateId: 'd-33099325b30c4edc940590551c708f87',
    dynamic_template_data: {
      name: buyer.first_name,
      requestTitle: request.Title,
      requestID : process.env.BASE_URL + '/request/' + requestID,
    },
  };
  //console.log('Sent Notification to buyer ' + buyer.email + ' With Request ' + request._id);
  
  sgMail.send(msg).then(() => {
  }).catch((error) => {
    console.log('error', error);
  });
}

//Function that will take in a USER, and email them their PASSWORD reset token
module.exports.resetEmail = function(user, callback){
  var type;
  if(user.account_type == 1) { type = 'seller'}
  else if(user.account_type == 0) { type = 'buyer'}
  const msg = {
    to: user.email,
    from: 'do_not_reply@requiren.com',
    fromname: 'Requiren',
    templateId: 'd-4d5092053d3f4fa8b99a8902dc7fa88f',
    dynamic_template_data: {
      name: user.first_name,
      tokenID: process.env.BASE_URL + '/reset?' + type+ '=' +user.resetPasswordToken,
    },
  };
  sgMail.send(msg).then(() => {
  }).catch((error) => {
    console.log('error', error);
  });
}

//Function that will take in a user, and email them that their password has changed
module.exports.passwordChanged = function(user, callback){
  const msg = {
    to: user.email,
    from: 'do_not_reply@requiren.com',
    fromname: 'Requiren',
    templateId: 'd-92cfc5c3ec0f44c5b664d9777639bc16',
    dynamic_template_data: {
      name: user.first_name,
    },
  };
  sgMail.send(msg).then(() => {
  }).catch((error) => {
    console.log('error', error);
  });
}
