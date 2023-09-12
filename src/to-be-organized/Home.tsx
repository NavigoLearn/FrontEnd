import React, { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    // Redirect to '/explore' when the component mounts
    window.location.href = '/explore';
  }, []);

  return <div>home page</div>;
};

export default Home;
