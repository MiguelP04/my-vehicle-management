import { useRef } from "react";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar({ value, onChange, placeholder }) {
  const inputRef = useRef(null);
  return (
    <div className="flex justify-start my-4">
      <TextField
        inputRef={inputRef}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        variant="outlined"
        size="small"
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: "white",
            "& fieldset": {
              borderColor: "black",
            },
            "&:hover fieldset": {
              borderColor: "black",
            },
            "&.Mui-focused fieldset": {
              borderColor: "black",
            },
          },
          "& MuiInputBase-input::placeholder": {
            color: "#666",
            opacity: 1,
          },
        }}
        InputProps={{
          startAdornment: (
            <span
              onClick={() => inputRef.current?.focus()}
              style={{ marginRight: 8, cursor: "pointer" }}
            >
              <SearchIcon />
            </span>
          ),
        }}
      />
    </div>
  );
}

export default SearchBar;
