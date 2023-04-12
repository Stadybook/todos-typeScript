import  { useState, useEffect, FC } from 'react';

import './Timer.css';

interface ITimer{
    deadline: number, 
    completed: boolean,
    changeDeadline: (id:string,time:number) => void, 
    id: string;
}

const Timer:FC<ITimer> = ({ deadline, completed, changeDeadline, id }) => {

    const [existence, changeExistence] = useState<boolean>(false);
    const [timer, setTimer] = useState<any>(null);
    const [time, countTime] = useState<number>(deadline);

    const formatting = (seconds:number) => {
        return [Math.floor((seconds / 60) % 60), Math.floor(seconds % 60)]
            .join(':')
            .replace(/\b(\d)\b/g, '0$1');
    };

    const tick = () => {
        if (!existence) return;
        if (completed) {
            setTimer(clearInterval(timer));
        } else if (time === 0) {
            changeExistence(() => false);
            setTimer(clearInterval(timer));
        } else {
            countTime((t) => t - 1);
        }
    };

    useEffect(() => {
        changeDeadline(id,time);
    }, [time]);

    useEffect(() => {
        const counter = setInterval(() => tick(), 1000);
        return () => clearInterval(counter);
    });

    const onStart = () => changeExistence(() => true);

    const onStop = () => changeExistence(() => false);

    const btn = !existence ? (
        <button
            disabled={!!completed}
            className='icon icon-play'
            type='button'
            onClick={onStart}
        />
    ) : (
        <button
            disabled={!!completed}
            className='icon icon-pause'
            type='button'
            onClick={onStop}
        />
    );

    return (
        <span className='time'>
            {btn}
            {formatting(time)}
        </span>
    );
}


export default Timer;