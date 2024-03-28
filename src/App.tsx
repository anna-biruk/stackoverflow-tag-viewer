import React from "react";
import "./App.css";
import DocsTable from "./components/DocsTable";
import { Grid } from "@mui/material";

function App() {
  return (
    <div className="App">
      <Grid container justifyContent="center">
        <Grid item xs={6}>
          <DocsTable />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
