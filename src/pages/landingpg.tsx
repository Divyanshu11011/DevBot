import { useState } from 'react';
import Spline from '@splinetool/react-spline';
import { Button } from '../components/landingpgcomponent';

const LandingPage = ({ navigateToMain }) => {
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const handleSplineLoad = () => {
    setSplineLoaded(true);
    setTimeout(() => {
      setShowButton(true);
    }, 3000); // 3 seconds delay
  };

  return (
    <div className="relative h-screen w-full">
      <Spline 
        scene="https://prod.spline.design/5OZkgdvns0lyzcVY/scene.splinecode" 
        onLoad={handleSplineLoad}
      />
      {showButton && (
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
          <div className="pointer-events-auto">
            <Button navigateToMain={navigateToMain} />
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
