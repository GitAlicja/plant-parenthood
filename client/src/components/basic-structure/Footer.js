import React from 'react';
import '../../App.css';

const Footer = () => {
  return (
    <footer className="mt-3 mb-2" >
      <p className="px-4">Created with <img src="/images/plant-heart.png" alt="plant inside of a small heart" /> by Tamao and Alicja</p>
      <p className="px-4">Check our <a href='https://github.com/GitAlicja/plant-parenthood' className="green-link">GitHub repository</a> to see more!
      <br />
      The source code is <a href="https://opensource.org/licenses/mit-license.php" className="green-link">MIT</a> licensed.
      Website content uses <a href="https://www.shutterstock.com/" className="green-link">Shutterstock</a> graphic material. Icons made by <a href="https://www.freepik.com" className="green-link">Freepik</a> from <a href="https://www.flaticon.com/" className="green-link">www.flaticon.com</a>
      </p>
    </footer>
  );
}

export default Footer;