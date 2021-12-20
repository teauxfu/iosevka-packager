# what it does

- uses the ttf2woff package to convert ttf to woff (a couple similar packages exist, haven't tried them)
- uses the fs-extras package to recursively copy the woff2 files (could do in stdlib if need be)

# how to use

go to https://github.com/be5invis/Iosevka/releases
download the .zip for the Iosevka release you want to package
eg https://github.com/be5invis/Iosevka/releases/download/v11.2.2/webfont-iosevka-11.2.2.zip

- clone the repo, cd in
- make a new dir "./input" relative to package.json
- extract/unzip contents of the latest release directly into the "./input" folder
- run `yarn convert` from within the repo

# todo

- (high) massage the css to look how fontsource expects / integrate with renamer/rebuilder
- (high) organize the control flow. sync and async kinda mixed right now
- (med) better logging / exception handling
- (low) typescript
- (low) retreive the latest release / unzip at runtime (http and yauzl?)
