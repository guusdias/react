import { useState } from "react";
import {
  SearchContainer,
  SearchInput,
  IconButton,
  CloseIcon,
  SearchIcon,
} from "./styles";
import { useFilterContext } from "../../context/FilterContext";

const SearchBar = () => {
  const [active, setActive] = useState(false);
  const { searchValue, setSearchValue, clearSearchValue } = useFilterContext();

  const changeStatus = () => setActive(!active);

  const handleLocalValue = (e: any) => setSearchValue(e.target.value);

  const handleClearValue = () => clearSearchValue()

  console.log(searchValue);

  return (
    <SearchContainer>
      <SearchInput
        onBlur={changeStatus}
        onFocus={changeStatus}
        onChange={handleLocalValue}
        value={searchValue}
        placeholder="Search items"
      />
      {searchValue !== "" ? (
        <IconButton onClick={handleClearValue}>
          <CloseIcon size={25} />
        </IconButton>
      ) : (
        <IconButton>
          <SearchIcon size={25}/>
        </IconButton>
      )}
    </SearchContainer>
  );
};

export default SearchBar;
