import React from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="mt-3 mb-2" >
      <p className="px-4">Created with <img src="/images/plant-heart.png" alt="plant inside of a small heart" /> by Tamao and Alicja
      <br />
      To see more visit our <Link to='https://github.com/GitAlicja/plant-parenthood' className="green-link">GitHub repository</Link>
      <br />
      The source code is <Link to="https://opensource.org/licenses/mit-license.php" className="green-link">MIT</Link> licensed.
      The website content uses <Link to="https://www.shutterstock.com/" className="green-link">Shutterstock</Link> graphic material and icons made by <Link to="https://www.freepik.com" className="green-link">Freepik</Link> from <Link to="https://www.flaticon.com/" className="green-link">www.flaticon.com</Link>
      </p>
    </footer>
  );
}

export default Footer;