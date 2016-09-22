import React from 'react';

export const SiteDescriptionOne = () =>(
  <div className='modal-container one'>
    <h2 className='welcome-text'>
      Welcome to Algo Arena
    </h2>
    <p className='description-text'>
      Make your sort alogrithms battle to the death. Now in JavaScript and Python.
    </p>
    <img className='stepone-img'
         style={{'margin': '0 auto'}}
         src='https://storage.googleapis.com/algorithm-arena-static/intro.gif'></img>
 </div>
);
