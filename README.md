# Milking Music Player

A mobile-first web application designed to enhance the milking process with soothing music and a timer. This application allows users to start, pause, resume, and stop music playback while tracking milking sessions. It also stores milking session history using local storage and provides a user-friendly interface for viewing the history.

## Features

- **Music Integration**: Play calming music during the milking process.
- **Timer**: A big timer displays the milking duration in real-time.
- **Pause and Resume Functionality**: Pause and resume both music playback and the timer.
- **Stop Functionality**: Stop the music and prompt the user to enter the quantity of milk milked.
- **Milking History**: Save and display milking session history with date, start time, end time, total duration, and total milk quantity.
- **Responsive Design**: Mobile-first design ensures a smooth user experience across different devices.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/piyushSharma97/milking-music-player.git
    ```

2. Navigate to the project directory:
    ```bash
    cd milking-music-player
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

4. Start the development server:
    ```bash
    npm start
    ```

The application will be available at `http://localhost:3000`.

## Usage

### Main Page

- **Start Milking**: Click the "Start Milking" button to begin the milking session. This will start the music and the timer.
- **Pause/Resume**: Click the "Pause" button to pause the music and the timer. Click "Resume" to continue.
- **Stop**: Click the "Stop" button to end the milking session. A modal will prompt you to enter the quantity of milk milked.

### Milking History

- Access the milking history from the main page.
- View a table of past milking sessions with details such as date, start time, end time, duration, and quantity of milk.

## Project Structure

- **src**: Contains the source code for the project.
  - **components**: Contains the React components.
    - `MilkingMusicPlayer.js`: The main component for the milking music player.
    - `Timer.js`: A component to display the timer.
    - `MilkModal.js`: A modal component to enter the quantity of milk milked.
  - **data**: Contains the data files.
    - `tracks.js`: Contains the list of tracks for the music player.
  - **styles**: Contains the SCSS files for styling.
    - `App.scss`: The main stylesheet for the application.
  - **utils**: Contains utility functions.
    - `CommonFunctions.js`: Contains common utility functions such as `formatTime`.

## Dependencies

- `react`
- `react-bootstrap`
- `bootstrap`

## Contributing

Contributions are welcome! Please create a pull request with your changes.

## License

This project is licensed under the MIT License.

## Acknowledgements

- Thanks to the authors of the [sample music files](https://drive.google.com/drive/folders/1e9rTSel3y0VxosZw4YhzecRka7hURVbM?usp=drive_link) used in this project.
