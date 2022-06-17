import React, { ChangeEvent, useEffect, useState }  from "react";
import {Grid, Typography,TextField,Button,FormControl,InputLabel,Select } from '@material-ui/core';
import { Box } from "@mui/material";
import {Link, useNavigate} from 'react-router-dom';
import UserRegisterDTO from "../../models/UserRegisterDTO";
import { userRegistration } from "../../services/service";


function UserRegister(){
    
    let navigate = useNavigate();
    const [confirmPassword, setConfirmPassword] = useState<String>("")

    const [userRegisterDTO, setUserRegisterDTO] = useState<UserRegisterDTO>(
        {   
            name: "",
            email: "",
            password: "",
            photograph: "",
            type: ""
        }
    );

    const [userResult, setUserResult] = useState<UserRegisterDTO>(
        {
            name: "",
            email: "",
            password: "",
            photograph: "",
            type: ""
        }
    );

    useEffect(() => {

        if(userResult.email?.includes("@")){
            navigate('/login');
        }

    }, [userResult, navigate]);

    function confirmPasswordHandle(e: ChangeEvent<HTMLInputElement>){
        setConfirmPassword(e.target.value)
    }

    function updatedModel(e: ChangeEvent<HTMLInputElement>){

        setUserRegisterDTO({
            ...userRegisterDTO,
            [e.target.name]: e.target.value
        })
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>){

        e.preventDefault();
        
        if(confirmPassword === userRegisterDTO.password){
            try {
                await userRegistration(`/api/Users`, userRegisterDTO, setUserResult)
                alert('Usuario cadastrado com sucesso')
            } catch (error) {
                alert(error)
                alert('erro no formulário, tente novamente!')
            }

        }else{
            alert('Dados inconsistentes. Favor verificar as informações de cadastro.')
        }
    }


    return (
        <Grid container direction='row' justifyContent='center' alignItems='center'>
            <Grid alignItems='center' xs={6}>
                <Box paddingX={20}>
                    <form onSubmit={onSubmit}>
                        <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' style={{fontWeight:'bold'}}>Cadastrar</Typography>
                        
                        <TextField
                        value={userRegisterDTO.name}
                        onChange={(e:ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                        id='name' label='nome' variant ='outlined' name='name' margin='normal' fullWidth />
                        
                        <TextField 
                        value={userRegisterDTO.email}
                        onChange={(e:ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                        id='email' label='email' variant ='outlined' name='email' margin='normal' type='email' fullWidth/>
                        
                        <TextField
                        value={userRegisterDTO.password}
                        onChange={(e:ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                        id='password' label='senha' variant ='outlined' name='password' margin='normal' type='password' fullWidth/>
                        
                        <TextField
                        value={confirmPassword} 
                        onChange={(e: ChangeEvent<HTMLInputElement>) => confirmPasswordHandle(e)}
                        id='confirmPassword' label='Confirmar Senha' variant ='outlined' name='confirmPassword' margin='normal' type='password' fullWidth/>
                        
                        <TextField 
                        value={userRegisterDTO.photograph} 
                        onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                        id='photograph' label='foto' variant ='outlined' name='photograph' margin='normal' fullWidth/>
                        
                        <FormControl 
                            onChange={(e:ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            variant="outlined">
                            <InputLabel htmlFor="outlined-age-native-simple">tipo</InputLabel>
                            <Select
                            value={userRegisterDTO.type}
                            native
                            label="Tipo"
                            inputProps={{
                                name: 'type',
                                id: 'outlined-age-native-simple',
                            }}
                            >
                            <option aria-label="None" value="" />
                            <option value="NORMAL">Normal</option>
                            <option value="ADMIN">Admin</option>
                            </Select>
                        </FormControl>

                        <Box marginTop={2} textAlign='center'>
                            <Button type='submit' variant='contained' style={{ borderColor: "black", backgroundColor: "#F5ED30", color: "#000000" }}>
                                Cadastrar
                            </Button>
                        </Box>
                    </form>

                    <Box display='flex' justifyContent='center' marginTop={2}>
                        <Link to='/Login' className='text-decorator-nome2'>
                            <Typography variant='subtitle1' gutterBottom align='center' style={{fontWeight:'bold'}}>Cancelar</Typography>
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

export default UserRegister;