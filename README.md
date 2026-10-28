# Digital Calculator

A small, browser-based calculator project. It provides a keypad interface and uses JavaScript to process button presses and perform basic arithmetic.

## Technology stack

- **HTML5** (`calFace.html`) provides the calculator layout and keypad.
- **CSS3** (`calFace.css`) styles the page, calculator screen, and button grid.
- **Vanilla JavaScript** (`calculator.js`) handles keypad events, calculator state, and arithmetic. No framework or third-party library is used.

## Requirements

- A modern web browser with JavaScript enabled.
- No installation, build step, package manager, or server-side runtime is required.

## Run the project

Open `calFace.html` directly in a browser. Alternatively, serve the project directory with any static file server and open the page there.

## Current functionality

- Enter integer digits using the keypad.
- Add, subtract, multiply, and divide.
- Clear the current calculation.
- Display an error when dividing by zero.

The keypad also shows decimal, percent, and backspace-style buttons, but those operations are not implemented yet. Decimal input is not currently supported.

## Project files

| File | Purpose |
| --- | --- |
| `calFace.html` | Page structure and calculator controls |
| `calFace.css` | Layout, colors, and keypad styling |
| `calculator.js` | Button handling and arithmetic logic |
