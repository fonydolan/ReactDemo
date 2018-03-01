// Greeter.js
//var config = require('./mock/data.json');
import React, { Component } from 'react'
import config from '../mock/data.json'
import styles from './styles/Greeter.css'
/*
module.exports = function() {
    var greet = document.createElement('div');
    greet.textContent =config.greetText;
    return greet;
  };
*/

export default class Greeter extends Component{
    render(){
        return (
            <div>
                {config.greetText}
            </div>
        )
    }
}
