import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import styled from 'styled-components';
import { CircularProgress } from '@mui/material';
const Icon = styled.img`
	width: 10vw;
`;

export default function LoadingScreen() {
	const [open] = React.useState(true);
	/*  const handleClose = () => {
    setOpen(false);
  }; */


  
	return (
		<div>
			<Backdrop
				sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={open}
				//onClick={handleClose}
			>
				<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				<p className='text-center' style={{fontWeight: 'bold'}}>Please wait ...</p> 
				<div class="spinner-grow mt-2" role="status">
				</div>
				
  
               </div>
			</Backdrop>
		</div>
	);
}
