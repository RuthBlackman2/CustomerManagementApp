import { TextField, Button, Container, Stack, Box, Snackbar, Alert } from '@mui/material';
import { Link, useNavigate } from "react-router-dom"
import { useLocation } from 'react-router-dom';
import React, {useState} from "react";


const EditPage = () => {
    let navigate = useNavigate(); 

    const location = useLocation();
    //console.log(location); 
    //console.log(location.state);

    const record = location.state.selectedRecord;
    const mode = Object.keys(record).length==0 ? 'add' : 'edit';
    const heading = mode === 'add' ? 'Add a new record' : 'Edit an existing record';

    const [name, setName] = useState(mode == 'add' ? '' : record.name);
    const [email, setEmail] = useState(mode == 'add' ? '' : record.email);
    const [password, setPassword] = useState(mode == 'add' ? '' : record.password);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success")

    const showSnackbar = (message, severity) =>{
        setOpenSnackbar(true);
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
    }

    const resetFields = () => {
        setName('');
        setEmail('');
        setPassword('');
    };

    function handleSubmit(event){   
        event.preventDefault()

        if(mode == 'add'){
            // add new account
            createAccount();
        }else {
            // edit existing account
            editAccount();
        }
    }

    const createAccount = async () =>{
        try{

            const response = await fetch(`${import.meta.env.VITE_CUSTOMERS_API_URL}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"name": `${name}`, "email": `${email}`, "password": `${password}`})
            })

            if(!response.ok){
                throw new Error(`${response.status} ${response.statusText}`)
            }

            const data = await response.json()
            const newId= data.message.match(/\d+/)[0];
            // console.log(data)
           
            // show success message
            showSnackbar("User created successfully!", "success");
        } catch (error){
            console.error(error)

            // show error message
            showSnackbar(`${error}`, "error");
        }   
    }

    const editAccount = async () => {
        try{

            const response = await fetch(`${import.meta.env.VITE_CUSTOMERS_API_URL}/${record.uid}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"name": `${name}`, "email": `${email}`, "password": `${password}`})
            })

            if(!response.ok){
                throw new Error(`${response.status} ${response.statusText}`)
            }

            const data = await response.json()
            // console.log(data)

            // show success message
            showSnackbar("User modified successfully!", "success");
        } catch (error){
            console.error(error)

            // show error message
            showSnackbar(`${error}`, "error");
        }   
    }

    const handleDelete = async (event) =>{
        try{
            const response = await fetch(`${import.meta.env.VITE_CUSTOMERS_API_URL}/${record.uid}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if(!response.ok){
                throw new Error(`${response.status} ${response.statusText}`)
            }

            const data = await response.json()
            // console.log(data)

            // show success message
            showSnackbar("User deleted successfully!", "success");

            // reset fields in form
            resetFields();
        } catch (error){
            console.error(error)

            // show error message
            showSnackbar(`${error}`, "error");
        }
    }

    const handleClose = () => {
        setOpenSnackbar(false);
    };

    return (
        <>
            <h1 style={{textAlign: "center"}}>{heading}</h1>

            {/* <form autoComplete="off" onSubmit={handleSubmit}> */}
            <Box
            component="form"  
            sx={{
                width: '50%',  
                margin: '0 auto',  
                display: 'flex',  
                flexDirection: 'column', 
                alignItems: 'center',  
                padding: 2, 
                borderColor: "primary", 
            }}
            autoComplete="off"  
            onSubmit={handleSubmit}
            >
                <h2>Form</h2>
                <TextField
                    label="Name"
                    onChange={e => setName(e.target.value)}
                    variant="outlined"
                    color="secondary"
                    type="name"
                    sx={{width:'75%', marginBottom: 2}}
                    value={name}
                    />

                <TextField
                    label="Email"
                    onChange={e => setEmail(e.target.value)}
                    variant="outlined"
                    color="secondary"
                    type="email"
                    sx={{width:'75%', marginBottom:2}}
                    value={email}
                    />

                <TextField
                    label="Password"
                    onChange={e => setPassword(e.target.value)}
                    variant="outlined"
                    color="secondary"
                    type="pwd"
                    sx={{width:'75%', marginBottom:2}}
                    value={password}
                    />

                    <Button variant="outlined" color="secondary" type="submit" style={{marginBottom:10}}>Save</Button>
                    <Button variant="outlined" color="secondary" style={{marginBottom:10}} disabled={mode == 'add'? true : false} onClick={handleDelete}>Delete</Button>
                    <Button variant="outlined" color="secondary" style={{marginBottom:10}} href="/">Cancel</Button>
            {/* </form> */}
            </Box>
            
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity={snackbarSeverity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    ) 
};
  
  export default EditPage;