# Random Password Generator (HTML/CSS/JavaScript)

A lightweight, responsive password generator that creates secure random passwords based on user-selected options (length, uppercase, lowercase, numbers, symbols) with one-click copy.

- Live site: https://arnavbhatiamait.github.io/random-password-generator/

## Features
- Generate strong random passwords instantly
- Configurable length (e.g., 8–32 characters)
- Toggle character sets: uppercase, lowercase, numbers, symbols
- One-click copy to clipboard
- Visual strength hint (based on length/character variety)
- Mobile-friendly UI

## Tech Stack
- HTML for structure
- CSS for styling and responsiveness
- Vanilla JavaScript for generation logic and UI interactions

## Getting Started

1) Clone
- git clone https://github.com/arnavbhatiamait/random-password-generator.git
- cd random-password-generator

2) Run locally
- Open index.html in your browser

## Usage
- Choose the desired password length
- Select which character types to include
- Click “Generate” to produce a password
- Click “Copy” to copy the password to clipboard

## Project Structure
- index.html — App markup and controls
- style.css — Layout, colors, and responsive styles
- script.js — Password generation logic and event handling
- assets/ — Optional icons or images (if present)

## How It Works (Overview)
- Builds a character pool from selected options
- Ensures variety by including at least one character from each selected type (when applicable)
- Randomly samples characters until the target length is reached
- Updates the UI and clipboard on user actions

## Improvements Roadmap
- Enforce at least one character from each selected type
- Add exclusion rules (avoid ambiguous chars: O/0, l/1)
- Strength meter with more robust scoring
- History of recently generated passwords (not persisted)
- Keyboard shortcuts and better accessibility (ARIA labels, focus states)
- Dark/light theme toggle

