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

    const data = [
        { id: 1, name: "Bob Smith", email: "bob@email.com", password: "supersecure!" },
        { id: 2, name: "Jason Bell", email: "jayjay@email.com", password: "123pass" },
        { id: 3, name: "Tyrome Dave", email: "td@email.com", password: "pass1" },

    ];

    const [selectedRecord, setSelectedRecord] = useState({});

    function handleClickRow(item){    
        // if record is already selected, then unselect it
        if(item.id == selectedRecord.id){
            setSelectedRecord({});
        }else{
            setSelectedRecord(item);
        }
    }


    const [searched, setSearched] = useState("");
    const [filteredData, setFilteredData] = useState(data)



    //   useEffect(() => {
    //     console.log(selectedRecord);
    //     }, [selectedRecord])


    return (
        <>
            <h1 style={{textAlign:"center"}}>Customer Records</h1>

            {/* List of records */}
            {/* <table>
                <tr key={"header"}>
                    {Object.keys(state[0]).map((key) => (
                    <th>{key}</th>
                    ))}
                </tr>
                {state.map((item) => (
                    <tr key={item.id}>
                    {Object.values(item).map((val) => (
                        <td key={""}>{val}</td>
                    ))}
                    </tr>
                ))}
            </table> */}

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
                        {filteredData.map((item) => (
                            <TableRow
                            key={item.id}
                            onClick={() => handleClickRow(item)}
                            >
                            <TableCell component="th" scope="row">
                                {
                                    item.id==selectedRecord.id ? <p style={{fontWeight:"bold"}}>{item.name}</p> : <p>{item.name}</p>
                                }
                            </TableCell>
                            <TableCell>
                                {
                                    item.id==selectedRecord.id ? <p style={{fontWeight:"bold"}}>{item.email}</p> : <p>{item.email}</p>
                                }
                            </TableCell>
                            <TableCell>
                                {
                                    item.id==selectedRecord.id ? <p style={{fontWeight:"bold"}}>{item.password}</p> : <p>{item.password}</p>
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
            
            {/* <button disabled={Object.keys(selectedRecord).length==0}>Update</button> */}
        </>
    )
    
};
  
  export default CustomerRecords;