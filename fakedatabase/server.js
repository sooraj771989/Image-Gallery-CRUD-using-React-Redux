const fs = require('fs')
const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs");
const server = jsonServer.create()
const router = jsonServer.router('./fakedatabase/db.json')
const userdb = JSON.parse(fs.readFileSync('./fakedatabase/users.json', 'UTF-8'))
const postdb = JSON.parse(fs.readFileSync('./fakedatabase/db.json', 'UTF-8'))
const passport = require("passport");
server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
server.use(jsonServer.defaults());
const SECRET_KEY = '123456789'
const expiresIn = '1h'
// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
// Create a token from a payload 
function createToken(payload){
  return jwt.sign(payload, SECRET_KEY, {expiresIn})
}
// Verify the token 
function verifyToken(token){
  return  jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ?  decode : err)
}
// Check if the user exists in database
function isAuthenticated({name, email, password}){
    console.log(name, email,password);
    return userdb.users.findIndex(user => user.name === name && user.email === email && user.password === password) !== -1
}
function isLoginAuthenticated({email}){
  console.log(email);
  return userdb.users.findIndex(user => user.email === email) !== -1
}
// Register New User
server.post('/auth/register', (req, res) => {
  console.log("register endpoint called; request body:");
  console.log(req.body);
  const name = req.body.name;
  const email = req.body.email;
  var password = req.body.password;
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  if(isAuthenticated({name, email, password}) === true) {
    return res.status(400).json({ email: "Email already exists" });
  }  
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) throw err;
        password = hash;
        fs.readFile("./users.json", (err, data) => {  
        if (err) {
        const status = 401
        const message = err
        res.status(status).json({status, message})
        return
        };
          // Get current users data
          var data = JSON.parse(data.toString());
          // Get the id of last user
          var last_item_id = data.users[data.users.length-1].id;
          //Add new user
          data.users.push({id: last_item_id + 1, name: name, email: email, password: password}); //add some data
          var writeData = fs.writeFile("./users.json", JSON.stringify(data), (err, result) => {  // WRITE
              if (err) {
                const status = 401
                const message = err
                res.status(status).json({status, message})
                return
              }
          });
      });
    });
});
// Create token for new user
  const access_token = createToken({email, password})
  console.log("Access Token:" + access_token);
  res.status(200).json(access_token)
})
// Login to one of the users from ./users.json
server.post('/auth/login', (req, res) => {
  console.log("login endpoint called; request body:");
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  if (isLoginAuthenticated({email}) === false) {
    const status = 401
    const message = 'Incorrect email or password'
    return res.status(404).json({ emailnotfound: "Email not found" });
  }
     let obj = userdb.users.find(obj => obj.email == email);
       userpassword = obj.password;
       console.log(obj.password);
    bcrypt.compare(password, userpassword).then(isMatch => {
    if (isMatch) {
      // User matched
      // Create JWT Payload
      console.log("sa");
      const payload = {
        id: user.id,
        name: user.name
      };
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
})
server.get(
  "/currentuser",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);
server.get("/auth/posts",
  (req, res) => {
    res.json(postdb.posts);
    // console.log( res.json(router));
    // res.json(router)
  }
);
server.use(/^(?!\/auth).*$/,  (req, res, next) => {
  if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    const status = 401
    const message = 'Error in authorization format'
    res.status(status).json({status, message})
    return
  }
  try {
    let verifyTokenResult;
     verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1]);
     if (verifyTokenResult instanceof Error) {
       const status = 401
       const message = 'Access token not provided'
       res.status(status).json({status, message})
       return
     }
     next()
  } catch (err) {
    const status = 401
    const message = 'Error access_token is revoked'
    res.status(status).json({status, message})
  }
})
server.use(router)
server.listen(8000, () => {
  console.log('Run Auth API Server')
})