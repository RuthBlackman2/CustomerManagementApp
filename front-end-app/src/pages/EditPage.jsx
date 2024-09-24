import { TextField, Button, Container, Stack } from '@mui/material';
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
            <h1>{heading}</h1>

            <form autoComplete="off" onSubmit={handleSubmit} action={<Link to="/" />}>
                <h2>Form</h2>
                <TextField
                    label="Name"
                    onChange={e => setName(e.target.value)}
                    variant="outlined"
                    color="secondary"
                    type="name"
                    sx={{mb:3}}
                    value={name}
                    />

                <TextField
                    label="Email"
                    onChange={e => setEmail(e.target.value)}
                    variant="outlined"
                    color="secondary"
                    type="email"
                    sx={{mb:3}}
                    value={email}
                    />

                <TextField
                    label="Password"
                    onChange={e => setPassword(e.target.value)}
                    variant="outlined"
                    color="secondary"
                    type="password"
                    sx={{mb:3}}
                    value={password}
                    />

                    <Button variant="outlined" color="secondary" type="submit">Save</Button>
                    <Button variant="outlined" color="secondary" disabled={mode == 'add'? true : false} onClick={handleDelete}>Delete</Button>
                    <Button variant="outlined" color="secondary" href="/">Cancel</Button>
            </form>

            
        
        </>
    ) 
};
  
  export default EditPage;