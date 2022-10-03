const Goal = require('../models/goalModel');

const getGoals = async (req, res) => {
  const goals = await Goal.find({ user: req.body.id });

  res.status(200).json(goals);
};

const setGoals = async (req, res) => {
  // Checks if there is text in the body. Otherwise, returns a 400 error with error message
  console.log(req.body.text);
  if (!req.body.text) {
    res.status(400).json({ message: 'please add a text field' });
    // Added this error handler so we get more info + error comes back in html.
    // throw new Error('Please add text field');
  }
  const goal = await Goal.create({
    text: req.body.text,
  });

  res.status(200).json(goal);
};

const updateGoals = async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
};

const deleteGoals = async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  await goal.remove();

  res.status(200).json(req.params.id);
};

module.exports = { getGoals, setGoals, updateGoals, deleteGoals };
