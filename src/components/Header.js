import React from 'react';
import "../styles/header.css"
import logo from "../images/pokemon-logo.png";

export default function Header(props) {
  return (
    <div className='header-container'>
        <img src={logo} alt='pokemon-logo' />
        <div className="score-container">
            <p>Score: {props.score}</p>
            <p>High Score: {props.highScore}</p>
        </div>
    </div>
  )
}
