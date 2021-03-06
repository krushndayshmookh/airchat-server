const Notice = require("../models/notice");
const moment = require("moment");

// CREATE NOTICE
exports.notice_create_post = (req, res) => {
  let newNotice = new Notice({
    from: req.body.from,
    title: req.body.title,
    body: req.body.body,
    date: new moment()
  });

  newNotice.save(err => {
    if (err) return res.status(500).send(err);
    return res.render("app/notices/index", { notices: newNotice });
  });
};

// GET ALL NOTICES
exports.notices_get = (req, res) => {
  Notice.find({})
    .populate("from")
    .exec((err, result) => {
      if (err) return res.status(500).send(err);

      if (result) return res.send(result);

      return res.send(false);
    });
};

// GET NOTICE BY ID
exports.notice_get = (req, res) => {
  Notice.findById(req.params.id).exec((err, result) => {
    if (err) return res.status(500).send(err);

    if (result) return res.send(result);

    return res.send(false);
  });
};

// DELETE ALL NOTICES
exports.notices_delete_all_get = (req, res) => {
  Notice.deleteMany({}).exec((err, result) => {
    if (err) return res.status(500).send(err);

    if (result) return res.send(result);

    return res.send(false);
  });
};

// DELETE NOTICE BY ID
exports.notice_delete_post = (req, res) => {
  Notice.findByIdAndDelete(req.params.id).exec((err, result) => {
    if (err) return res.status(500).send(err);

    if (result) return res.send(result);

    return res.send(false);
  });
};

// Application -----

// VIEW ALL NOTICES
exports.notices_view_get = (req, res) => {
  Notice.find({}).exec((err, result) => {
    if (err) return res.status(500).send(err);

    if (result) return res.render("app/notices/index", { notices: result });

    return res.send(false);
  });
};
