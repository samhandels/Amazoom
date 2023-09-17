import React from 'react'
import './Footer.css'
import samazonLogo from './samazonwhite.png';

export const Footer = () => {

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return(
        <footer className='footer-container'>
            <div className='to-top' onClick={scrollToTop}>Back to top</div>

            <div className='footer-info'>
            <div className='sam-info' >
                <img className='samazon-logo-img' src={samazonLogo} alt="Samazon Logo" />
                    <span className='sam-handelsman'>by Sam Handelsman</span>
                </div>
            </div>
            <div className='github-linkedin'>
                <a href="https://www.linkedin.com/in/sam-handelsman/" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-linkedin"></i>
                </a>
                <a href="https://github.com/samhandels" target="_blank" rel="noopener noreferrer">
                    <i className='fa-brands fa-github' alt="GitHub"></i>
                </a>
            </div>
            <div>Technologies Utilized: Flask, SQLAlchemy, React, Redux, Python, Javascript, AWS</div>

        </footer>
    )
}
