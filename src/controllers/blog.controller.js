const { cleanseData } = require("../../utils/cleansing");
const { Blog, Users } = require("../modules/app.model");

const fetchBlogArticles = (req, res) => {
  var currentPage = req.query.page || 1;
  var perPage = 3;
  let totalItems;
  Blog.find().countDocuments().then(
    count => {
      totalItems = count;
      return Blog.find().sort({
        createdAt: "desc",
      }).skip((currentPage - 1) * perPage).limit(
        perPage
      )
    })
    .then(
      articles => {

        if (articles === null)
          return res
            .status(400)
            .json({ message: "Ooops, they arent any articles to display" });

        return res.status(200).json({ status: true, articles: articles, totalItems: totalItems });
      })
    .catch(err => {
      return res.status(400).json(err);
    })
};

const getSingleBloagArticle = async (req, res) => {
  try {
    const article = await Blog.findOne({ _id: req.params.id });
    if (article === null)
      return res.status(400).json({ message: "Sorry can't find this article" });
    return res.status(200).json({ article: article });
  } catch (err) {
    return res.status(400).json(err);
  }
};

const getUserArticle = (req, res) => {
  const article = Blog.find({ userId: req.get("user-access") }).catch((err) => {
    return res.status(400).json(err);
  });
  if (article === null || !article)
    return res
      .status(400)
      .json({ message: "This user doesn't have any posts" });
  return res.status(200).json({ article: article, status: "Success" });
};

const createArticle = async (req, res) => {
  const body = req.body;
  const image = req.file;
  var re = /fuck/i;
  cleanseData(body.content, re)
  const user = await Users.findById(req.get("user-access"));
  const author = user.fullname;
  // if (author = null || "" || undefined)author = 'anonymous'; 
  var articles = new Blog({
    ...body,
    userId: req.get('user-access'),
    image: image.path,
    author: author
  });
  articles = await articles.save();
  try {
    return res.status(201).json({ status: true, articles: articles });
  } catch (err) {
    return res.status(400).json(err);
  }
};

const editArticle = async (req, res) => {
  const body = req.body;
  const { id } = req.params;
  if (!id)
    return res
      .status(400)
      .json({ message: "The article your trying to edit does not exist" });

  await Blog.findByIdAndUpdate(id, body);
  try {
    return res.status(200).json({ message: "The article has been updated" });
  } catch (err) {
    return res.status(400).json(err);
  }
};

const deleteArticle = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  try {
    return res.status(201).json({ message: "Successfully deleted Article" });
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports = {
  fetchBlogArticles,
  getSingleBloagArticle,
  getUserArticle,
  createArticle,
  editArticle,
  deleteArticle,
};
