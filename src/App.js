import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Rooms from './pages/Rooms';
import SignUp from './pages/SignUp';
import { useEffect, useState } from 'react';
import { signInWithPopup, deleteUser } from 'firebase/auth';
import { auth, Providers } from './config/firebase';
import Navbar from './components/Navbar';
import { useNavigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'
import Search from './pages/Search';
import CreatePost from './pages/CreatePost';
import Edit from './pages/Edit';
import Payments from './pages/Payment';
import Error from './pages/Error';
import Acount from './pages/Acount';
import ToastInfo from './components/ToastInfo';
import Warning from './components/Toastify';
import ToastSuccess from './components/ToastSuccess';
//import { io } from 'socket.io-client';


function App() {
  const [value, setValue] = useState('')
  const navigate = useNavigate();
 /* const [socket, setSocket]= useState(null)
  
  const user = localStorage.getItem('user')

  useEffect(()=>{
    const socket = io("http://localhost:5000");
    console.log(socket)
  }, [])

  useEffect(()=>{
    socket.emit('newUser', user);
  }, [socket, user])*/

  const now = new Date();
  const [loggedIn, setLoggedIn] = useState((localStorage.getItem('token') && new Date(localStorage.getItem('tokenExp')) > now));

  const handleClick=()=>{
      signInWithPopup(auth, Providers).then((data)=>{
          setValue(data.user.email)
          localStorage.setItem('email', data.user.email)
          navigate('/')
          let message ='You have successfully logged in'
          return <ToastSuccess message={message}/>
      })

  }
    
  /*const user = auth.currentUser
  localStorage.setItem('user_auth', user)*/

    const deleteGoggle=()=>{
      const user = auth.currentUser;
      deleteUser(user).then(() => {
        navigate('/')
        logUserOut()
        let message ='Account has been deleted'
        return <ToastInfo message={message}/>
        }).catch((error) => {
          let message = 'Error please try later'
          return <Warning message={message}/>
        });
    }



    function logUserIn(){
      setLoggedIn(true);
    }

    function logUserOut(){
      if(loggedIn){
        setLoggedIn(false);
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExp');
        localStorage.removeItem('username')
        localStorage.removeItem('id')
        window.location.reload()
        let message = "You have logged out"
        return <ToastInfo message={message}/>
      }else{
        localStorage.removeItem('email');
        let message = "You have logged out"
        return <ToastInfo message={message}/>
      }
    }

    useEffect(() => {
        setValue(localStorage.getItem('email'))
    }, [])

  return (
    
    <>
    <ChakraProvider>
    <Navbar deleteGoggle={deleteGoggle} handleClick={handleClick} value={value} loggedIn={loggedIn} logUserOut={logUserOut} />
    <Link to="/"><h2 className='text-center'> Blessing's Mart</h2></Link>
    <h6 className='text-center'><em>Shop the latest and Best Deals on the Market anyday anytime</em></h6>
      <Routes>
        <Route path="/" element={<Home value={value} loggedIn={loggedIn} />} />
        <Route path="/login" element={<Login logUserIn={logUserIn} handleClick={handleClick}/>} />
        <Route path="/sign_up" element={<SignUp />} />
        <Route path="/rooms" element={<Rooms value={value} loggedIn={loggedIn} />} />
        <Route path="/edit" element={<Edit value={value} loggedIn={loggedIn} />} />
        <Route path="/create" element={<CreatePost value={value} loggedIn={loggedIn} />} />
        <Route path="/search" element={<Search value={value} loggedIn={loggedIn} />} />
        <Route path="/payments" element={<Payments value={value} loggedIn={loggedIn} />} />
        <Route path="/error" element={<Error value={value} loggedIn={loggedIn} />} />
        <Route path="/account" element={<Acount value={value} loggedIn={loggedIn} />} />
      </Routes>
      </ChakraProvider>
      </>
  );
}

export default App;
