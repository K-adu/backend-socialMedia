const hbs = require('hbs');
const path = require('path')
// Setup function to set the view engine and views directory
function setup(app) {


  app.set('view engine', 'hbs');
  app.set('views', __dirname + '/views');


  hbs.registerHelper('content', function (name, options) {
    if (!this._sections) {
      this._sections = {};
    }
    this._sections[name] = options.fn(this);
    return null;
  });


  hbs.registerPartials(path.join(__dirname, 'views/partials'));
  hbs.rei
  // Define homepage route
  app.get('/', (req, res) => {
    res.render('home');
  });

  //login page
  app.get('/login', (req, res) => {
    res.render('login')
  })


  //signup page
  app.get('/signup', (req, res) => {
    res.render('signup')
  })





}

module.exports = { setup }; // Export the setup function


