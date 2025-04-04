import ITasks, { FilterType } from "./ITasks";

interface TasksContextProps {
  tasks: ITasks[];
  addTask: (task: ITasks) => void;
  removeTask: (taskId: string) => void;
  completeTask: (taskId: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  clearSearch: () => void;
  clearSearchTerm: () => void;
  activeFilter: string;
  handleFilterActive: (filter: FilterType) => void;
  clearFilter: () => void;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  handleClearValue: () => void;
}

export default TasksContextProps;