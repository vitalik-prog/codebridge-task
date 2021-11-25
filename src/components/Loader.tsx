import React from 'react';
import './styles.module.scss';

const Loader: React.FC = () => (
  <div className={'spinnerContainer'}>
    <div className={'spinner'}></div>
  </div>
);

export default Loader;
