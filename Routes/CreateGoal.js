const express = require('express');
const router = express.Router();
const Goal = require('../Models/goal');


router.post('/creategoal', async (req, res) => {
  try {
    const { title, targetValue, type, period, userId } = req.body;

    if (!title || !targetValue || !type || !period || !userId) {
      return res.status(400).json({ message: 'All fields required' });
    }

    const goal = await Goal.create({
      user: userId,
      title,
      targetValue,
      type,
      period,
    });

    res.status(201).json(goal);
  } catch (error) {
    console.error('Create goal error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/goals', async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: 'userId query parameter required' });
    }

    const goals = await Goal.find({ user: userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(goals);
  } catch (error) {
    console.error('Get goals error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// UPDATE GOAL
router.put('/updategoal/:goalId', async (req, res) => {
  try {
    const { goalId } = req.params;
    const { title, targetValue, type, period } = req.body;

    const updatedGoal = await Goal.findByIdAndUpdate(
      goalId,
      { title, targetValue, type, period },
      { new: true, runValidators: true }
    );

    if (!updatedGoal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    res.status(200).json(updatedGoal);
  } catch (error) {
    console.error('Update goal error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
// DELETE GOAL
router.delete('/deletegoal/:goalId', async (req, res) => {
  try {
    const { goalId } = req.params;

    const deletedGoal = await Goal.findByIdAndDelete(goalId);

    if (!deletedGoal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    res.status(200).json({ message: 'Goal deleted successfully' });
  } catch (error) {
    console.error('Delete goal error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;