import { FC, useState } from 'react';

import { Id, Task } from 'types';

import DeleteIcon from './../icons/deleteicon/index';

interface TaskCardProps {
  task: Task;
  deleteTask: (id: Id) => void
}

const TaskCard: FC<TaskCardProps> = ({ task, deleteTask }): JSX.Element => {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false)
  }

  if (editMode) {
    return <>Edit mode</>
  }
   
  return (
    <div
      className="
bg-columnBackrgroundColor 
p-2.5 
h-[100px] 
min-h-[100px] 
items-center flex 
text-left 
rounded-xl 
hover:ring-2 
hover:ring-inset
hover:ring-rose-500
cursor-grab
relative
"
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
    >
      {task.content}
      {mouseIsOver && (
        <button
          className="
      stroke-white 
      absolute right-4 
      top-1/2-translate-y-1/2 
      bg-columnBackgroundColor 
      p-2 rounded
      opacity-60 hover:opacity-100
      "
      onClick={()=>{
        deleteTask(task.id)
      }}
        >
          <DeleteIcon />
        </button>
      )}
    </div>
  );
};

export default TaskCard;
