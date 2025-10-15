import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar() {
  return (
    <Paper
      component="form"
      sx={{
        p: "1px 7px",
        display: "flex",
        alignItems: "center",
        width: 400,
        marginTop: "30px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        borderRadius: "30px",
        backgroundColor: "#ffffff",
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="  Search Workers"
        inputProps={{ "aria-label": "search workers" }}
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
