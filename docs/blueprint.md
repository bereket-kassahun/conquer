# **App Name**: Conquer Online

## Core Features:

- Room Creation and Joining: Allow a player to create a game room and other players to join using a unique room ID. After 3 players joined the button is diabled
- Game Initialization: Upon game start, initiate the game state by distributing cards to players and setting up the community and trash piles on the server side.
- Real-time Game State: Update players in real-time, send out data (player's hand, community pile, trash pile). Handle turn management logic on the backend. Implement real-time updates to reflect each player's actions and current turn.
- Card Management: Enable players to draw cards from the community or trash pile (Trash pile clicked) and drag or rearrange their hands. Limit drawing card at once per turn.
- Card Placement Animations: Provide animated card transition effects upon being distributed initially, being drawn and when the card is discarded.
- Player Avatar UI: Display player avatars around the game table indicating the different seats of the player.

## Style Guidelines:

- Primary color: Deep green (#1E7145) to simulate a classic card table.
- Background color: Dark, desaturated green (#2A473A) to allow the card elements and text stand out.
- Accent color: Gold (#FFD700) to highlight interactive elements, turn indicators, and important UI elements.
- Body and headline font: 'Inter', sans-serif, for clear readability across devices. Using the same font for the entire user interface to create clean look and feel
- Use card suit symbols for clarity; subtle animations on important actions, like drawing and discarding, which enhances user feedback.
- Mobile-first approach using a responsive grid layout; card arrangements in semi-circular form. Important actions readily available.
- Animations upon distributing initial cards and dropping the card on the trashpile