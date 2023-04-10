import React, { useState } from 'react'
import ImageCard from '../../components/ImageCard'
import CloseIcon from '@mui/icons-material/Close';
import './home.css'
import { Box, Button, Grid } from '@mui/material'
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

// const images = [{
//     id: 1,
//     name: "iamge1",
//     desc: "Description 1",
//     url: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80"
// },

// {
//     id: 2,
//     name: "iamge2",
//     desc: "Description 1",
//     url: "https://media.istockphoto.com/id/1317323736/photo/a-view-up-into-the-trees-direction-sky.jpg?b=1&s=170667a&w=0&k=20&c=VqVR2PMyaneOTn8f6wgEgM2V-zsHCzFMk6Wnm_kAf_k="
// },

// {
//     id: 3,
//     name: "iamge3",
//     desc: "Description 1",
//     url: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80"
// },
// {
//     id: 4,
//     name: "iamge3",
//     desc: "Description 1",
//     url: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80"
// },
// {
//     id: 5,
//     name: "iamge2",
//     desc: "Description 1",
//     url: "https://media.istockphoto.com/id/1317323736/photo/a-view-up-into-the-trees-direction-sky.jpg?b=1&s=170667a&w=0&k=20&c=VqVR2PMyaneOTn8f6wgEgM2V-zsHCzFMk6Wnm_kAf_k="
// },
// {
//     id: 7,
//     name: "iamge2",
//     desc: "Description 1",
//     url: "https://media.istockphoto.com/id/1317323736/photo/a-view-up-into-the-trees-direction-sky.jpg?b=1&s=170667a&w=0&k=20&c=VqVR2PMyaneOTn8f6wgEgM2V-zsHCzFMk6Wnm_kAf_k="
// },
// ]



const Home = () => {
    const auth = getAuth();
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


    const handlePopClose = () => {
        setModel(false)
    }

    const handleOnImageClicked = (src) => {
        setImageSrc(src)
        setModel(true)
    }



    return (
        <>
            <div className={model ? "model open" : "model"}>
                <img src={imageSrc} alt="Popup" />
                <CloseIcon onClick={handlePopClose} />
            </div>

            <div className='gallery' style={{ pointerEvents: model ? "none" : "auto" }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <h1>Welcome  to image gallery</h1>
                    <Button onClick={handleOnLogoutClicked} className='logout-btn'>Logout</Button>
                </Box>

                <Grid container gap={3}>
                    {images.map((image, index) => {
                        return <Grid item onClick={() => handleOnImageClicked(image.url)} ><ImageCard key={image.id} url={image.url} /></Grid>
                    })}
                </Grid>
            </div>
        </>

    )
}

export default Home;