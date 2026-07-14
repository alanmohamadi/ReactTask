import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TaskState , Task } from "../../page/HomePage/Type";

const initialState: TaskState = {
  tasks: [
    { id: '1', title: 'Complete project documentation', status: 'active' },
    { id: '2', title: 'Review pull requests', status: 'active' },
    { id: '3', title: 'Fix login page bug', status: 'inactive' },
    { id: '4', title: 'Update dependencies', status: 'active' },
    { id: '5', title: 'Design new dashboard', status: 'inactive' },
    { id: '6', title: 'Write unit tests', status: 'active' },
    { id: '7', title: 'Deploy to production', status: 'inactive' },
    { id: '8', title: 'Team meeting preparation', status: 'active' },
  ],
  searchQuery: '',
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    
    addTask: (state, action: PayloadAction<string>) => {
      const newTask: Task = {
        id: Date.now().toString(),
        title: action.payload,
        status: 'active',
      };
      state.tasks.push(newTask);
    },

    editTask: (state, action: PayloadAction<{ id: string; title: string }>) => {
      const { id, title } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.title = title;
      }
    },

    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },

    toggleTaskStatus: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.status = task.status === 'active' ? 'inactive' : 'active';
      }
    },

    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  addTask,
  editTask,
  deleteTask,
  toggleTaskStatus,
  setSearchQuery,
} = taskSlice.actions;

export default taskSlice.reducer;