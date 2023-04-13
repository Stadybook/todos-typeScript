import { FC, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Header } from '../Header';
import './App.css';
import { TaskList } from '../TaskList';
import { NewTaskForm } from '../NewTaskForm';
import { Footer } from '../Footer';
import { ITask } from '../TaskList/TaskList';

type Props = {
    children?: JSX.Element;
};

const App: FC<Props> = () => {
    const [todoData, setTodoData] = useState<ITask[]>([]);
    const [filter, setFilter] = useState<string | null>('All');

    const addTask = (text: string, sec: number) => {
        const time = Number.isNaN(sec) ? 0 : Number(sec);
        const newTask = {
            label: text,
            deadline: time,
            id: uuidv4(),
            completed: false,
            date: new Date(),
        };

        setTodoData((todos) => [...todos, newTask]);
    };

    const deleteTask = (id: string) => {
        const index = todoData.findIndex((el) => el.id === id);

        const newData = [
            ...todoData.slice(0, index),
            ...todoData.slice(index + 1),
        ];
        setTodoData(newData);
    };

    const toggleProperty = (id: string) => {
        const index = todoData.findIndex((el) => el.id === id);
        const oldItem = todoData[index];
        const newItem = {
            ...oldItem,
            completed: !oldItem.completed,
        };

        setTodoData(() => {
            return [
                ...todoData.slice(0, index),
                newItem,
                ...todoData.slice(index + 1),
            ];
        });
    };

    const changeName = (id: string, text: string) => {
        const index = todoData.findIndex((el) => el.id === id);
        const oldItem = todoData[index];

        const newItem = { ...oldItem, label: text };

        const newData = [
            ...todoData.slice(0, index),
            newItem,
            ...todoData.slice(index + 1),
        ];

        setTodoData(newData);
    };

    const changeDeadline = (id: string, newDeadline: number) => {
        const index = todoData.findIndex((el) => el.id === id);
        const oldItem = todoData[index];

        const newItem = {
            ...oldItem,
            deadline: newDeadline,
        };
        const newData = [
            ...todoData.slice(0, index),
            newItem,
            ...todoData.slice(index + 1),
        ];
        setTodoData(newData);
    };

    const clearCompleted = () => {
        const activeTasks = todoData.filter((task) => !task.completed);
        setTodoData(activeTasks);
    };

    const todoTasks = todoData.filter((el) => !el.completed).length;

    let todoItemsShown;
    switch (filter) {
        case 'Completed':
            todoItemsShown = todoData.filter((el) => el.completed);
            break;
        case 'Active':
            todoItemsShown = todoData.filter((el) => !el.completed);
            break;
        default:
            todoItemsShown = todoData;
    }

    return (
        <section className='todoapp'>
            <Header />
            <NewTaskForm onTaskAdded={addTask} />
            <section className='main'>
                <TaskList
                    toggleProperty={toggleProperty}
                    todos={todoItemsShown}
                    onDeleted={deleteTask}
                    onChangeName={changeName}
                    changeDeadline={changeDeadline}
                />
                <Footer
                    todoTasks={todoTasks}
                    filter={filter}
                    onClearCompleted={clearCompleted}
                    setFilter={setFilter}
                />
            </section>
        </section>
    );
};

export default App;
