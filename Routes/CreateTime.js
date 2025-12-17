const express = require('express');
const Time = require('../Models/Time');

const router = express.Router();

/* =========================
   CREATE TIME ENTRY
========================= */
router.post('/createtime', async (req, res) => {
  try {
    const { SessionName, StartTime, EndTime, UserId } = req.body;

    if (!SessionName || !StartTime || !EndTime || !UserId) {
      return res.status(400).json({
        error: 'SessionName, StartTime, EndTime, and UserId are required',
      });
    }

    const duration =
      ((new Date(EndTime) - new Date(StartTime)) / (1000 * 60)).toFixed(2); // minutes

    const timeEntry = await Time.create({
      SessionName,
      StartTime: new Date(StartTime),
      EndTime: new Date(EndTime),
      duration,
      user: UserId,
    });

    return res.status(201).json({
      message: 'Time entry created successfully',
      timeEntry,
    });
  } catch (error) {
    console.error('Error creating time entry:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

/* =========================
   GET TIME ENTRIES
========================= */
router.get('/times', async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        error: 'userId query parameter is required',
      });
    }

    const timeEntries = await Time.find({ user: userId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({ timeEntries });
  } catch (error) {
    console.error('Error fetching time entries:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

/* =========================
   UPDATE TIME ENTRY
========================= */
router.put('/updatetime/:timeId', async (req, res) => {
  try {
    const { timeId } = req.params;
    const { SessionName, StartTime, EndTime } = req.body;

    let updatedFields = { SessionName };

    if (StartTime && EndTime) {
      updatedFields.StartTime = new Date(StartTime);
      updatedFields.EndTime = new Date(EndTime);
      updatedFields.duration =
        ((new Date(EndTime) - new Date(StartTime)) / (1000 * 60)).toFixed(2);
    }

    const updatedTime = await Time.findByIdAndUpdate(
      timeId,
      updatedFields,
      { new: true, runValidators: true }
    );

    if (!updatedTime) {
      return res.status(404).json({ error: 'Time entry not found' });
    }

    return res.status(200).json({
      message: 'Time entry updated successfully',
      timeEntry: updatedTime,
    });
  } catch (error) {
    console.error('Error updating time entry:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

/* =========================
   DELETE TIME ENTRY
========================= */
router.delete('/deletetime/:timeId', async (req, res) => {
  try {
    const { timeId } = req.params;

    const deletedTime = await Time.findByIdAndDelete(timeId);

    if (!deletedTime) {
      return res.status(404).json({ error: 'Time entry not found' });
    }

    return res.status(200).json({
      message: 'Time entry deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting time entry:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
