import React, { useState, useEffect } from "react";
import './quoteWidget.css';

function QuoteWidget() {
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');
  
    useEffect(() => {
      fetch('https://api.quotable.io/random')
        .then(response => response.json())
        .then(data => {
          setQuote(data.content);
          setAuthor(data.author);
        })
        .catch(error => {
          setQuote('Error fetching quote. Please try again.');
          setAuthor('');
        });
    }, []);
  
    return (
      <div className="quote-widget">
        <p className="quote-text">"{quote}"</p>
        <p className="quote-author">- {author}</p>
      </div>
    );
}

export default QuoteWidget;  