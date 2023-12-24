import { FC, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';

import { Column, Id, Task } from 'types';

import ColumnContainer from '../columnContainer';
import PlusIcon from '../icons/plusicon';

const KanbanBoard: FC = (): JSX.Element => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const deleteColumn = (id: Id): void => {
    const filteredColumns = columns.filter((col) => col.id !== id);
    setColumns(filteredColumns);
  };

  const updateColumn = (id: Id, title: string): void => {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title };
    });

    setColumns(newColumns);
  };

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

  const onDragStart = (e: DragStartEvent): void => {
    if (e.active.data.current?.type === 'Column') {
      setActiveColumn(e.active.data.current.column);
      return;
    }
  };

  const onDragEnd = (e: DragEndEvent): void => {
    const { active, over } = e;
    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (col) => col.id === activeColumnId
      );

      const overColumnIndex = columns.findIndex(
        (col) => col.id === overColumnId
      );

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  };

  const createTask = (columnId: Id): void => {
    const newTask: Task = {
      id: generateId(),
      columnId,
      content: `Task ${tasks.length + 1}`,
    };

    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id: Id): void => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  const updateTask = (id: Id, content: string): void => {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, content };
    });
    setTasks(newTasks);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

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
      <DndContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        sensors={sensors}
      >
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColumnContainer
                  column={col}
                  key={col.id}
                  createTask={createTask}
                  updateColumn={updateColumn}
                  deleteColumn={deleteColumn}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  tasks={tasks.filter((task) => task.columnId === col.id)}
                />
              ))}
            </SortableContext>
          </div>
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
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                createTask={createTask}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                deleteTask={deleteTask}
                updateTask={updateTask}
                tasks={tasks.filter(
                  (task) => task.columnId === activeColumn.id
                )}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
};

export default KanbanBoard;
