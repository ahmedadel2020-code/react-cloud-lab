import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button, styled } from "@mui/material";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useContext } from "react";
import FirebaseContext from "../../FirebaseContext";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const UploadImage = () => {
  const app = useContext(FirebaseContext);
  const storage = getStorage(app);
  const db = getFirestore(app);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    // upload the file to firebase storage, each file  in a separate folder
    const storageRef = ref(storage, `images/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);

    const downloadURL = await getDownloadURL(snapshot.ref);

    await addDoc(collection(db, "images"), {
      downloadURL,
    });
  };

  return (
    <div>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Upload an Image
        <VisuallyHiddenInput
          type="file"
          accept="image/*"
          multiple={false}
          onChange={handleFileChange}
        />
      </Button>
    </div>
  );
};

export default UploadImage;
