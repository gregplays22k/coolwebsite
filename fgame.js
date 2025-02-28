// footballbros.js

// --- HTML Structure (Dynamically Created) ---

// Header
const header = document.createElement('div');
header.className = 'header';
const logo = document.createElement('img');
logo.src = 'football_bros_logo.png'; // Replace with actual logo URL
logo.alt = 'Football Bros Logo';
header.appendChild(logo);
document.body.appendChild(header);

// Content
const content = document.createElement('div');
content.className = 'content';

const title = document.createElement('h1');
title.textContent = 'Football Bros';
content.appendChild(title);

const description = document.createElement('p');
description.textContent = 'Football Bros is the ultimate 2-player football experience! Play with a friend on the same device and compete in fast-paced, arcade-style football matches.';
content.appendChild(description);

const buttons = document.createElement('div');
buttons.className = 'buttons';

const playButton = document.createElement('a');
playButton.href = '#';
playButton.className = 'button';
playButton.textContent = 'Play Now';
buttons.appendChild(playButton);

const learnButton = document.createElement('a');
learnButton.href = '#';
learnButton.className = 'button secondary';
learnButton.textContent = 'Learn More';
buttons.appendChild(learnButton);

content.appendChild(buttons);

const screenshots = document.createElement('div');
screenshots.className = 'screenshots';

for (let i = 1; i <= 3; i++) {
  const screenshot = document.createElement('img');
  screenshot.src = `screenshot${i}.png`; // Replace with actual screenshot URLs
  screenshot.alt = `Screenshot ${i}`;
  screenshot.className = 'screenshot';
  screenshots.appendChild(screenshot);
}

content.appendChild(screenshots);
document.body.appendChild(content);

// Footer
const footer = document.createElement('div');
footer.className = 'footer';
const copyright = document.createElement('p');
copyright.textContent = '© 2024 Football Bros. All rights reserved.';
footer.appendChild(copyright);
document.body.appendChild(footer);

// --- CSS Styling (Dynamically Created) ---

const style = document.createElement('style');
style.textContent = `
  body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    min-height: 100vh;
  }

  .header {
    text-align: center;
    padding: 20px;
  }

  .header img {
    max-width: 300px;
  }

  .content {
    text-align: center;
    padding: 20px;
    max-width: 800px;
  }

  .content h1 {
    font-size: 2.5em;
    margin-bottom: 20px;
  }

  .content p {
    font-size: 1.1em;
    line-height: 1.6;
    margin-bottom: 30px;
  }

  .buttons {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 30px;
  }

  .button {
    background-color: #007bff;
    color: white;
    padding: 15px 30px;
    border: none;
    border-radius: 5px;
    font-size: 1.1em;
    margin: 10px;
    cursor: pointer;
    text-decoration: none;
  }

  .button.secondary {
    background-color: #6c757d;
  }

  .button:hover {
    opacity: 0.8;
  }

  .screenshots {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 30px;
  }

  .screenshot {
    max-width: 300px;
    margin: 10px;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .footer {
    text-align: center;
    padding: 20px;
    margin-top: auto;
    width: 100%;
    background-color: #e9ecef;
  }
`;
document.head.appendChild(style);

// --- JavaScript Functionality (Placeholder) ---

// Add event listeners or other JavaScript logic here as needed.
