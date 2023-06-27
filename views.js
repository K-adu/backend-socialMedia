import hbs from 'hbs'
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Setup function to set the view engine and views directory
export function setup(app) {


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
  // Define homepage route
  app.get('/', (req, res) => {
    res.render('welcome');
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


