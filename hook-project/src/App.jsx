import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container, Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Snackbar from "@mui/material/Snackbar";

function App() {
    const [todos, setTodos] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [lastAddedTask, setLastAddedTask] = useState("");

    useEffect(() => {
        fetch("/src/assets/data.json")
            .then((response) => response.json())
            .then((data) => setTodos(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const [priority, setPriority] = useState("medium");
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    const handlePriorityChange = (e) => {
        setPriority(e.target.value);
    };
    const handleAddTodo = () => {
        if (inputValue.trim()) {
            const newTodo = {
                task: inputValue,
                priority: priority,
                isDone: false,
            };
            setTodos([...todos, newTodo]);
            setLastAddedTask(inputValue);
            setSnackbarOpen(true);
            setInputValue("");
        }
    };
    const handleToggleTodo = (index) => {
        setTodos(
            todos.map((todo, i) =>
                i === index ? { ...todo, isDone: !todo.isDone } : todo
            )
        );
    };
    const handleCloseSnackbar = (_, reason) => {
        if (reason === "clickaway") return;
        setSnackbarOpen(false);
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                width: "100vw",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Container
                maxWidth="md"
                sx={{
                    py: 4,
                    width: "60%",
                    minWidth: "800px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    margin: "0 auto",
                }}
            >
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    align="center"
                    fontWeight="bold"
                >
                    NEXT Todo App
                </Typography>
                <TodoForm
                    inputValue={inputValue}
                    handleInputChange={handleInputChange}
                    handleAddTodo={handleAddTodo}
                    handlePriorityChange={handlePriorityChange}
                    priority={priority}
                />
                <TodoList todos={todos} handleToggleTodo={handleToggleTodo} />
            </Container>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                message={`할 일 추가됨: ${lastAddedTask}`}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            />
        </Box>
    );
}

export default App;
