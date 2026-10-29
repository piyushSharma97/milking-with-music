# Milking Music Player

A mobile-first web application designed to enhance the milking process with soothing music and a timer. This application allows users to start, pause, resume, and stop music playback while tracking milking sessions. It also stores milking session history using local storage and provides a user-friendly interface for viewing the history.

## Features

- **Music Integration**: Play calming music during the milking process.
- **Timer**: A big timer displays the milking duration in real-time.
- **Pause and Resume Functionality**: Pause and resume both music playback and the timer.
- **Stop Functionality**: Stop the music and prompt the user to enter the quantity of milk milked.
- **Milking History**: Save and display milking session history with date, start time, end time, and total milk quantity.
- **Responsive Design**: Mobile-first design ensures a smooth user experience across different devices.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/piyushSharma97/milking-with-music.git
    ```

2. Navigate to the project directory:
    ```bash
    cd milking-with-music
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

## Verification

```bash
npm run typecheck
npm test
npm run audit
npm run build
```

GitHub Actions runs these checks for pushes and pull requests. Successful
builds are uploaded as the `production-build` workflow artifact.

## Deployment

The production site is written to `build/` and can be deployed to any static
host that serves a single-page application. Configure the host to serve
`index.html` for unknown routes so links such as `/milking-history` work after a
refresh. For a site hosted below a path prefix, set `VITE_BASE_PATH` (including
the leading and trailing slashes) when building, for example:

```bash
VITE_BASE_PATH=/milking-with-music/ npm run build
```

The repository does not currently have hosting credentials or a configured
production domain, so CI creates a deployable artifact without publishing it
to a live site.

## Usage

### Main Page

- **Start Milking**: Click the "Start Milking" button to begin the milking session. This will start the music and the timer.
- **Pause/Resume**: Click the "Pause" button to pause the music and the timer. Click "Resume" to continue.
- **Stop**: Click the "Stop" button to end the milking session. A modal will prompt you to enter the quantity of milk milked.

### Milking History

- Open Milking History from the navigation bar.
- View saved sessions with the date, start time, end time, and milk quantity.

## Project Structure

- **src**: TypeScript React application source.
  - **Components**: Page and UI components.
  - **data**: Track metadata and bundled audio files.
  - **images**: Bundled image assets.
  - **styles**: SCSS stylesheets.
  - **utils**: Shared time-formatting and milking-history storage helpers.
  - `types.ts`: Shared track and session types.

The current app is small enough for this layout. If it grows, consider grouping
the player, timer, modal, and history persistence under `features/milking/`,
with shared UI under `components/`, instead of organizing all components in one
directory. This keeps feature-specific logic together without adding folders
prematurely.

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
