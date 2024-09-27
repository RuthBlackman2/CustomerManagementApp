import { TextField, Box, Snackbar, Alert } from '@mui/material';
import { useLocation } from 'react-router-dom';
import React, {useEffect, useState} from "react";
import { Link } from 'react-router-dom';


const EditPage = () => {
    const location = useLocation();

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success")

    const [record, setRecord] = useState([])
    const [mode, setMode] = useState([])
    const [heading, setHeading] = useState([])
    const [name, setName] = useState([]);
    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);

    const [changed, setChanged] = useState(false);

    useEffect(() => {
        let currentRecord  = location.state.selectedRecord;
        setRecord(currentRecord);
        let currentMode = Object.keys(currentRecord).length==0 ? 'add' : 'edit';
        setMode(currentMode);
        setHeading(currentMode === 'add' ? 'Add a new record' : 'Update an existing record');
        setName(currentMode == 'add' ? '' : currentRecord.name);
        setEmail(currentMode == 'add' ? '' : currentRecord.email);
        setPassword(currentMode == 'add' ? '' : currentRecord.password);
    }, [])

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
            if(changed){
                editAccount();
            }else{
                showSnackbar("Fields haven't changed!", "error");
            }
            
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
           
            // show success message
            showSnackbar("User created successfully!", "success");

            // set record to be new object
            let newRecord = {uid: newId, name: `${name}`, email: `${email}`, password: `${password}`}
            setRecord(newRecord);

            // set mode to be edit
            let newMode = Object.keys(newRecord).length==0 ? 'add' : 'edit';
            setMode(newMode);

            // update heading
            setHeading(newMode === 'add' ? 'Add a new record' : 'Update an existing record');

            // set changed to false
            setChanged(false);
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

            // show success message
            showSnackbar("User modified successfully!", "success");

            // set changed to false
            setChanged(false);
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
            <h1 className="text-3xl font-bold text-center text-blue-600">{heading}</h1>

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
                <br/>

                <TextField
                    label="Name"
                    data-testid="name_field"
                    onChange={e => {
                        setName(e.target.value);
                        setChanged(true)}}
                    variant="outlined"
                    color="secondary"
                    type="name"
                    sx={{width:'75%', marginBottom: 2}}
                    value={name}
                    required
                    />

                <TextField
                    label="Email"
                    data-testid="email_field"
                    onChange={e => {
                        setEmail(e.target.value);
                        setChanged(true)}}
                    variant="outlined"
                    color="secondary"
                    type="email"
                    sx={{width:'75%', marginBottom:2}}
                    value={email}
                    required
                    />

                <TextField
                    label="Password"
                    data-testid="password_field"
                    onChange={e => {
                        setPassword(e.target.value);
                        setChanged(true)}}
                    variant="outlined"
                    color="secondary"
                    type="pwd"
                    sx={{width:'75%', marginBottom:2}}
                    value={password}
                    required
                />

                <div className="pt-4 inline-grid grid-cols-3 gap-4">
                    <button data-testid="save_button" className="bg-green-300 hover:bg-green-400 text-green-800 font-bold py-2 px-4 rounded">
                        Save
                    </button>

                    <button 
                    data-testid="delete_button"
                    disabled={mode === 'add'} 
                    onClick={handleDelete}  
                    className={mode === 'add'? "bg-gray-300  text-gray-800 font-bold py-2 px-4 rounded opacity-50" : "bg-red-300 hover:bg-red-400 text-red-800 font-bold py-2 px-4 rounded"}
                    >
                        Delete
                    </button>

                    <Link data-testid="cancel_button" to="/" className="bg-orange-300 hover:bg-orange-400 text-orange-800 font-bold py-2 px-4 rounded">
                        Cancel
                    </Link>
                </div>
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