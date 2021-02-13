import React from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="mt-2" >
      <p>Created with <img src="/images/plant-heart.png" /> by Tamao and Alicja </p>
      <p>Would you like to see more? To check the code visit our <Link to='https://github.com/GitAlicja/plant-parenthood' alt='project-remote-repository' className="green-link">GitHub repository</Link>
      </p>
    </footer>
  );
}

export default Footer;