import { Box, Typography } from '@mui/material'

function Login() {
  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flex: 1 }}>
      <Box sx={{ p: 8, mt: 8, display: { md: 'flex', sm: 'none', xs: 'none' } }}>
        <img src="airbot.png" alt="Robot" style={{width:"400px"}} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flex: { xs: 1, md: 0.5 },
          justifyContent: 'center',
          alignItems: 'center',
          padding: 2,
          ml: 'auto',
          mt: 16,
        }}
      >
        <form style={{ margin: 'auto', padding: '30px', boxShadow: '10px 10px 20px #000', borderRadius: '10px', border: 'none' }}>
              <Box
             sx={{
              display:"flex",
              flexDirection:"column",
              justifyContent:"center",
             }} >
              <Typography variant='h4' align='center' sx={{ p: 2, fontWeight: 600 }}>
                login
              </Typography>
             </Box>
            </form>
      </Box>
    </Box>
  )
}

export default Login
