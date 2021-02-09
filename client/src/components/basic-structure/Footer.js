import React from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div>
    <p>Created by Tamao and Alicja <br />Would you like to see more? To check the code visit our <Link to='https://github.com/GitAlicja/plant-parenthood' alt='project-remote-repository'>GitHub repository</Link>
    </p>
  </div>
  );
}

export default Footer;