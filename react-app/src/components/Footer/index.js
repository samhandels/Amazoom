import React from 'react'
import './Footer.css'

export const Footer = () => {
    return(
        <footer className='footer-container'>
            <div className='to-top'>Back to top</div>

            <div className='footer-info'>
            <div className='sam-info' >Sam Handelsman</div>
                <a href="https://www.linkedin.com/in/sam-handelsman/" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-linkedin"></i>
                </a>
                <a href="https://github.com/samhandels" target="_blank" rel="noopener noreferrer">
                    <i className='fa-brands fa-github' alt="GitHub"></i>
                </a>
            </div>

        </footer>
    )
}
