import  { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/login', { username, password });
      localStorage.setItem('token', res.data.token);
      setSnackbarMessage('Login successful!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      navigate('/todos');
    } catch (err) {
      setSnackbarMessage('Invalid credentials');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseEnter = (e) => {
    const hlLine = e.currentTarget.querySelector('.hl-line');
    if (hlLine) {
      hlLine.style.strokeDashoffset = '-480';
    }
  };

  const handleMouseLeave = (e) => {
    const hlLine = e.currentTarget.querySelector('.hl-line');
    if (hlLine) {
      hlLine.style.strokeDashoffset = '0';
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      {/* Main login section */}
      <section className='login h-screen w-screen flex justify-center items-center'>
        <div className='text-white bg-[#00000065] border-2 border-solid border-[#6a90ff] rounded-lg p-[20px] relative backdrop-blur-sm w-[400px] h-[400px]'>
          <div className='border-b-2 border-solid border-[#6a90ff] mb-6'>
            <h2 className='font-bold text-center py-[20px] text-[25px]'>Login</h2>
          </div>

          <form onSubmit={handleLogin}>
            <div className='flex flex-col items-center gap-[10px] p-[10px]'>
              <input
                className='focus-visible:outline-none bg-transparent w-[90%] p-[10px] border-b-2 border-solid border-gray-400'
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />

              <div className="relative w-[90%]">
                <input
                  className='w-full p-[10px] border-b-2 focus-visible:outline-none bg-transparent border-solid border-gray-400 pr-10'
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="absolute right-2 top-[12px] text-gray-400 hover:text-gray-200"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>

              <button
                className='relative my-5 rounded-md w-[180px] h-[60px] font-bold flex items-center justify-center'
                type="submit"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <svg width="180px" height="60px" viewBox="0 0 180 60" className="absolute top-0 left-0">
                  <polyline
                    points="179,1 179,59 1,59 1,1 179,1"
                    className="bg-line"
                    style={{
                      fill: 'none',
                      stroke: '',
                      strokeWidth: '2',
                      strokeDasharray: '480',
                      strokeDashoffset: '150',
                      transition: 'stroke-dashoffset 1s ease',
                    }}
                  />
                  <polyline
                    points="179,1 179,59 1,59 1,1 179,1"
                    className="hl-line"
                    style={{
                      fill: 'none',
                      stroke: '#6a90ff',
                      strokeWidth: '2',
                      strokeDasharray: '480',
                      strokeDashoffset: '0',
                      transition: 'stroke-dashoffset 1s ease',
                    }}
                  />
                </svg>
                <span className='relative z-10'>Login</span>
              </button>
            </div>
          </form>

          <p className='w-full text-center'>Don't have an account? <Link className='text-[#6a90ff]' to="/register">Register</Link></p>
        </div>
      </section>

      {/* Snackbar for Toast Notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Top right corner of the page
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
