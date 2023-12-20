import { FC, useState } from 'react';
import { Column } from 'src/types';

import PlusIcon from '../icons/plusicon';

const KanbanBoard: FC = (): JSX.Element => {
  const [columns, setColumns] = useState<Column[]>([]);

  const generateId = (): number => {
    return Math.floor(Math.random() * 10001);
  };

  const createNewColumn = (): void => {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, columnToAdd]);
  };

  return (
    <div
      className="
    m-auto
    flex
    min-h-screen
    w-full
    items-center
    justify-center
    overflow-x-auto
    overflow-y-hidden
    px-[40px]
  "
    >
      <div className="m-auto">
        <button
          onClick={() => createNewColumn()}
          className="h-[60px] 
      w-[350px] 
      min-w-[350px] 
      cursor-pointer 
      rounded-lg 
      bg-mainBackgroundColor 
      border-2 
      border-columnBackgroundColor
      p-4
      ring-rose-500
      hover:ring-2
      flex
      gap-2
      "
        >
          <PlusIcon /> Add column
        </button>
      </div>
    </div>
  );
};

export default KanbanBoard;
