import { FC } from 'react';

import { TasksFilter } from '../TasksFilter';
import './Footer.css';

interface IFooter {
    todoTasks: number;
    filter: string | null;
    onClearCompleted: () => void;
    setFilter: (filter: string | null) => void;
}

const Footer: FC<IFooter> = ({
    todoTasks,
    filter,
    onClearCompleted,
    setFilter,
}) => {
    return (
        <footer className='footer'>
            <span className='todo-count'>{todoTasks} items left</span>
            <TasksFilter filter={filter} setFilter={setFilter} />
            <button
                type='button'
                className='clear-completed'
                onClick={onClearCompleted}
            >
                Clear completed
            </button>
        </footer>
    );
};

export default Footer;
