const { Assignment } = require("../modules/app.model");

const fetchAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find().sort({
      desc: "timestamps",
    });
    return res.status(200).json({
      message: "Assignments have been successfully displayed",
      data: assignments,
    });
  } catch (err) {
    return res.status(400).json(err);
  }
};

const fetchSingleAssignment = (req, res) => {
  const { id } = req.params;
  Assignment.findById(id)
    .then((assignments) => {
      return res.status(200).json({
        message: `Successfully gotten ${assignments.title}.`,
        data: assignments,
      });
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

const editAssignment = async (req, res) => {
  const { id } = req.params;
  try {
    const assignment = await Assignment.findByIdAndUpdate(id, req.body);
    if (assignment === null) return res.status(400).send("This id isn't valid");
    return res.status(200).json({
      message: "Successfully edited and updated an assignment",
      data: assignment,
    });
  } catch (err) {
    return res.status(400).json(err);
  }
};

const deleteAssignment = async (req, res) => {
  try {
    await Assignment.findByIdAndDelete(req.params.id).catch((err) => {
      return res.status(400).json({
        messagae: "something went wrong while trying to delete this assignment",
      });
    });
    return res
      .status(200)
      .json({ messagae: "Successfully deleted this assignment" });
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports = {
  fetchAssignments,
  fetchSingleAssignment,
  editAssignment,
  deleteAssignment,
};
