const mongoose = require("mongoose");
const router = require("express").Router();

const Issue = mongoose.model("Issue");
const Article = mongoose.model("Article");

// router.post("/", (req, res, next) => {
//   const { body } = req;

//   if (!body.title) {
//     return res.status(422).json({
//       errors: {
//         title: "is required"
//       }
//     });
//   }

//   if (!body.author) {
//     return res.status(422).json({
//       errors: {
//         author: "is required"
//       }
//     });
//   }

//   if (!body.body) {
//     return res.status(422).json({
//       errors: {
//         body: "is required"
//       }
//     });
//   }

//   const finalArticle = new Articles(body);
//   return finalArticle
//     .save()
//     .then(() => res.json({ article: finalArticle.toJSON() }))
//     .catch(next);
// });

// CHANGE BELOW TO findByID()
// CREATE function that returns all articles in issue through find
// CREATE index on issue number for articles

// return most recent issue if at homepage
router.get("/", (req, res, next) => {
  return res.json(
    {
        issue: Issue.find()
    .sort({ createdAt: "descending" })
    .limit(1)
    .then(issue => res.json({ issue: issue.map(issue => issue.toJSON()) }))
    .catch(next)
});

// return issue for param
router.param("issueID", (req, res, next, issueID) => {
  return Issue.findById(issueID, (err, issue) => {
    if (err) {
      return res.sendStatus(404);
    } else if (issue) {
      req.issue = issue;
      return next();
    }
  }).catch(next);
});

// return issue
router.get("/:issueID", (req, res, next) => {
  return res.json({
    issue: req.issue.toJSON()
  });
});

// return all articles within issue
router.get("/:issueID/all", (req, res, next) => {

  return res.json({
    issue: 
    Issue.find()
    .sort({ createdAt: "descending" })
    .limit(1)
    .then(issue => res.json({ issue: issue.map(issue => issue.toJSON()) }))
    .catch(next)
});
});

// NEED AN INDEX BY ISSUE/ARTICLE
router.param("articleID", (req, res, next, articleID) => {
  return Article.findById(articleID, (err, article) => {
    if (err) {
      return res.sendStatus(404);
    } else if (article) {
      req.article = article;
      return next();
    }
  }).catch(next);
});

router.get("/:issueID/:articleID", (req, res, next) => {
  return res.json({
    article: req.article.toJSON()
  });
});

// router.patch("/:id", (req, res, next) => {
//   const { body } = req;

//   if (typeof body.title !== "undefined") {
//     req.article.title = body.title;
//   }

//   if (typeof body.author !== "undefined") {
//     req.article.author = body.author;
//   }

//   if (typeof body.body !== "undefined") {
//     req.article.body = body.body;
//   }

//   return req.article
//     .save()
//     .then(() => res.json({ article: req.article.toJSON() }))
//     .catch(next);
// });

// router.delete("/:id", (req, res, next) => {
//   return Articles.findByIdAndRemove(req.article._id)
//     .then(() => res.sendStatus(200))
//     .catch(next);
// });

module.exports = router;
