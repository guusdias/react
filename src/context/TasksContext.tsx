import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useReducer,
  Dispatch,
} from "react";
import { reducer } from "../hook/useReducer";
import ITasks from "../types/ITasks";

interface State {
  tasks: ITasks[];
  activeFilter: "unset" | "done" | "pending";
  value: string;
}

interface Action {
  type: string;
  task?: ITasks;
  id?: string;
  searchTerm?: string;
  isCompleted?: boolean;
  filter?: "unset" | "done" | "pending";
  searchValue?: string;
}

const initialState: State = {
  tasks: JSON.parse(localStorage.getItem("tasks") || "[]") as ITasks[],
  activeFilter: "unset",
  value: "",
};

const TasksContext = createContext<{
  tasks: ITasks[];
  activeFilter: "unset" | "done" | "pending";
  clearFilter: () => void;
  value: string;
  handleClearValue: () => void;
}>({
  tasks: [],
  activeFilter: "unset",
  clearFilter: () => {},
  value: "",
  handleClearValue: () => {},
});

const ActionContext = createContext<Dispatch<Action>>(() => {});

export const useTasksContext = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasksContext must be used within a TasksProvider");
  }
  return context;
};

export const useTasksDispatch = () => {
  const context = useContext(ActionContext);
  if (!context) {
    throw new Error("useTasksDispatch must be used within a TasksProvider");
  }
  return context;
};

export function TasksProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  }, [state.tasks]);

  const clearFilter = () => {
    dispatch({ type: "SET_FILTER", filter: "unset" });
  };

  const handleClearValue = () => {
    dispatch({ type: "SET_SEARCH", searchValue: "" });
  };

  const contextValue = {
    tasks: state.tasks,
    activeFilter: state.activeFilter,
    clearFilter,
    value: state.value,
    handleClearValue,
  };

  return (
    <ActionContext.Provider value={dispatch}>
      <TasksContext.Provider value={contextValue}>
        {children}
      </TasksContext.Provider>
    </ActionContext.Provider>
  );
}