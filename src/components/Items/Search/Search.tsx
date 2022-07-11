import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";
import styled from "@emotion/styled";

export interface SearchType {
  search: string;
  holder: string;
  onChange: (value: string) => void;
}

const StyledTextField = styled(TextField)({
  color: "inherit",
  "& .MuiInputBase-input": {
    paddingLeft: `34px`,
  },
});

const Search: React.FC<SearchType> = ({ search, holder, onChange }) => {
  return (
    <>
      <div className="search">
        <SearchIcon className="searchIcon" />
        <StyledTextField
          placeholder={`Search ${holder}`}
          value={search}
          onChange={(e) => onChange(e.target.value)}
          autoComplete="off"
        />
      </div>
    </>
  );
};
export default Search;