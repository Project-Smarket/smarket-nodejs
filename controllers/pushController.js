var admin = require("firebase-admin");
var serviceAccount = require('../config/smarket-6c5d1-firebase-adminsdk-pa9i0-f3d30d4ba8.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://smarket-6c5d1.firebaseio.com"
});

exports.sendPush = (req, res) => {

  var pushToken = req.body.token;
  
  // 보낼 메시지를 작성하는 부분 입니다.
  var message = {

    notification: {
      title: '포그라운드 메시지',
      body: '푸시알람입니다.'
    },
    data: {
      score: '850',
      time: '2:45'
    },
    token: pushToken
  
  };
  
  admin.messaging().send(message)
    .then((response) => {
      // Response is a message ID string.
      console.log('푸시 메세지 수신 성공 : ', response);
    })
    .catch((error) => {
      console.log('푸시 메세지 수신 중 에러 발생', error);
    });
}


exports.receiveToken = (req, res) => {
  var pushToken = req.body.token;
  console.log(pushToken);
}