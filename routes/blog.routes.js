const { Router } = require("express");
const { grantAccess } = require("../middleware/_is_admin");
const { isAuth } = require("../middleware/_is_auth");
const {
  fetchBlogArticles,
  getSingleBloagArticle,
  createArticle,
  getUserArticle,
  editArticle,
  deleteArticle,
} = require("../src/controllers/blog.controller");

const router = Router();

router.get("/" ,fetchBlogArticles);
router.get("/:id",[isAuth] ,getSingleBloagArticle);
router.get("/", [isAuth], getUserArticle);
router.post("/",  createArticle);
router.put("/:id",  editArticle);
router.delete("/:id",  deleteArticle);

module.exports.blogRouter = router;
