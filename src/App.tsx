import React, { useState } from 'react';
import Main from './components/main/Main';
import ChatScreen from './pages/chatscreen';
import LandingPage from './pages/landingpg';
import Scene from './components/sidebot/sidebot';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  const navigateToMain = () => {
    setCurrentPage('main');
  };

  return (
    <>
      {currentPage === 'landing' ? (
        <LandingPage navigateToMain={navigateToMain} />
      ) : (
        <div className="flex flex-col h-screen w-screen">
          <ChatScreen />
          <div className="flex flex-1">
            <Main />
          </div>
          <Scene />
        </div>
      )}
    </>
  );
}
