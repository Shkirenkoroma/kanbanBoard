import { FC, useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import DeleteIcon from 'components/icons/deleteicon';
import { Column, Id, Task } from 'types';
import PlusIcon from 'components/icons/plusicon';
import TaskCard from 'components/taskCard';

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;
  createTask: (column: Id) => void;
  deleteTask: (id: Id) => void;
  tasks: Task[]
}

const ColumnContainer: FC<Props> = ({
  column,
  createTask,
  deleteColumn,
  updateColumn,
  deleteTask,
  tasks
}): JSX.Element => {
  const [editMode, setEditMode] = useState(false);
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return <div></div>;
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="
    bg-mainBackgroundColor 
    w-[350px] 
    h-[500px] 
    max-h-[500px] 
    rounded-md 
    flex 
    flex-col
    p-4
    "
    >
      <div
        {...attributes}
        {...listeners}
        onClick={() => {
          setEditMode(true);
        }}
        className="
      bg-columnBackrgroundColor
      text-md 
      h-[60px] 
      cursor-grab 
      rounded-md 
      rounded-b-none 
      p-3 
      font-bold 
      border-columnBackgroundColor
      flex
      items-center
      justify-between
      "
      >
        <div className="flex gap-2">
          <div
            className="flex
          justify-center
          items-center
          bg-mainBackgroundColor
          px-2
          py-1
          text-sm
          rounded-full
          "
          >
            0
          </div>
          {!editMode && column.title}
          {editMode && (
            <input
              className="bg-black focus:border-rose-500 border-rounded outline-none px-2"
              value={column.title}
              onChange={(e) => updateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => {
                setEditMode(false);
              }}
              onKeyDown={(e) => {
                if (e.key !== 'Enter') return;
                setEditMode(false);
              }}
            />
          )}
        </div>
        <button
          className="
        stroke-gray-500 
        hover:stroke-white 
        hover:bg-columnBackgroundColor
        rounded
        px-1
        py-2
        "
          onClick={() => deleteColumn(column.id)}
        >
          <DeleteIcon />
        </button>
      </div>
      <div className="flex flex-grow flex-col gap-4 py-5 pr-1 
      overflow-x-hidden overflow-y-auto">{
        tasks.map((task) => (
          <TaskCard key={task.id} task={task} deleteTask={deleteTask}/>
        ))
      }</div>
      <button className="flex gap-2 items-center 
      border-columnBackgroundColor 
      border-2 rounded-md p-4 border-x-columnBackgroundColor 
      hover:bg-mainBackgroundColor 
      hover:text-rose-500 
      active:bg-black"
      onClick={()=> {
        createTask(column.id)
      }}>
        <PlusIcon />
        Add task
      </button>
    </div>
  );
};

export default ColumnContainer;
