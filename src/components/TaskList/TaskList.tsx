import { FC } from 'react';

import { Task } from '../Task';
import './TaskList.css';

export interface ITask {
    label: string;
    deadline: number;
    id: string;
    completed: boolean;
    date: Date;
}

interface ITaskList {
    todos: ITask[];
    toggleProperty: (id: string) => void;
    onDeleted: (id: string) => void;
    changeDeadline: (id: string, time: number) => void;
    onChangeName: (id: string, newLabel: string) => void;
}

const TaskList: FC<ITaskList> = ({
    todos,
    toggleProperty,
    onDeleted,
    changeDeadline,
    onChangeName,
}) => {
    const elements = todos.map((item) => {
        const { id } = item;
        return (
            <Task
                {...item}
                key={id}
                onDeleted={() => onDeleted(id)}
                toggleProperty={() => toggleProperty(id)}
                onChangeName={(id, newLabel) => onChangeName(id, newLabel)}
                changeDeadline={(id, newDeadline) =>
                    changeDeadline(id, newDeadline)
                }
            />
        );
    });

    return <ul className='todo-list'>{elements}</ul>;
};

export default TaskList;
