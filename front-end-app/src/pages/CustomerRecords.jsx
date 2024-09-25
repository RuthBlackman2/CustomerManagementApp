import { useEffect, useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Box } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import '../assets/styles.css';

const CustomerRecords = () => {
    const columns = [
        { field: 'uid', headerName: 'ID', width: 110 },
        { field: 'name', headerName: 'Name', width: 280,},
        { field: 'email', headerName: 'Email', width: 280,},
        { field: 'password', headerName: 'Password', width: 280,},
      ];

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
        if(item.row.uid == selectedRecord.uid){
            setSelectedRecord({});
        }else{
            setSelectedRecord(item.row);
        }
    }

    return (
        <>
            <h1 style={{textAlign:"center"}}>Customer Records</h1>

            <Box sx={{ 
                height: 631,  
                width: '50%',  
                margin: '0 auto',    
                padding: 2, 
                borderColor: "primary",  
                }}>
                <DataGrid
                    rows={fetchedData}
                    getRowId={(row) => row.uid}
                    columns={columns}
                    onRowClick={(row) => handleClickRow(row)}
                    getRowClassName={(params) =>
                        params.row.uid == selectedRecord.uid ? 'selected-row' : ''
                    }
                    disableSelectionOnClick
                    disableColumnResize
                    hideFooterSelectedRowCount
                    initialState={{
                    pagination: {
                        paginationModel: {
                        pageSize: 10,
                        },
                    },
                    }}
                    pageSizeOptions={[10]}
                />
            </Box>

            <Box
            sx={{ 
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                padding: 2, 
                borderColor: "primary",  
                }}>
                <Button
                    variant="outlined" 
                    color="secondary" 
                    disabled={Object.keys(selectedRecord).length!=0}>
                        <Link style={{textDecoration:"none", color:"inherit"}} to="/edit" state={{selectedRecord}}>
                            Add
                        </Link>
                </Button>

                <Button 
                    sx={{marginLeft: 5}}
                    variant="outlined" 
                    color="secondary" 
                    disabled={Object.keys(selectedRecord).length==0}>
                        <Link 
                        style={{textDecoration:"none", color: Object.keys(selectedRecord).length === 0 ? 'grey' : 'inherit' }} 
                        to="/edit" state={{selectedRecord}}>
                            Update
                        </Link>
                </Button>
            </Box>
        </>
    )
    
};
  
  export default CustomerRecords;