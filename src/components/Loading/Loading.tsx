import React from 'react';

const loading = require('src/assets/img/loading.gif');

const Loading: React.FC = () => {
  return (
    <div className='flex-justify-center'>
      <img src={loading} alt="loading" width='200px' height='50px'/>
    </div>
  );
};

export default Loading;
