import React, { ChangeEvent, useEffect, useState } from "react";
import {Grid, Typography,TextField,Button} from '@material-ui/core';
import { Box } from "@mui/material";
import {Link, useNavigate} from 'react-router-dom';
import { login } from "../../services/service";
import useLocalStorage from "react-use-localstorage";
import AuthenticationDTO from "../../models/AuthenticationDTO"
import './Login.css';
 
function Login() {

    let navigate = useNavigate();
    const [token, setToken] = useLocalStorage('token');

    const [authenticationDTO, setAuthenticationDTO] = useState<AuthenticationDTO>(
        {
            email: "",
            password: "",
        }
    );

    function updatedModel(e: ChangeEvent<HTMLInputElement>){

        setAuthenticationDTO({
            ...authenticationDTO,
            [e.target.name]: e.target.value
        })
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>){
        e.preventDefault();
        try {
            await login(`/api/Authentication`, authenticationDTO, setToken);
            alert('Logado');    
        } catch (error) {
            alert('Email ou senha incorretos');
        }
    }

    useEffect(() => {

        if(token !== ''){
            navigate('/home');
        }

    }, [token, navigate]);

    return (
        <Grid container direction='row' justifyContent='center' alignItems='center'>
            <Grid alignItems='center' xs={6}>
                <Box paddingX={20}>
                    <form onSubmit={onSubmit}>
                        <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' style={{fontWeight:'bold'}}>Entrar</Typography>
                        
                        <TextField 
                            value={authenticationDTO.email} 
                            onChange={(e:ChangeEvent<HTMLInputElement>) => updatedModel(e)} 
                            id='email' label='email' variant ='outlined' name='email' margin='normal' fullWidth />
                        
                        <TextField 
                            value={authenticationDTO.password}
                            onChange={(e:ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            id='password' label='senha' variant ='outlined' name='password' margin='normal' type='password' fullWidth />
                        
                        <Box marginTop={2} textAlign='center'>
                            <Button type ='submit' variant='contained' style={{ borderColor: "black", backgroundColor: "#F5ED30", color: "#000000" }}>
                            Entrar
                            </Button>
                        </Box>
                    </form>

                    <Box display='flex' justifyContent='center' marginTop={2}>
                        <Box marginRight={1}>
                            <Typography variant='subtitle1' gutterBottom align='center'>Não tem uma conta?</Typography>
                        </Box>
                        <Link to='/UserRegister' className='text-decorator-nome2'>
                            <Typography variant='subtitle1' gutterBottom align='center' style={{fontWeight:'bold'}}>Cadastre-se</Typography>
                        </Link>
                    </Box>
                </Box>
            </Grid> 
            
            <Grid xs={6} style={{
                background: `url(https://imgur.com/MesYHGC.jpeg)`,
                backgroundRepeat:'no-repeat', width: '130vh' , minHeight: '100vh' , backgroundSize: 'cover' , backgroundPosition:'center'
            }}> 
            </Grid>
        </Grid>
    );
}
 
export default Login;