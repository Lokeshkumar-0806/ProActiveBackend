const express = require('express');
const router = express.Router();
const Task = require('../Models/Task');

router.post('/createtask', async (req, res) => {
    try {
        const { title, description, status, dueDate, userId } = req.body;

        if (!title || !description || !dueDate || !status || !userId) {
            return res.status(400).json({ error: 'Title, description, dueDate, status, and userId are required' });
        }

        const normalizedStatus = status === 'pending' ? 'todo' : status;

        const task = await Task.create({
            title,
            description,
            status: normalizedStatus,
            dueDate: new Date(dueDate),
            user: userId,
        });
        return res.status(201).json({
            message: 'Task created successfully',
            task,
        });
    }
    catch (error) {
        console.error('Error creating task:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/tasks', async (req, res) => {
    try {
        const { userId } = req.query;
        if (!userId) {
            return res.status(400).json({ error: 'userId query parameter is required' });
        }
        const tasks = await Task.find({ user: userId }).sort({ createdAt: -1 });
        res.status(200).json({ tasks });
    }

    catch (error) {
        console.error('Error fetching tasks:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.put('/updatetask/:taskId',async(req,res)=>{
    try{
        const {taskId}=req.params;
        const {title,description,status,dueDate}=req.body;

        const updateTask=await Task.findByIdAndUpdate(
            taskId,
            {title,description,status,dueDate},
            {new:true,runValidators:true}
        );

        if(!updateTask){
            return res.status(404).json({error:'Task not found'});
        }
        res.status(200).json({message:'Task updated successfully',task:updateTask}

        )


    }
    catch(error){
        console.error('Error updating task:',error);
        return res.status(500).json({error:'Internal Server Error'});


    }

})

router.delete('/deletetask/:taskId',async(req,res)=>{
    try{
        const {taskId}=req.params;
        const deletedTask=await Task.findByIdAndDelete(taskId);

        if(!deletedTask){
            return res.status(404).json({error:'Task not found'});
        }
        res.status(200).json({message:'Task deleted successfully'});


    }
    catch(error){
        console.error('Error deleting task:',error);
        return res.status(500).json({error:'Internal Server Error'});
    }

})

module.exports = router;