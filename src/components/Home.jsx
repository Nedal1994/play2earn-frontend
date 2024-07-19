import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, DollarSign, Users } from 'lucide-react';
import { FaTwitter, FaInstagram, FaGithub, FaDiscord, FaTelegramPlane, FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../App.css';
import { CustomPrevArrow, CustomNextArrow } from './ui/CustomArrows';
import { getAuth, signInWithEmailAndPassword, signInWithPopup,createUserWithEmailAndPassword,sendPasswordResetEmail  } from 'firebase/auth';
import { app } from '../config/fb';
import { GoogleAuthProvider } from 'firebase/auth';

const handlePasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(getAuth(app), email);
    alert('Password reset email sent. Please check your email.');
  } catch (error) {
    console.error('Error sending password reset email:', error);
    alert(error.message.replace('Firebase: ', '')); 
  }
};

const handleGoogle = async () => {
  try {
    const auth = getAuth(app);
    await signInWithPopup(auth, new GoogleAuthProvider());
  } catch (error) {
    console.error('Error signing in with Google:', error);
    alert(error.message.replace('Firebase: ', '')); 
  }
};

const LoginPopup = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(getAuth(app), email, password);
      onClose();
    } catch (error) {
      console.error('Error during email/password sign-in:', error);
      alert(error.message.replace('Firebase: ', '')); 
    }
  };

  if (!isOpen) return null;

  return (
         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
         <div className="bg-white backdrop-blur-lg rounded-[20px] shadow-lg p-6 max-w-sm w-full border border-gray-300">
         <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Login</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">&times;</button>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input
               placeholder="example@gmail.com"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
               style={{ 
    width: 'calc(100% - 0.5rem)',
    backgroundColor: '#d5dbdb30',
    borderBottom: '1px solid rgba(193, 199, 205, 1)'  
  }}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
            <input
              placeholder="Enter your password"
  id="password"
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"

  style={{ 
    width: 'calc(100% - 0.5rem)',
    backgroundColor: '#d5dbdb30',
    borderBottom: '1px solid rgba(193, 199, 205, 1)'  
  }}
/>

          </div>
          <div className="mb-4 text-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full mb-3"
            >
              Login
            </button>
            <Link className="text-blue-500" onClick={() => handlePasswordReset(email)}>Forgot password?</Link>
          </div>
        </form>
        <div className="flex items-center justify-center mb-4">
          <span className="text-gray-600">OR</span>
        </div>
        {/* Google login button */}
           <button
  onClick={handleGoogle}
  className="bg-gray-100 border border-blue-500 text-white font-small py-2 px-4 rounded-lg flex items-center justify-center w-full mb-3 text-base"
  style={{ backgroundColor: 'rgba(242, 244, 248, 1)', borderColor: 'rgba(15, 98, 254, 1)', color: 'rgba(15, 98, 254, 1)' }}
>
  <FaGoogle className="mr-2" /> Sign up with Google
</button>
       
        <div className="flex justify-between items-center">
          <span>Don't have an account? <Link to="#" onClick={SignUpPopup} className="text-blue-500">Sign up</Link></span>
        </div>
      </div>
    </div>
  );
};

