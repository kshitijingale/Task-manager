const express = require('express')
const router = express.Router();
// Auth middleware
const auth = require('../middleware/auth')

const { home } = require('../controllers/home')
const { createTodo } = require('../controllers/createTodo')
const { getTodos } = require('../controllers/getTodos');
const { deleteTodo } = require('../controllers/deleteTodo');
const { editTodo } = require('../controllers/editTodo');
const { createTodoTask } = require('../controllers/createTodoTask');
const { getTodoTasks } = require('../controllers/getTodoTasks');
const { deleteTodoTask } = require('../controllers/deleteTodoTask');
const { editTodoTask } = require('../controllers/editTodoTask');
const { searchTodos } = require('../controllers/searchTodos');
const { register } = require('../controllers/register');
const { login } = require('../controllers/login');
const { logout } = require('../controllers/logout');

// Path
router.get('/', home)
router.post('/createTodo', auth, createTodo)
router.get('/getTodos', auth, getTodos)
router.put('/editTodo/:id', auth, editTodo)
router.delete('/deleteTodo/:id', auth, deleteTodo)
router.post('/createTodoTask/:id', auth, createTodoTask)
router.get('/getTodoTasks/:id', auth, getTodoTasks)
router.put('/deleteTodoTask/:id', auth, deleteTodoTask)
router.put('/editTodoTask/:id', auth, editTodoTask)
router.post('/api/searchTodos/:text', auth, searchTodos)
router.post('/api/register', register)
router.post('/api/login', login)
router.get('/api/logout', logout)

module.exports = router;