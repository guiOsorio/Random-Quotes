import React, { Component } from 'react';
import { FaQuoteLeft } from 'react-icons/fa';
import { FaQuoteRight } from 'react-icons/fa';
import { FaTwitterSquare } from 'react-icons/fa';

require('dotenv').config()

const startQuote = <FaQuoteLeft />;
const endQuote = <FaQuoteRight />;
const twitterLogo = <FaTwitterSquare />;

// react-spring or react-transition-group to improve state transitions in the page
// separate into different components to simplify the code
// upload to codePen and FCC

class App extends Component {
    state = {
        quote: "",
        author: "",
        color: "",
        fading: true
    }
    
    chosenColor = () => {
        const colors = ["#F8B195", "#F67280", "#C06C84", "#6C5B7B", "#355C7D"]
        const number = Math.floor(Math.random() * 5)

        return colors.filter(c => colors[number] === c)[0]
    }

    handleClick = () => {
        fetch(`https://quotes15.p.rapidapi.com/quotes/random/?rapidapi-key=${process.env.REACT_APP_API_KEY}`)
        .then((data) => data.json())
        .then((json) => this.setState({ quote: json.content, author: json.originator.name, color: this.chosenColor(), fading: false }))

    }

    componentDidMount() {
        fetch(`https://quotes15.p.rapidapi.com/quotes/random/?rapidapi-key=${process.env.REACT_APP_API_KEY}`)
        .then((data) => data.json())
        .then((json) => this.setState({ quote: json.content, author: json.originator.name, color: this.chosenColor()}))
    }

    componentDidUpdate() {
        if(!this.state.fading) {
            setTimeout(() => this.setState({ fading: true }), 500)
        }
    }


    render() {
        const { quote, author, color, fading } = this.state
        return (<div id="container" style={{backgroundColor: color}}>
            <div id="quote-box"style={{ color }}>
                <blockquote id="text" className={fading ? "" : "fading"} >{startQuote} {quote} {endQuote}</blockquote>
                <div id="after-quote">
                    <span id="author" className={fading ? "" : "fading"}>- {author}</span>
                    <div id="clickable-div">
                        <a href="twitter.com/intent/tweet" id="tweet-quote" className="clickable-element" target="_blank" style={{ color }}>{twitterLogo}</a>
                        <button onClick={this.handleClick} id="new-quote" className="clickable-element" style={{backgroundColor: color}}>New Quote</button>             
                    </div>
                </div>
            </div>
        </div>)
    }
}
 
export default App;