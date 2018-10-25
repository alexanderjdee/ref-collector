const router = require("express").Router();
const User = require('../../models/user');
const UserSession = require('../../models/userSession');

/*
* Sign up
*/
router.post('/signup', (req, res, next) => {
  const { body } = req;
  const { password } = body;
  let { username } = body;
  if (!username) {
    return res.send({
      success: false,
      message: 'Error: Username cannot be blank.'
    });
  }
  if (!password) {
    return res.send({
      success: false,
      message: 'Error: Password cannot be blank.'
    });
  }
  username = username.toLowerCase();
  username = username.trim();
  
  // Steps:
  // 1. Verify username doesn't exist
  // 2. Save
  User.find({
    username: username
  }, (err, previousUsers) => {
    if (err) {
      return res.send({
        success: false,
        message: 'Error: Server error'
      });
    } else if (previousUsers.length > 0) {
      return res.send({
        success: false,
        message: 'Error: Account already exist.'
      });
    }
    
    // Save the new user
    const newUser = new User();
    newUser.username = username;
    newUser.password = newUser.generateHash(password);
    newUser.save((err, user) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }
      return res.send({
        success: true,
        message: 'Signed up'
      });
    });
  });
}); // end of sign up endpoint

/*
* Sign in
*/
router.post('/signin', (req, res, next) => {
  const { body } = req;
  const { password } = body;
  let { username } = body;
  if (!username) {
    return res.send({
      success: false,
      message: 'Error: Username cannot be blank.'
    });
  }
  if (!password) {
    return res.send({
      success: false,
      message: 'Error: Password cannot be blank.'
    });
  }

  username = username.toLowerCase();
  username = username.trim();

  User.find({ username: username }, (err, users) => {
    if(err) {
      return res.send({
        success: false,
        message: 'Error: server error'
      });
    }
    if(users.length != 1) {
      return res.send({
        success: false,
        message: 'Error: Invalid'
      });
    }

    const user = users[0];
    if(!user.validPassword(password)) {
      return res.send({
        success: false,
        message: 'Error: Invalid Password'
      });
    }

    const newUserSession = new UserSession();
    newUserSession.userId = user._id;
    newUserSession.save((err, doc) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }
      return res.send({
        success: true,
        message: 'Valid sign in',
        token: doc._id
      });
    });
  });
});

/*
* Verify
*/
router.get('/verify', (req, res, next) => {
  //Get the token
  const { query } = req;
  const { token } = query;

  //Verify the token is unique
  UserSession.find({
    _id : token,
    isDeleted: false
  }, (err, sessions) => {
    if(err) {
      return res.send({
        success: false,
        message: 'Error: Server error'
      });
    }

    if(sessions.length != 1) {
      return res.send({
        success: false,
        message: 'Error: Invalid session'
      });
    } else {
      return res.send({
        success: true,
        message: 'Session is valid'
      });
    }
  });
});

/*
* Log out
*/
router.get('/logout', (req, res, next) => {
//Get the token
const { query } = req;
const { token } = query;

//Verify the token is unique
UserSession.findOneAndUpdate({
  _id : token,
  isDeleted: false
}, {
  $set:{isDeleted: true}
}, null, (err, sessions) => {
  if(err) {
    return res.send({
      success: false,
      message: 'Error: Server error'
    });
  }

  return res.send({
    success: true,
    message: 'Session is logged out'
  });
});
});

module.exports = router;