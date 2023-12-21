import { FC } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import DeleteIcon from 'components/icons/deleteicon';
import { Column, Id } from 'types';

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
}

const ColumnContainer: FC<Props> = ({ column, deleteColumn }): JSX.Element => {
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
          {column.title}
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
      <div className="flex flex-grow ">Content</div>
      <div>Footer</div>
    </div>
  );
};

export default ColumnContainer;
