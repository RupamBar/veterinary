import React from 'react'
import './Footer.css'

function Footer() {
  return (
    <div className='footerStyle'>
        <div>
            &copy;{new Date().getFullYear()} Ananya Saha. All Rights Reserved
        </div>
    </div>
  )
}

export default Footer