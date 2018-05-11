//*******************************************************
//		                AUTH ROUTES
//*******************************************************

const passport = require('passport');

module.exports = (app) => {
  app.get(
  	'/auth/google',
  	passport.authenticate('google', {
  		scope: ['profile', 'email']
  	})
  );

  app.get('/auth/google/callback', passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
    }
  );

  app.get('/api/logout', (req, res) => {
    // The function '.logout()' is automatically attached to the request
    // by 'Passport'
    req.logout();
    // res.send(req.user);
    res.redirect('/')
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
}
