const User = require('../model/User');

exports.searchTodos = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        const searchText = req.params.text.toLowerCase();
        const todos = user.todos.filter((todo) => {
            const todoTitle = todo.title.toLowerCase();
            if (todoTitle.includes(searchText)) {
                return todo;
            }
        })

        res.status(200).json({
            success: true,
            todos
        })
    } catch (error) {
        console.log(error.message);
    }
}