const SignUpPopup = ({ isOpen, onClose }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth(app);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await user.updateProfile({
        displayName: `${firstName} ${lastName}`,
      });

      onClose();
    } catch (error) {
      console.error('Error during sign-up:', error);
      setError(error.message.replace('Firebase: ', '')); // Remove "Firebase: " from the error message
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white backdrop-blur-lg rounded-[20px] shadow-lg p-6 max-w-sm w-full border border-gray-300">
    <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Sign up</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">&times;</button>
        </div>
        <form onSubmit={handleSignUp}>
          <div className="flex mb-4 space-x-4">
            <div className="w-3/5">
              <label className="block text-gray-700 text-sm font mb-2" htmlFor="firstName">First Name</label>
              <input
                placeholder="Enter First Name"
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
 style={{ 
    width: 'calc(100% - 0.5rem)',
    backgroundColor: '#d5dbdb30',
    borderBottom: '1px solid rgba(193, 199, 205, 1)'  
  }}              />
            </div>
            <div className="w-3/5">
              <label className="block text-gray-700 text-sm font mb-2" htmlFor="lastName">Last Name</label>
              <input
                placeholder="Enter Last Name"
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                style={{ 
    width: 'calc(100% - 0.5rem)',
    backgroundColor: '#d5dbdb30',
    borderBottom: '1px solid rgba(193, 199, 205, 1)'  
  }} 
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm font mb-2" htmlFor="email">Email</label>
            <input
               placeholder="example@gmail.com"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required  style={{ 
    width: 'calc(100% - 0.5rem)',
    backgroundColor: '#d5dbdb30',
    borderBottom: '1px solid rgba(193, 199, 205, 1)'  
  }} 
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font mb-2" htmlFor="password">Password</label>
            <input
               placeholder="Enter your password"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required style={{ 
    width: 'calc(100% - 0.5rem)',
    backgroundColor: '#d5dbdb30',
    borderBottom: '1px solid rgba(193, 199, 205, 1)'  
  }} 
              
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-4 text-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full mb-3"
            >
              Sign up
            </button>
          </div>
        </form>
        <div className="flex items-center justify-center mb-4">
          <span className="text-gray-600">OR</span>
        </div>
        {/* Google login button */}
     <button
  onClick={handleGoogle}
  className="bg-gray-100 border border-blue-500 text-white font-small py-2 px-4 rounded-lg flex items-center justify-center w-full mb-3 text-base"
  style={{ backgroundColor: 'rgba(242, 244, 248, 1)', borderColor: 'rgba(15, 98, 254, 1)', color: 'rgba(15, 98, 254, 1)' }}
>
  <FaGoogle className="mr-2" /> Sign up with Google
</button>

        <div className="flex justify-between items-center">
          <span>Already have an account? <Link to="#" onClick={LoginPopup} className="text-blue-500">Login</Link></span>
        </div>
      </div>
    </div>
  );
};


