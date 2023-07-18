const User = require('../model/User');

exports.createTodo = async (req, res) => {
    try {
        const { title } = req.body;
        const user = await User.findById(req.user.id)


        user.todos.push({
            title,
        });

        await user.save();

        res.status(200).json({
            success: true,
            user
        })

    } catch (error) {
        console.log(error.message);
        res.status(400).json({
            success: false,
            message: "Failed to create todo"
        })
    }
}