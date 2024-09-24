import { TextField, Button, Container, Stack, Box } from '@mui/material';
import { Link } from "react-router-dom"
import { useLocation } from 'react-router-dom';
import React, {useState} from "react";


const EditPage = () => {
    const location = useLocation();
    //console.log(location); 
    //console.log(location.state);

    const record = location.state.selectedRecord;
    const mode = Object.keys(record).length==0 ? 'add' : 'edit';
    const heading = mode === 'add' ? 'Add a new record' : 'Edit an existing record';

    const [name, setName] = useState(mode == 'add' ? '' : record.name);
    const [email, setEmail] = useState(mode == 'add' ? '' : record.email);
    const [password, setPassword] = useState(mode == 'add' ? '' : record.password);

    function handleSubmit(event){   
        event.preventDefault()
        console.log(name, email, password);
    }

    function handleDelete(event){
        console.log("delete ", record)
    }



    return (
        <>
            <h1 style={{textAlign: "center"}}>{heading}</h1>

            {/* <form autoComplete="off" onSubmit={handleSubmit}> */}
            <Box
            component="form"  
            sx={{
                width: '50%',  // Set width to 50%
                margin: '0 auto',  // Center the form
                display: 'flex',  // Use flexbox for vertical alignment
                flexDirection: 'column',  // Align items in a column
                alignItems: 'center',  // Center items horizontally
                padding: 2, 
                borderColor: "primary", 
             //   boxShadow: 1,  // Optional: add some shadow for visual appeal
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
            
        
        </>
    ) 
};
  
  export default EditPage;