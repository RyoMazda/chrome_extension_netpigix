# NETPIGIX

## Motivation
* Issues of the default NETFLIX video player
  - cannot turn subtitle on/off via shortcut keys
  - right after a character says a line, the subtitle disappears
* This extension is meant to solve the above issues

## Installation
Since this extension is not published to the official Chrome Web Store, you have to do the following;
* Download [`dist.zip`](https://github.com/RyoMazda/chrome_extension_netpigix/releases/download/test/dist.zip)
from `release` in this repository and unzip it.
You'll have `dist` directory.
* Open your Chrome and go to Extensions settings `chrome://extensions/` and turn `Developer mode` on.
* Click `Load unpacked` and select the `dist` directory.

## Usage
* You may have to reload the page `https://www.netflix.com/watch/*` to activate the extension.
* Press `Alt` or `option` key to toggle the custom subtitle.


## Development Memo
### Dependencies
```bash
yarn add -D webpack webpack-cli copy-webpack-plugin typescript ts-loader @types/webpack @types/chrome
```

### Build
```bash
./build.sh
```

### Test
See `Installation` above and try it (I know this is not a smart way. Please give me some advice.).

### Release
* Click the `release` and `Draft a new release`.
* Don't forget to attach `dist.zip` and update the download link above.

### DOM structure of the Netflix watch-video page (extracted only the relevant part)
memo for development purpose

```
.VideoContainer
  - #netpigix-subtitle-contaner (This will be added by this extension)
    - .netpigix-text
    - .netpigix-text
    - ...
  - div
    - video
    - .player-timedtext (dinamically generated)
      - .player-timedtext-text-container
        - span
        - span
        - ...
```
