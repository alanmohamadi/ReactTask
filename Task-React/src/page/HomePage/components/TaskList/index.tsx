import React from 'react';
import { useAppSelector } from '../redux/hooks';
import TaskItem from './TaskItem';

// اگر Props نداریم، می‌تونیم از {} یا خالی بذاریم
const TaskList = () => {
  const { tasks, searchQuery } = useAppSelector((state) => state.tasks);

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeTasks = filteredTasks.filter((task) => task.status === 'active');
  const inactiveTasks = filteredTasks.filter((task) => task.status === 'inactive');

  if (filteredTasks.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        <p className="text-xl font-medium">No tasks found</p>
        {searchQuery && <p className="text-sm mt-2">Try adjusting your search</p>}
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div className="flex gap-4 pb-4 mb-4 border-b-2 border-gray-100 text-sm text-gray-600">
        <span className="bg-gray-100 px-3 py-1 rounded-full">Total: {filteredTasks.length}</span>
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">Active: {activeTasks.length}</span>
        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">Inactive: {inactiveTasks.length}</span>
      </div>
      <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;