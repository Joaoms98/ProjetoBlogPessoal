
import React from "react";
import {Typography, Grid, Button} from '@material-ui/core';
import "./Home.css";
import { Box } from "@mui/material";

function Home() {
    return (
        <>
            <Grid container direction="row" justifyContent="center" alignItems="center" style={{ backgroundColor: "#000000" }}>
                <Grid alignItems="center" item xs={6}>
                    <Box paddingX={20} >
                        <Typography variant="h3" gutterBottom color="textPrimary" component="h3" align="center" style={{ color: "white", fontWeight: "bold" }}>Bem vindo ao meu Blog</Typography>
                        <Typography variant="h5" gutterBottom color="textPrimary" component="h5" align="center" style={{ color: "white", fontWeight: "bold" }}>Fique a vontade e não faça baderna</Typography>
                    </Box>
                    <Box display="flex" justifyContent="center">
                        <Box marginRight={1}>
                        </Box>
                        <Button variant="outlined" style={{ borderColor: "black", backgroundColor: "#F5ED30", color: "#000000" }}>Ver Postagens</Button>
                    </Box>
                </Grid>
                <Grid item xs={6} style={{
                    background: `url(https://imgur.com/0vCaTFF.jpg)`,
                    backgroundRepeat:'no-repeat', width: '130vh' , minHeight: '100vh' , backgroundSize: 'cover' , backgroundPosition:'center'
                    }}> 
                </Grid>
                <Grid xs={12} style={{ backgroundColor: "white" }}>
                </Grid>
            </Grid>
        </>
    );
}

export default Home;