import React, {
  createContext,
  useContext,
  ReactNode,
  useReducer,
  Dispatch,
} from "react";

interface FilterState {
  activeFilter: "unset" | "done" | "pending";
  searchValue: string;
}

interface FilterAction {
  type: string;
  filter?: "unset" | "done" | "pending";
  searchValue?: string;
}

const initialFilterState: FilterState = {
  activeFilter: "unset",
  searchValue: "",
};

const FilterContext = createContext<{
  activeFilter: "unset" | "done" | "pending";
  searchValue: string;
  setFilter: (filter: "unset" | "done" | "pending") => void;
  setSearchValue: (value: string) => void;
  clearFilter: () => void;
  clearSearchValue: () => void;
}>({
  activeFilter: "unset",
  searchValue: "",
  setFilter: () => {},
  setSearchValue: () => {},
  clearFilter: () => {},
  clearSearchValue: () => {},
});

const FilterDispatchContext = createContext<Dispatch<FilterAction>>(() => {});

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilterContext must be used within a FilterProvider");
  }
  return context;
};

export const useFilterDispatch = () => {
  const context = useContext(FilterDispatchContext);
  if (!context) {
    throw new Error("useFilterDispatch must be used within a FilterProvider");
  }
  return context;
};

function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case "SET_FILTER":
      return {
        ...state,
        activeFilter: action.filter || "unset",
      };
    case "SET_SEARCH":
      return {
        ...state,
        searchValue: action.searchValue || "",
      };
    case "CLEAR_FILTER":
      return {
        ...state,
        activeFilter: "unset",
      };
    case "CLEAR_SEARCH":
      return {
        ...state,
        searchValue: "",
      };
    default:
      return state;
  }
}

export function FilterProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(filterReducer, initialFilterState);

  const setFilter = (filter: "unset" | "done" | "pending") => {
    dispatch({ type: "SET_FILTER", filter });
  };

  const setSearchValue = (searchValue: string) => {
    dispatch({ type: "SET_SEARCH", searchValue });
  };

  const clearFilter = () => {
    dispatch({ type: "CLEAR_FILTER" });
  };

  const clearSearchValue = () => {
    dispatch({ type: "CLEAR_SEARCH" });
  };

  const contextValue = {
    activeFilter: state.activeFilter,
    searchValue: state.searchValue,
    setFilter,
    setSearchValue,
    clearFilter,
    clearSearchValue,
  };

  return (
    <FilterDispatchContext.Provider value={dispatch}>
      <FilterContext.Provider value={contextValue}>
        {children}
      </FilterContext.Provider>
    </FilterDispatchContext.Provider>
  );
}