# NETPIGIX

## Motivation
* Issues of the default NETFLIX video player
  - cannot turn subtitle on/off via shortcut keys
  - right after a character says a line, the subtitle disappears
* This extension is meant to solve the above issues

## Installation
Since this extension is not published to the official Chrome Web Store, you have to do the following;
* Download [dist.zip](https://github.com/RyoMazda/chrome_extension_netpigix/releases/download/v0.1/dist.zip)
and unzip it.
You'll have `dist` directory.
* Open your Chrome and go to Extensions settings `chrome://extensions/` and turn `Developer mode` on.
* Click `Load unpacked` and select the `dist` directory.

## Usage
* You may have to reload the page `https://www.netflix.com/watch/*` to activate the extension.
* Make sure pressing `space` key stops/starts the video (default in Netflix).
* Press `Alt` or `option` key to toggle the custom subtitle by NetPigix.
* Press `←` (Left Arrow) key to go back 10 seconds (default in Netflix).
* Speech Recognition starts every time you press `space` key. If you say, within 2 seconds,;
  * `show me`, the custom subtitle will be toggled (same as pressing `Alt` or `option`)
  * `go back`, go back 10 seconds (same as pressing left arrow key)
  * `go back x seconds`, go back `ceil(x/10)` seconds


## Development Memo
### Refs
* https://qiita.com/okumurakengo/items/1a4404c20b0bf10f2c68

### Dependencies
```bash
yarn add -D webpack webpack-cli copy-webpack-plugin typescript ts-loader @types/webpack @types/chrome
```

### Build
```bash
./build.sh
```

### Test
* Just try it. There's no test code.
* Note that there's reload icon for each extension in `chrome://extensions`, which is nice.

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
