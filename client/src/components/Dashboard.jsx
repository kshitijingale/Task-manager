import { useState, useEffect } from 'react';
import axios from 'axios';
import Todo from '../components/Todo';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../Auth/isAuthenticated';

function App() {
    const [todoTitle, setTodoTitle] = useState('')
    const [todos, setTodos] = useState([])
    const [searchText, setSearchText] = useState('')
    const [search, setSearch] = useState(false)
    const navigate = useNavigate();

    const BASE_URL = "https://taskbuddy-fzfd.onrender.com";
    // const BASE_URL = "http://localhost:8081";
    axios.defaults.withCredentials = true


    const token = isAuthenticated()

    // Fetch all Todos
    const getTodos = async () => {

        await axios.get(`${BASE_URL}/getTodos`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                const todosData = res.data.todos;
                // Sorting the todos based on created date
                todosData.sort((a, b) => {
                    const time1 = (a.modifiedDate) ? (new Date(a.modifiedDate)) : (new Date(a.createdDate))
                    const time2 = (b.modifiedDate) ? (new Date(b.modifiedDate)) : (new Date(b.createdDate))
                    return time2 - time1;
                })
                setTodos(todosData);
            })
            .catch((err) => {
                console.log(err);
                alert(err.response.data)
                navigate('/')
            })
    }

    // create Todo
    const handleSubmit = async () => {

        if (todoTitle.trim() === '') {
            alert("Title field cannot be empty")
            return;
        }
        await axios.post(`${BASE_URL}/createTodo`, { title: todoTitle },
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
        // reset value
        setTodoTitle('')
        getTodos();
    }

    // Delete Todo
    const deleteTodo = async (id) => {

        await axios.delete(`${BASE_URL}/deleteTodo/${id}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        setSearch(false)
        getTodos();
    }

    // Edit Todo
    const editTodo = async (id, title) => {

        await axios.put(`${BASE_URL}/editTodo/${id}`, {
            title: title
        }, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        setSearch(false)
        getTodos();
    }

    useEffect(() => {
        getTodos();
    }, [])

    const inputHandler = (e) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    }

    // Search Todo
    const handleSearch = async () => {

        if (searchText.trim() === "") {
            alert("Cannot be empty")
            return;
        }
        const res = await axios.post(`${BASE_URL}/api/searchTodos/${searchText}`, {}, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        setTodos(res.data.todos);
        setSearch(true);

        // reset value
        setSearchText('')
    }

    // Go back
    const goBack = () => {
        setSearch(!search);
        getTodos();
    }

    // Logout User
    const handleLogout = async () => {
        localStorage.removeItem('token')
        await axios.get(`${BASE_URL}/api/logout`).then((res) => {
            alert('Logged out successfully')
            navigate('/')
        }).catch((err) => {
            console.log(err);
            alert(err)
        })
    }

    return (
        <div className='bg-gradient-to-r from-blue-500 to-indigo-600 min-h-screen'>
            <div className=' mx-auto w-full md:w-[85%] lg:w-[90%] xl:w-[1200px] flex align-center flex-col py-[20px] px-[10px]'>
                <div className='flex justify-center sm:justify-between sm:items-center mb-[20px] mt-14 sm:mt-0'>
                    <h1 className='text-3xl md:text-4xl font-bold text-center absolute top-5 left-2 sm:static'>🎯 TaskBuddy </h1>
                    <div className='flex gap-5 flex-col-reverse sm:flex-row'>
                        <div className='flex items-center sm:mb-0 w-[300px] mx-[auto] justify-between border border-[#000] rounded py-[5px] px-[10px]'>
                            <input className='w-[80%] focus:outline-none bg-transparent placeholder:text-black' placeholder='Search a task....' value={searchText} onChange={(e) => setSearchText(e.target.value)} type='text' />
                            <button onClick={handleSearch}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" id="search"><path d="M11 22C4.935 22 0 17.065 0 11S4.935 0 11 0s11 4.935 11 11-4.935 11-11 11zm0-20c-4.962 0-9 4.037-9 9s4.038 9 9 9 9-4.037 9-9-4.038-9-9-9z"></path><path d="M23 24a.997.997 0 0 1-.707-.293l-4.795-4.795a1 1 0 0 1 1.415-1.414l4.794 4.795A.999.999 0 0 1 23 24z"></path>
                                </svg>
                            </button>
                        </div>
                        <button onClick={handleLogout} className='text-white p-[6px] bg-[#000000] border border-transparent focus:outline-none hover:bg-transparent hover:text-black hover:border-black rounded max-w-max self-end absolute top-5 right-2 sm:static'>Logout</button>
                    </div>
                </div>
                {
                    (search) ? (
                        <>
                            <h1 className='text-center text-[24px] font-bold mb-[20px]'>
                                <button onClick={goBack} className='hover:bg-[#f0f0f0] mr-[8px] rounded-[50%] h-[35px] w-[30px]'>←</button>
                                Search results:</h1>
                        </>
                    ) : (
                        <>

                            <div className='flex justify-center gap-3 sm:mt-6 mb-[40px]'>
                                <input value={todoTitle} onKeyDown={(e) => inputHandler(e)} onChange={(e) => setTodoTitle(e.target.value)} placeholder='Create a Task list.....' className='bg-transparent text-[18px] sm:text-[20px] border border-black focus:outline-none 
                                pl-[8px] rounded placeholder:text-black' />
                                <button onClick={handleSubmit} className="text-white text-[18px] sm:text-[20px] bg-[#000000] border border-transparent py-0 px-3 sm:px-6 sm:py-1 focus:outline-none hover:bg-transparent hover:text-black hover:border-black rounded">Create</button>
                            </div>
                        </>
                    )
                }
                <div className='md:w-[600px] md:mx-auto'>
                    {
                        (todos.length === 0) ? (
                            <h1 className='text-center text-[20px]'>No Todos found !!!</h1>
                        ) : (
                            todos && todos.map((todo) => {
                                return <Todo key={todo._id} BASE_URL={BASE_URL} deleteTodo={deleteTodo} editTodo={editTodo} todo={todo} />
                            })
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default App;
