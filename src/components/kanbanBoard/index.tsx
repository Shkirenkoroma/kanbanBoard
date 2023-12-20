import { FC } from 'react';

const KanbanBoard: FC = (): JSX.Element => {
  return (
    <div>
      <button className="h-[60px] w-[350px] 
      min-w-[350px] 
      cursor-pointer 
      rounded-lg 
      bg-mainBackgroundColor 
      border-2 
      border-columnBackgroundColor
      p-4
      ring-rose-500
      hover:ring-2
      ">
        Add column
      </button>
    </div>
  );
};

export default KanbanBoard;
