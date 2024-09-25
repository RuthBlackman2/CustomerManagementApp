import { useEffect, useState } from "react";
import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const CustomerRecords = () => {
    // const data = [
    //     { id: 1, name: "Bob Smith", email: "bob@email.com", password: "supersecure!" },
    //     { id: 2, name: "Jason Bell", email: "jayjay@email.com", password: "123pass" },
    //     { id: 3, name: "Tyrome Dave", email: "td@email.com", password: "pass1" },

    // ];

    const [fetchedData, setFetchedData] = useState([]); // use [] to make it wait for data to be fetched
    const [selectedRecord, setSelectedRecord] = useState({});

    useEffect(() => {
        fetch(`${import.meta.env.VITE_CUSTOMERS_API_URL}`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
            setFetchedData(data);
        });
    }, [])

    function handleClickRow(item){    
        // if record is already selected, then unselect it
        if(item.uid == selectedRecord.uid){
            setSelectedRecord({});
        }else{
            setSelectedRecord(item);
        }
    }

    return (
        <>
            <h1 style={{textAlign:"center"}}>Customer Records</h1>

            <Paper>
                {/* <TableContainer */}
                    <Table size="small" aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell >Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Password</TableCell>
                        </TableRow>
                        </TableHead>

                        <TableBody>
                        {fetchedData.map((item) => (
                            <TableRow
                            key={item.uid}
                            onClick={() => handleClickRow(item)}
                            >
                            <TableCell component="th" scope="row">
                                {
                                    item.uid==selectedRecord.uid ? <p style={{fontWeight:"bold"}}>{item.name}</p> : <p>{item.name}</p>
                                }
                            </TableCell>
                            <TableCell>
                                {
                                    item.uid==selectedRecord.uid ? <p style={{fontWeight:"bold"}}>{item.email}</p> : <p>{item.email}</p>
                                }
                            </TableCell>
                            <TableCell>
                                {
                                    item.uid==selectedRecord.uid ? <p style={{fontWeight:"bold"}}>{item.password}</p> : <p>{item.password}</p>
                                }
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>

                    </Table>
                {/* </TableContainer> */}     
            </Paper>

            <Button 
                variant="outlined" 
                color="secondary" 
                disabled={Object.keys(selectedRecord).length!=0}>
                    <Link style={{textDecoration:"none", color:"inherit"}} to="/edit" state={{selectedRecord}}>
                        Add
                    </Link>
            </Button>

            <Button 
                variant="outlined" 
                color="secondary" 
                disabled={Object.keys(selectedRecord).length==0}>
                    <Link 
                    style={{textDecoration:"none", color: Object.keys(selectedRecord).length === 0 ? 'grey' : 'inherit' }} 
                    to="/edit" state={{selectedRecord}}>
                        Update
                    </Link>
            </Button>
        </>
    )
    
};
  
  export default CustomerRecords;