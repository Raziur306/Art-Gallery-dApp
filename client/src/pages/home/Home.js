import React, { useState } from 'react'
import ImageCard from '../../components/ImageCard'
import CloseIcon from '@mui/icons-material/Close';
import './home.css'
import { Box, Button, Grid, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Input } from '@mui/material'
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import app from '../../config/firebaseConfig'
import { v4 } from "uuid";
import { getStorage, ref, uploadBytes, getDownloadURL, } from "firebase/storage";





const Home = async ({ state }) => {
    const {contract} = state;
    const allUser = await contract.getAllUser();


    const auth = getAuth();
    const uid = auth.currentUser.uid;


    const navigate = useNavigate()

    const handleOnLogoutClicked = () => {
        signOut(auth).then(() => {
            navigate('/')
        }).catch((error) => {
            console.log(error)
        });
    }


    const [imageSrc, setImageSrc] = useState("");
    const [model, setModel] = useState(false);
    const [dialog, setDialog] = useState(false);






    const handleDialogClick = () => {
        setDialog(true);
    }


    const handlePopClose = () => {
        setModel(false)
    }

    const handleOnImageClicked = (src) => {
        setImageSrc(src)
        setModel(true)
    }



    //image file 
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileDetailError, setFileDetailError] = useState(false);
    const [imageDetail, setImageDetail] = useState({
        title: "",
        description: "",
        url: "",
    });


    const handleInputFileChnaged = (e) => {
        setSelectedFile(e.target.files[0]);
        console.log(selectedFile);
    }

    const handleImageInfoChanged = (e) => {
        setImageDetail({ ...imageDetail, [e.target.name]: e.target.value })
    }

    const handleOnImageUpload = async () => {
        if (!imageDetail.title || !imageDetail.description) {
            return setFileDetailError(true);
        }

        // upload image to firebase
        const storage = getStorage(app);

        const imageRef = ref(storage, `images/${selectedFile.name + v4()}`);
        await uploadBytes(imageRef, selectedFile).then(async (snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageDetail({ ...imageDetail, url })
            });
        });

        const { title, description, url } = imageDetail();
        await contract.uploadedImage(title, description, url, uid);
        setDialog(false);
    }





    return (

        <div className='dashboard'>
            <div className={model ? "model open" : "model"}>
                <img src={imageSrc} alt="Popup" />
                <CloseIcon onClick={handlePopClose} />
            </div>

            <div className='gallery' style={{ pointerEvents: model ? "none" : "auto" }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <h1>Welcome  to image gallery</h1>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Button className='upload-dialog-btn' onClick={handleDialogClick}>Upload</Button>
                        <Button onClick={handleOnLogoutClicked} className='logout-btn'>Logout</Button></Box>
                </Box>

                <Grid container gap={3}>
                    {allUser.map((user, index) => {
                        return user.imageList.map((image, index) => {
                            return <Grid item onClick={() => handleOnImageClicked(image.url)} ><ImageCard key={image.id} url={image.url} /></Grid>
                        })
                    }
                    )}
                </Grid>
            </div>



            <Dialog open={dialog} >
                <DialogTitle>Upload New Image</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter your image details and image file to upload into IPFS.
                    </DialogContentText>
                    <TextField
                        error={fileDetailError}
                        onChange={handleImageInfoChanged}
                        name='title'
                        value={imageDetail.title}
                        autoFocus
                        margin="dense"
                        label="Title"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        error={fileDetailError}
                        onChange={handleImageInfoChanged}
                        value={imageDetail.description}
                        autoFocus
                        name='description'
                        margin="dense"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="standard" />


                    <Input onChange={handleInputFileChnaged} accept="image/*" disableUnderline type="file" />


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleOnImageUpload} >Upload</Button>
                    <Button onClick={() => { setDialog(false) }}>Cancel</Button>
                </DialogActions>
            </Dialog>



        </div>

    )
}

export default Home;