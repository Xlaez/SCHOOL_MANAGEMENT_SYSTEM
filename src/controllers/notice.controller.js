const { Notice } = require("../modules/app.model");

const getNotice = (req, res) => {
  Notice.find()
    .sort({
      createdAt: "desc"
    })
    .then((notice) => {
      if (notice === null)
        return res.status(400).send("Oooops, no news to display");
      return res.status(200).json({
        messsage: "Notice successfully fetched form db",
        data: notice,
      });
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

const getSingleNotice = (req, res) => {
  const { id } = req.params;
  Notice.findById(id)
    .then((notice) => {
      if (notice === null)
        return res.status(400).send("Oooops, no news to display");
      return res.status(200).json({
        messsage: "Successfully gotten a single notice",
        data: notice,
      });
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

const editNotice = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  if (!id)
    return res.status(400).json({ messsage: "This notice id doesn't exist!" });
  await Notice.findByIdAndUpdate(id, body);
  try {
    return res.status(200).json({ messsage: "Successfully updated notice!" });
  } catch (err) {
    return res.status(400).json(err);
  }
};

const deleteNotice = async (req, res) => {
  await Notice.findByIdAndDelete(req.params.id);
  try {
    return res.status(201).json({ message: "Notice successfully deleted" });
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports = {
  getNotice,
  getSingleNotice,
  editNotice,
  deleteNotice,
};
