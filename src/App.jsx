import { Box } from "@mui/material";
import "./App.css";
import ImageTable from "./components/ImageTable/ImageTable";
import UploadImage from "./components/Uploader/UploadImage";

function App() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px", mt: 5 }}>
      <UploadImage />
      <ImageTable />
    </Box>
  );
}

export default App;
