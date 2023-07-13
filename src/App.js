import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Rooms from './pages/Rooms';
import SignUp from './pages/SignUp';
import { useEffect, useState } from 'react';
import { signInWithPopup, deleteUser } from 'firebase/auth';
import { auth, Providers } from './config/firebase';
import AlertMessage from './components/AlerteMessage';
import Navbar from './components/Navbar';
import { useNavigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'
import Search from './pages/Search';
import CreatePost from './pages/CreatePost';
import Edit from './pages/Edit';
import Payments from './pages/Payment';
import Error from './pages/Error';


function App() {
  const [value, setValue] = useState('')

  
  const [message, setMessage] = useState(null);
  const [category, setCategory] = useState(null);
  const navigate = useNavigate();

  const now = new Date();
  const [loggedIn, setLoggedIn] = useState((localStorage.getItem('token') && new Date(localStorage.getItem('tokenExp')) > now));

  const handleClick=()=>{
      signInWithPopup(auth, Providers).then((data)=>{
          setValue(data.user.email)
          localStorage.setItem('email', data.user.email)
          navigate('/')
          flashMessage('You have successfully logged in', 'success');
      })

  }
    
  const user = auth.currentUser
  localStorage.setItem('user_auth', user)

    const deleteGoggle=()=>{
      const user = auth.currentUser;
      deleteUser(user).then(() => {
        navigate('/')
        logUserOut()
        flashMessage('Account has been deleted', 'success')
        }).catch((error) => {
          flashMessage('Error please try later', 'success')
        });
    }

    function flashMessage(message, category){
      setMessage(message);
      setCategory(category);
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
        flashMessage("You have logged out", "primary");
      }else{
        localStorage.removeItem('email');
        flashMessage("You have logged out", "primary");
      }
    }

    useEffect(() => {
        setValue(localStorage.getItem('email'))
    }, [])

  return (
    
    <>
    <ChakraProvider>
    <Navbar deleteGoggle={deleteGoggle} flashMessage={flashMessage} handleClick={handleClick} value={value} loggedIn={loggedIn} logUserOut={logUserOut} />
    <div>
      {message ? <AlertMessage message={message} category={category} flashMessage={flashMessage} /> : null}
    </div>
    <h2 className='text-center'> Blessing's Mart</h2>
    <h6 className='text-center'><em>Shop the latest and Best Deals on the Market anyday anytime</em></h6>
      <Routes>
        <Route path="/" element={<Home value={value} loggedIn={loggedIn} />} />
        <Route path="/login" element={<Login flashMessage={flashMessage} logUserIn={logUserIn} handleClick={handleClick}/>} />
        <Route path="/sign_up" element={<SignUp flashMessage={flashMessage} />} />
        <Route path="/rooms" element={<Rooms value={value} loggedIn={loggedIn} flashMessage={flashMessage} />} />
        <Route path="/edit" element={<Edit value={value} loggedIn={loggedIn} flashMessage={flashMessage} />} />
        <Route path="/create" element={<CreatePost value={value} loggedIn={loggedIn} flashMessage={flashMessage} />} />
        <Route path="/search" element={<Search value={value} loggedIn={loggedIn} flashMessage={flashMessage} />} />
        <Route path="/payments" element={<Payments value={value} loggedIn={loggedIn} flashMessage={flashMessage} />} />
        <Route path="/error" element={<Error value={value} loggedIn={loggedIn} flashMessage={flashMessage} />} />
      </Routes>
      </ChakraProvider>
      </>
  );
}

export default App;
