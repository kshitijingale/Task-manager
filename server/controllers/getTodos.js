const Todo = require('../model/Todo');
const User = require('../model/User');

exports.getTodos = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const todos = user.todos;
        res.status(200).json({
            success: true,
            todos
        })

    } catch (error) {
        console.log(error.message);
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}