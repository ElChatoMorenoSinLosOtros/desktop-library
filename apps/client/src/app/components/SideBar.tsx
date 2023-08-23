import LogoutIcon from '@mui/icons-material/Logout';
import { Button, Stack, ThemeProvider, createTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff'
    }
  },
  typography: {
    fontSize: 20,
    button: {
      textTransform: 'none'
    }
    // fontFamily: ['Roboto'].join(',')
  },
  components: {
    MuiStack: {
      defaultProps: {
        direction: 'column',
        justifyContent: 'flex-start',
        spacing: 2
      },
      styleOverrides: {
        root: {
          alignItems: 'stretch'
        }
      }
    }
  }
});

const buttons = [
  <Button key='Menu' style={{ textAlign: 'left' }}>
    Menu
  </Button>,
  <Button key='User Management'>User Management</Button>,
  <Button key='Material Management'>Material Management</Button>,
  <Button key='Loan Management'>Loan Management</Button>,
  <Button key='Fine Management'>Fine Management</Button>,
  <Button key='Reservation Management'>Reservation Management</Button>,
  <Button key='Dashboard'>Dashboard</Button>
];

function SideBar() {
  return (
    <div className='bg-gray-800 space-y-6 h-screen w-1/5 py-4 px-4 text-white'>
      <div className='flex gap-x-4 items-center'>
        <img src='./src/assets/logos/linux.png' alt='logo' className='h-16' />
        <h1 className='font-bold text-2xl cursor-default'>The Library</h1>
      </div>
      <div className='px-5'>
        <div className='flex justify-center items-center gap-x-5 cursor-pointer'>
          <Avatar alt='Profile picture' sx={{ width: 50, height: 50 }} />
          <ul className='text-grey'>
            <li>
              <p>username</p>
            </li>
            <li>
              <p className='cursor-default'>rol</p>
            </li>
          </ul>
        </div>
        <div className='py-5'>
          <ThemeProvider theme={theme}>
            <Stack aria-label='menu list'>{buttons}</Stack>
          </ThemeProvider>
        </div>
        <div className='absolute bottom-4'>
          <IconButton>
            <LogoutIcon fontSize='large' color='primary' />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
export default SideBar;
