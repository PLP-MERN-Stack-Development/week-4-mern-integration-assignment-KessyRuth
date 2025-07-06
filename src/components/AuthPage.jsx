import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, User, Mail, Lock, Check, Construction } from 'lucide-react';

const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
    
  });
  
  const [signUpData, setSignUpData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Check if user is already logged in
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (userData.isLoggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSignIn = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      // Get stored user data
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const user = storedUsers.find(u => u.email === signInData.email && u.password === signInData.password);
      
      if (user) {
        localStorage.setItem('userData', JSON.stringify({
          ...user,
          isLoggedIn: true,
          loginTime: new Date().toISOString()
        }));
        setIsLoggedIn(true);
      } else {
        alert('Invalid credentials');
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (signUpData.password !== signUpData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const newUser = {
        id: Date.now(),
        name: signUpData.name,
        email: signUpData.email,
        password: signUpData.password,
        createdAt: new Date().toISOString()
      };
      
      storedUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(storedUsers));
      localStorage.setItem('userData', JSON.stringify({
        ...newUser,
        isLoggedIn: true,
        loginTime: new Date().toISOString()
      }));
      
      setIsLoggedIn(true);
      setIsLoading(false);
    }, 1500);
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    setIsLoggedIn(false);
    setSignInData({ email: '', password: '' });
    setSignUpData({ name: '', email: '', password: '', confirmPassword: '' });
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          {/* Success Card */}
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <Check className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Welcome Back!</h2>
              <p className="text-gray-300">Successfully logged in</p>
            </div>
            
            {/* Construction Notice */}
            <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl p-6 mb-6 border border-amber-500/30">
              <div className="flex items-center justify-center mb-3">
                <Construction className="w-8 h-8 text-amber-400 animate-pulse mr-2" />
                <span className="text-amber-400 font-semibold">Under Construction</span>
              </div>
              <p className="text-gray-300 text-sm">
                This page is currently being developed. More features coming soon!
              </p>
              <div className="mt-4 flex space-x-1 justify-center">
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      <div className="relative min-h-screen flex">
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Main Container */}
        <div className="relative z-10 w-full flex">
          
          {/* Form Section */}
          <div className={`w-full lg:w-1/2 flex items-center justify-center p-8 transition-all duration-700 ease-in-out ${
            isSignIn ? 'lg:order-1' : 'lg:order-2'
          }`}>
            <div className="w-full max-w-md">
              
              {/* Glassmorphism Container with Glowing Border */}
              <div className="relative">
                {/* Simple Glowing Border */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl opacity-60 animate-pulse"></div>
                
                {/* Form Container */}
                <div className="relative backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
                  
                  {/* Toggle Buttons */}
                  <div className="flex mb-8 bg-white/5 rounded-2xl p-1 backdrop-blur-sm">
                    <button
                      onClick={() => setIsSignIn(true)}
                      className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                        isSignIn
                          ? 'bg-blue-500/80 text-white shadow-lg'
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => setIsSignIn(false)}
                      className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                        !isSignIn
                          ? 'bg-blue-500/80 text-white shadow-lg'
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      Sign Up
                    </button>
                  </div>

                  {/* Forms Container */}
                  <div className="relative">
                    {/* Sign In Form */}
                    <div className={`transition-all duration-700 ease-in-out ${
                      !isSignIn ? 'opacity-0 pointer-events-none absolute inset-0' : 'opacity-100'
                    }`}>
                      <form onSubmit={handleSignIn} className="space-y-6">
                        <h2 className="text-3xl font-bold text-white mb-6 text-center">
                          Welcome Back
                        </h2>
                        
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="email"
                            placeholder="Email"
                            value={signInData.email}
                            onChange={(e) => setSignInData({...signInData, email: e.target.value})}
                            className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                            required
                          />
                        </div>
                        
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={signInData.password}
                            onChange={(e) => setSignInData({...signInData, password: e.target.value})}
                            className="w-full pl-12 pr-12 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                        
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="w-full bg-blue-500/80 hover:bg-blue-600/80 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isLoading ? (
                            <div className="flex items-center justify-center">
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                              Signing In...
                            </div>
                          ) : (
                            'Sign In'
                          )}
                        </button>
                      </form>
                    </div>

                    {/* Sign Up Form */}
                    <div className={`transition-all duration-700 ease-in-out ${
                      isSignIn ? 'opacity-0 pointer-events-none absolute inset-0' : 'opacity-100'
                    }`}>
                      <form onSubmit={handleSignUp} className="space-y-6">
                        <h2 className="text-3xl font-bold text-white mb-6 text-center">
                          Create Account
                        </h2>
                        
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="text"
                            placeholder="Full Name"
                            value={signUpData.name}
                            onChange={(e) => setSignUpData({...signUpData, name: e.target.value})}
                            className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                            required
                          />
                        </div>
                        
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="email"
                            placeholder="Email"
                            value={signUpData.email}
                            onChange={(e) => setSignUpData({...signUpData, email: e.target.value})}
                            className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                            required
                          />
                        </div>
                        
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={signUpData.password}
                            onChange={(e) => setSignUpData({...signUpData, password: e.target.value})}
                            className="w-full pl-12 pr-12 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                        
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="password"
                            placeholder="Confirm Password"
                            value={signUpData.confirmPassword}
                            onChange={(e) => setSignUpData({...signUpData, confirmPassword: e.target.value})}
                            className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                            required
                          />
                        </div>
                        
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="w-full bg-blue-500/80 hover:bg-blue-600/80 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isLoading ? (
                            <div className="flex items-center justify-center">
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                              Creating Account...
                            </div>
                          ) : (
                            'Create Account'
                          )}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className={`hidden lg:flex w-1/2 items-center justify-center p-8 transition-all duration-700 ease-in-out ${
            isSignIn ? 'lg:order-2' : 'lg:order-1'
          }`}>
            <div className="relative w-full h-full max-w-lg">
              {/* Glassmorphism Image Container */}
              <div className="relative h-full backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/20 shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-cyan-500/20"></div>
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
                  <div className="w-48 h-48 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full mb-8 flex items-center justify-center shadow-2xl animate-pulse">
                    <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <User className="w-16 h-16 text-white" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    {isSignIn ? 'Welcome Back!' : 'Join Us Today!'}
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {isSignIn 
                      ? 'Sign in to access your account and continue your journey with us.'
                      : 'Create your account and start exploring amazing features and possibilities.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom CSS for slow spin animation */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AuthPage;