const Home = () => {
  const taskTypes = useMemo(() => [
    { icon: DollarSign, title: "Staking Coins", description: "Increase volume by staking coins" },
    { icon: FaTwitter, title: "Twitter Growth", description: "Gain followers on Twitter" },
    { icon: FaDiscord, title: "Discord Engagement", description: "Participate in Discord communities" },
    { icon: FaTelegramPlane, title: "Telegram Tasks", description: "Engage with Telegram groups" },
  ], []);
  
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
  const [isSignUpPopupOpen, setSignUpPopupOpen] = useState(false);

  const handleLoginClick = () => {
    setLoginPopupOpen(true);
  };

  const handleSignUpClick = () => {
    setSignUpPopupOpen(true);
  };

  const closeLoginPopup = () => {
    setLoginPopupOpen(false);
  };

  const closeSignUpPopup = () => {
    setSignUpPopupOpen(false);
  };

  const [heroCards] = useState([
    {
      title: "Complete Tasks, Earn Reward",
      description: "Join our platform to tackle exciting tasks and get paid for your skills!",
      image: "assets/pic2.jpg"
    },
    {
      title: "Another Company",
      description: "Description for another company.",
      reward: "0.05 ~ $0.05",
      image: "assets/pic1.png"
    },
    {
      title: "Another Company",
      description: "Description for another company.",
      reward: "0.05 ~ $0.05",
      image: ""
    },
  ]);

  const sliderSettings = useMemo(() => ({
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        }
      }
    ]
  }), []);

  const partnerLogos = useMemo(() => [
    "/api/placeholder/150/50",
    "/api/placeholder/150/50",
    "/api/placeholder/150/50",
    "/api/placeholder/150/50",
    "/api/placeholder/150/50",
  ], []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-b from-blue-500 to-blue-300 text-white p-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0">Play2Earn</h1>
          <nav className="flex flex-wrap justify-center md:justify-end items-center">
            <Link to="/home" className="text-white hover:text-blue-200 mx-2 my-1">Home</Link>
            <Link to="/earn" className="text-white hover:text-blue-200 mx-2 my-1">Earn</Link>
            <Link to="/leaderboard" className="text-white hover:text-blue-200 mx-2 my-1">Leaderboard</Link>
            <Link to="/referrals" className="text-white hover:text-blue-200 mx-2 my-1">Referrals</Link>
            <Link to="/help-and-support" className="text-white hover:text-blue-200 mx-2 my-1">Help and Support</Link>
            <Link onClick={handleLoginClick} className="text-white hover:text-blue-200 mx-2 my-1">Login</Link>
            <Link onClick={handleSignUpClick} className="text-white hover:text-blue-200 mx-2 my-1">Sign Up</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-10 md:py-20">
        <div className="container mx-auto px-4">
          <Slider {...sliderSettings}>
            {heroCards.map((card, index) => (
              <div key={index} className="relative h-[300px] md:h-[500px]">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${card.image})` }}
                />
                <div className="relative h-full flex flex-col justify-center items-center text-center text-white bg-black bg-opacity-50 p-4 md:p-8">
                  <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">{card.title}</h2>
                  <p className="text-base md:text-xl mb-4 md:mb-8">{card.description}</p>
                  <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white">
                    Learn More
                  </Button>
                  {card.reward && (
                    <div className="mt-2 md:mt-4 text-gray-200">{card.reward}</div>
                  )}
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Task Types Section */}
      <section className="py-10 md:py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Tasks We Offer</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {taskTypes.map((task, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg md:text-xl">
                      <task.icon className="mr-2 text-blue-500" />
                      {task.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm md:text-base">
                    {task.description}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-10 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Why Choose Us?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {[
              { icon: CheckCircle, title: "Diverse Tasks", description: "Find tasks that match your skills and interests." },
              { icon: DollarSign, title: "Fair Compensation", description: "Get paid competitively for your time and effort." },
              { icon: Users, title: "Growing Community", description: "Join a vibrant community of taskmasters." }
            ].map((feature, index) => (
              <motion.div key={index} whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg md:text-xl">
                      <feature.icon className="mr-2 text-blue-500" />
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm md:text-base">
                    {feature.description}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Companies Section */}
      <section className="py-10 md:py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Our Partner Companies</h3>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
            {partnerLogos.map((logo, index) => (
              <motion.img
                key={index}
                src={logo}
                alt={`Partner ${index + 1}`}
                className="h-8 md:h-12 object-contain"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 md:py-20 bg-blue-100">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">Ready to Start Earning?</h3>
          <p className="text-base md:text-xl mb-4 md:mb-8">Create your account today and dive into a world of opportunities.</p>
          <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white" onClick={isLoginPopupOpen}>Sign Up Now</Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-blue-300 to-blue-500 text-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xl md:text-2xl font-bold mb-4">Play2Earn</h4>
              <p className="text-sm md:text-base">Empowering individuals to earn through meaningful tasks.</p>
            </div>
            <div>
              <h5 className="text-lg md:text-xl font-semibold mb-4">Quick Links</h5>
              <ul className="text-sm md:text-base">
                <li><Link to="/about" className="hover:text-blue-200">About Us</Link></li>
                <li><Link to="/faq" className="hover:text-blue-200">FAQ</Link></li>
                <li><Link to="/privacy" className="hover:text-blue-200">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-blue-200">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg md:text-xl font-semibold mb-4">Connect With Us</h5>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-blue-200"><FaTwitter size={24} /></a>
                <a href="#" className="hover:text-blue-200"><FaInstagram size={24} /></a>
                <a href="#" className="hover:text-blue-200"><FaGithub size={24} /></a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-blue-400 text-center text-sm md:text-base">
            <p>&copy; 2024 Play2Earn. All rights reserved.</p>
          </div>
        </div>
      </footer>

      

      {/* Signup and login Popup */}
      <LoginPopup isOpen={isLoginPopupOpen} onClose={closeLoginPopup} />
      <SignUpPopup isOpen={isSignUpPopupOpen} onClose={closeSignUpPopup} />
    </div>
  );
};

export default Home;
