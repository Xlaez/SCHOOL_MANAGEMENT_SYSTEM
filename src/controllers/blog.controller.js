const { Blog } = require("../modules/app.model");

const fetchBlogArticles = async (req, res) => {
  const articles = await Blog.find().sort({
    timestamps: "desc",
  });
  try {
    if (articles === null)
      return res
        .status(400)
        .json({ message: "Ooops, they arent any articles to display" });
    return res.status(200).json({ articles: articles });
  } catch (err) {
    return res.status(400).json(err);
  }
};

const getSingleBloagArticle = async (req, res) => {
  const { id } = req.params;
  try {
    const article = await Blog.findOne({ _id: id });
    if (article === null)
      return res.status(400).json({ message: "Sorry can't find this article" });
    return res.status(200).json({ article: article });
  } catch (err) {
    return res.status(400).json(err);
  }
};

const getUserArticle = (req, res) => {
  const article = Blog.find({ userId: req.userId }).catch((err) => {
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
  const userId = req.params.userId;
  var articles = new Blog({
    ...body,
    userId: userId,
  });
  articles = await articles.save();
  try {
    return res.status(201).json({ articles: articles });
  } catch (err) {
    return res.status(400).json(err);
  }
};

const editArticle = async (req, res) => {
  const body = req.body;
  const { id } = req.params;
  const image = req.file;

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
