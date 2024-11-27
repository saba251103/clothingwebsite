import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/material';
import './App.css';
export default function Latest() {
  return (
    <div className='latest'>
    <Box sx={{justifyContent:'center',alignContent:'center'}} >
    <Stack spacing={10}>
      <Pagination count={10} shape="rounded" size="large" sx={{width:'600',justifyContent:'center',alignContent:'center'}} />
    </Stack>
    </Box>
    </div>
      );
      }
