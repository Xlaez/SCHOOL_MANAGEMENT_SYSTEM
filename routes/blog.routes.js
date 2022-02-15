const { Router } = require("express");
const {
  fetchBlogArticles,
  getSingleBloagArticle,
  createArticle,
  getUserArticle,
  editArticle,
  deleteArticle,
} = require("../src/controllers/blog.controller");

const router = Router();

router.get("/", fetchBlogArticles);
router.get("/:id", getSingleBloagArticle);
router.get("/:userId", getUserArticle);
router.post("/", createArticle);
router.put("/:id", editArticle);
router.delete("/:id", deleteArticle);

module.exports.blogRouter = router;
