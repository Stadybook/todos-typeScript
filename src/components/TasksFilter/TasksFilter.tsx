import React, { FC } from 'react';

import './TasksFilter.css';

interface ITaskFilter {
    filter: string | null;
    setFilter: (filter: string | null) => void;
}

const TasksFilter: FC<ITaskFilter> = ({ filter, setFilter }) => {
    const btns = [{ name: 'All' }, { name: 'Active' }, { name: 'Completed' }];

    const onClick = (event: React.MouseEvent) => {
        const classSelected = 'selected';
        if ((event.target as Element).classList.contains(classSelected)) {
            return;
        }
        setFilter((event.target as Element).textContent);
    };

    return (
        <ul className='filters'>
            {btns.map((el) => (
                <li key={el.name}>
                    <button
                        className={filter === el.name ? 'selected' : ' '}
                        type='button'
                        onClick={onClick}
                        // btn={el.name}
                        // label={el.name}
                    >
                        {el.name}
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default TasksFilter;
