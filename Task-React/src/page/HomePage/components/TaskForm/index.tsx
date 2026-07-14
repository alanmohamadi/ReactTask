import { useState } from 'react';
import { useAppDispatch } from '../../../../core/hooks/hooks';
import { addTask } from '../../../../redux/slices/taskSlice';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    const trimmedTitle = title.trim();
    if (trimmedTitle) {
      dispatch(addTask(trimmedTitle));
      setTitle('');
      setIsAdding(false);
    }
  };

  const handleCancel = () => {
    setTitle('');
    setIsAdding(false);
  };

  if (!isAdding) {
    return (
      <button
        onClick={() => setIsAdding(true)}
        className="w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
      >
        + Add New Task
      </button>
    );
  }

  return (
    <div className="flex gap-3 items-center flex-wrap bg-gray-50 p-4 rounded-xl animate-[slideDown_0.3s_ease-out]">
      <input
        type="text"
        placeholder="Enter task title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSubmit();
          if (e.key === 'Escape') handleCancel();
        }}
        autoFocus
        className="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 min-w-[150px]"
      />
      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          className="px-5 py-2.5 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 hover:scale-105 transition-all"
        >
          ✓ Save
        </button>
        <button
          onClick={handleCancel}
          className="px-5 py-2.5 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 hover:scale-105 transition-all"
        >
          ✕ Cancel
        </button>
      </div>
    </div>
  );
};

export default TaskForm;