import { Avatar, Box, Typography,Button, IconButton } from '@mui/material'
import { red } from '@mui/material/colors'
import { useAuth } from '../context/AuthContext'
import ChatItem from '../components/chat/Chatitem';
import { IoMdSend } from 'react-icons/io';
import { useRef } from 'react';

const chats: Array<{ role: "user" | "assistant"; content: string }> = [
  {
    role: "user",
    content: "Hello! How can you help me?"
  },
  {
    role: "assistant",
    content: "Hi! I'm your AI assistant. I can help you with coding, learning, writing, and more."
  },
  {
    role: "user",
    content: "Explain React hooks to me."
  },
  {
    role: "assistant",
    content: "React Hooks are functions that let you use state and other React features inside functional components. Common hooks include useState, useEffect, and useContext."
  },
  {
    role: "user",
    content: "What is useState?"
  },
  {
    role: "assistant",
    content: "useState is a React Hook that lets you add and manage state in a functional component."
  }
];

const Chat = () => {
  const inputRef = useRef<HTMLInputElement|null>(null);
  const auth = useAuth();
  const handleSubmit = async () => {
    console.log(inputRef.current?.value)
  } 
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      <Box sx={{ display: { md: "flex", xs: "none", sm: "none" },flex:0.2,flexDirection:'column' }}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "60vh",
            bgcolor: "rgb(17,29,39)",
            borderRadius: 5,
            flexDirection: "column",
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
            }}
          >
            {auth?.user?.name
              ?.split(" ")
              .map((word) => word[0])
              .join("")
              .toUpperCase()}
          </Avatar>
          <Typography sx={{mx:"auto",fontFamily:"work sans"}} >You are talking to a ChatBot</Typography>
        <Typography sx={{mx:"auto",fontFamily:"work sans",my:4,p:3}} >You can ask some questions related to Knowledge,Business,Advices,Education,etc. But avoid sharing personal information</Typography>
      <Button sx={{width:"200px",my:"auto",color:'white',fontWeight:"700",borderRadius:3,mx:"auto",bgcolor:red[300],":hover":{bgcolor:red.A400}}} >
              Clear Conversation
      </Button>
        </Box>
      </Box>
      <Box sx={{display:"flex",flex:{md:0.8,xs:1,sm:1},flexDirection:'column',px:3}}>
              <Typography sx={{fontSize:"40px",color:"white",mb:2,mx:"auto"}}>
                  Model - GPT 3.5 Turbo
              </Typography>
              <Box sx={{width:"100%",height:"60vh",borderRadius:3,mx:'auto',display:'flex',flexDirection:"column",overflow:'scroll',overflowX:"hidden",overflowY:"auto",scrollBehavior:"smooth"}} >
                  {chats.map((chat,index) => (
                    <ChatItem content={chat.content} role={chat.role} key={index} />
                  ))}
              </Box>
              <div style={{width:"100%",padding:"20px",borderRadius:8,backgroundColor:"rgb(17,27,39)",display:"flex",margin:"auto"}} >
                {" "}
              <input ref={inputRef} type="text" style={{width:"100%",backgroundColor:"transparent",padding:'10px',border:'none',outline:"none",color:"white",fontSize:"20px"}} />
              <IconButton onClick={handleSubmit} sx={{ml:"auto",color:"white"}} >
                <IoMdSend/>
              </IconButton>
     </div>
      </Box>
    </Box>
  )
}

export default Chat