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

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_TASK":
      if (!action.task || !action.task.description) return state;
      return {
        ...state,
        tasks: [...state.tasks, action.task],
      };

    case "REMOVE_TASK":
      if (!action.id) return state;
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.id),
      };

    case "TOGGLE_COMPLETE":
      if (!action.id) return state;
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.id ? { ...task, isCompleted: !task.isCompleted } : task
        ),
      };

    case "CLEAR_COMPLETED":
      return {
        ...state,
        tasks: state.tasks.filter((task) => !task.isCompleted),
      };

    case "EDIT_TASK":
      if (!action.task || !action.task.id) return state;
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.task!.id ? { ...task, description: action.task!.description } : task
        ),
      };

    default:
      return state;
  }
}