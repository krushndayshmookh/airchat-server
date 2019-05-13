const User = require("../models/user");
const Organization = require("../models/organization");

// API -----
// GET USER BY ID
exports.user_get = (req, res) => {
  User.findById(req.params.id)
    .populate("organization")
    .exec((err, result) => {
      if (err) return res.status(500).send(err);

      if (result) return res.render("app/user/trial", { result });

      return res.send("No record found for id " + req.params.id);
    });
};

// GET ALL USERS
exports.users_get = (req, res) => {
  User.find({}).exec((err, result) => {
    if (err) return res.status(500).send(err);

    if (result) return res.send(result);

    return res.send("No record found.");
  });
};

// CREATE POST
exports.user_create_post = (req, res) => {
  let newUser = new User({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    position: req.body.position,
    organization: req.body.organization
  });
  console.log(newUser);
  newUser.save(err => {
    if (err) return res.status(500).send(err);

    return res.render("app/user/useraddedstatus", { newUser });
  });
};

//Login
exports.user_login_post = (req, res) => {
  var oldUser = new User({
    username: req.body.username,
    password: req.body.password
  });
  console.log(oldUser);
  User.findById(req.params.id)
    .populate("organization")
    .exec((err, result) => {
      if (err) return res.status(500).send(err);

      if (result) return res.send("fpund");

      return res.send("No record found for id " + req.params.id);
    });
};

// DELETE ALL USERS
exports.users_delete_all_get = (req, res) => {
  User.deleteMany({}).exec((err, result) => {
    if (err) return res.status(500).send(err);

    if (result) return res.send(result);

    return res.send(false);
  });
};

// DELETE POST BY ID
exports.user_delete_post = (req, res) => {
  User.findByIdAndDelete(req.params.id).exec((err, result) => {
    if (err) return res.status(500).send(err);

    if (result) return res.send(result);

    return res.send(false);
  });
};

// Application -----

// VIEW ALL USERS
exports.users_view_get = (req, res) => {
  User.find({})
    .populate("organization")
    .exec((err, result) => {
      if (err) return res.status(500).send(err);

      if (result) return res.render("app/user/index", { users: result });

      return res.send("No record found.");
    });
};
// CREATE USER VIEW
exports.user_create_view_get = (req, res) => {
  Organization.find({}).exec((err, result) => {
    if (err) return res.status(500).send(err);

    if (result) return res.render("app/user/create", { organizations: result });

    return res.send("No record found.");
  });
  //- res.render('user/create')
};
