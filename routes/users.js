var express = require('express');
var router = express.Router();
const UserControl = require('./controllers/user.control')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/protected', UserControl.getProtected)

router.post('/signup', UserControl.signUp)

module.exports = router;
