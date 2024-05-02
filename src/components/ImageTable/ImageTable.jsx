import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import FirebaseContext from "../../FirebaseContext";

const ImageTable = () => {
  const [rows, setRows] = useState([]);

  const app = useContext(FirebaseContext);

  const db = getFirestore(app);

  useEffect(() => {
    const fetchImages = async () => {
      const imageCollection = collection(db, "images");
      const images = await getDocs(imageCollection);
      const imageList = images.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRows(imageList);
    };

    fetchImages();
  }, [db]);

  const deleteImage = async (id) => {
    await deleteDoc(doc(db, "images", id));
    setRows(rows.filter((row) => row.id !== id));
  };

  const columns = [
    {
      field: "downloadURL",
      sortable: false,
      headerName: "Image",
      width: 100,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="img"
          style={{ width: "100%", objectFit: "contain" }}
        />
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <IconButton
          onClick={() => deleteImage(params.row.id)}
          color="secondary"
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];
  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid pageSize={5} autoHeight rows={rows} columns={columns} />
    </Box>
  );
};

export default ImageTable;
