import { useAppDispatch, useAppSelector } from '../../../../core/hooks/hooks';
import { setSearchQuery } from '../../../../redux/slices/taskSlice';

const TaskSearch = () => {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.tasks.searchQuery);

  return (
    <div className="flex items-center gap-4 flex-wrap">
      <input
        type="text"
        placeholder=" Search tasks by title..."
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all min-w-[200px]"
      />
      {searchQuery && (
        <span className="text-purple-600 text-sm font-medium">
          Searching for: "{searchQuery}"
        </span>
      )}
    </div>
  );
};

export default TaskSearch;