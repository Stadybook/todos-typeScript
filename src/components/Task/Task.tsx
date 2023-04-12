import {FC,useState} from "react";
import { Timer } from "../Timer";
import { formatDistanceToNow } from 'date-fns';
import './Task.css';

interface ITaskComponent{
  label: string,
  deadline: number,
  id: string,
  completed: boolean,
  date: Date,
  onDeleted:(id:string) => void,
  changeDeadline: (id:string,time:number) => void, 
 onChangeName: (id:string, newLabel:string) => void,
  toggleProperty:(id:string) => void,
}

const Task:FC<ITaskComponent> = ({ 
  label,
  deadline,
  date,
  onDeleted,
  id,
  onChangeName,
  changeDeadline,
  toggleProperty,
  completed
}) => {
  const [labelState, changeLabel] = useState<string>(label);
  const [edit, onEditTask] = useState<boolean>(false);

  const onLabelChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length === 1) {
          const newLabel = e.target.value.trim().replace(/ +/g, ' ');
          changeLabel(newLabel);
      } else {
          changeLabel(e.target.value);
      }
  };

  const onSubmit = (e:React.KeyboardEvent<HTMLFormElement>) => {
      e.preventDefault();
    onChangeName((e.target as Element).id, labelState);
      onEditTask(false);
  };

  const result = formatDistanceToNow(date, { includeSeconds: true });
  const classNames = completed ? 'description completed' : 'description';
  const content = edit ? (
      <form className='' onSubmit={onSubmit} id={id}>
          <input
              type='text'
              className='edit'
              placeholder='Editing task'
              onChange={onLabelChange}
              value={labelState}
          />
      </form>
  ) : (
      <div className='view'>
          <input
              id={id.toString()}
              className='toggle'
              type='checkbox'
              onChange={() => toggleProperty(id)}
              checked={completed}
          />
          <label htmlFor={id}>
              <span className={classNames}>{labelState}</span>
              <Timer
                  changeDeadline={(id, newDeadline) => changeDeadline(id, newDeadline)}
                  deadline={deadline}
                  completed={completed}
                  id={id}
              />
              <span className='created'>created {result}</span>
          </label>
          <button
              type='button'
              className='icon icon-edit float-right'
              onClick={() => onEditTask(true)}
          />
          <button
              type='button'
              className='icon icon-destroy float-right'
              onClick={() => onDeleted(id)}
          />
      </div>
  );

  return <li className={edit ? 'editing' : ''}>{content}</li>;
}

export default Task;