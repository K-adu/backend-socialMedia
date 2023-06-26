const hbs = require('hbs');

// Setup function to set the view engine and views directory
function setup(app) {



  app.set('view engine', 'hbs');
  app.set('views', __dirname + '/views');

  // Define homepage route
  app.get('/', (req, res) => {
    res.render('homepage');
  });

  //login page
  app.get('/users/login', (req, res) => {
    res.render('auth/login')
  })


  //signup page
  app.get('/users/signup', (req, res) => {
    res.render('auth/signup')
  })





}

module.exports = { setup }; // Export the setup function
