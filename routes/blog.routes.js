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
router.post("/", [isAuth] ,createArticle);
router.put("/:id", [isAuth], editArticle);
router.delete("/:id",[isAuth] , deleteArticle);   

module.exports.blogRouter = router;
