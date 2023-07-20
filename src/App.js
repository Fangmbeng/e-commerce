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
import Toast from './components/ToastSuccess';
import Chart from './components/Chart';
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
          flashMessage(message, 'success')
      })

  }

  
  const [message, setMessage] = useState(null);
  const [category, setCategory] = useState(null);

  
  function flashMessage(message, category){
        setMessage(message);
        setCategory(category);
    }
    
  /*const user = auth.currentUser
  localStorage.setItem('user_auth', user)*/

    const deleteGoggle=()=>{
      const user = auth.currentUser;
      deleteUser(user).then(() => {
        navigate('/')
        logUserOut()
        let message ='Account has been deleted'
        flashMessage(message, 'info')
        }).catch((error) => {
          let message = 'Error please try later'
          flashMessage(message, 'warning')
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
        flashMessage(message, 'info')
      }else{
        localStorage.removeItem('email');
        let message = "You have logged out"
        flashMessage(message, 'info')
      }
    }

    useEffect(() => {
        setValue(localStorage.getItem('email'))
    }, [])

  return (
    
    <>
    <ChakraProvider>
    <Navbar deleteGoggle={deleteGoggle} handleClick={handleClick} value={value} loggedIn={loggedIn} logUserOut={logUserOut} />
    {message ? <Toast message={message} category={category} flashMessage={flashMessage} /> : null}
    <Link to="/"><h2 className='text-center'> Blessing's Mart</h2></Link>
    <h6 className='text-center'><em>Shop the latest and Best Deals on the Market anyday anytime</em></h6>
      <Routes>
        <Route path="/" element={<Home flashMessage={flashMessage} value={value} loggedIn={loggedIn} />} />
        <Route element={<Chart flashMessage={flashMessage} value={value} loggedIn={loggedIn} />} />
        <Route path="/login" element={<Login flashMessage={flashMessage} logUserIn={logUserIn} handleClick={handleClick}/>} />
        <Route path="/sign_up" element={<SignUp flashMessage={flashMessage}/>} />
        <Route path="/rooms" element={<Rooms flashMessage={flashMessage} value={value} loggedIn={loggedIn} />} />
        <Route path="/edit" element={<Edit flashMessage={flashMessage} value={value} loggedIn={loggedIn} />} />
        <Route path="/create" element={<CreatePost value={value} flashMessage={flashMessage} loggedIn={loggedIn} />} />
        <Route path="/search" element={<Search value={value} flashMessage={flashMessage} loggedIn={loggedIn} />} />
        <Route path="/payments" element={<Payments value={value} flashMessage={flashMessage} loggedIn={loggedIn} />} />
        <Route path="/error" element={<Error value={value} flashMessage={flashMessage} loggedIn={loggedIn} />} />
        <Route path="/account" element={<Acount value={value} flashMessage={flashMessage} loggedIn={loggedIn} />} />
      </Routes>
      </ChakraProvider>
      </>
  );
}

export default App;
