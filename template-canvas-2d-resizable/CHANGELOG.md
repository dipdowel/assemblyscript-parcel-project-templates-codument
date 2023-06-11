# Changelog

## [0.1.3] - 2023-06-11
### Fixed
- `package-lock.json` added with the same versions of dependencies as in `yarn.json`. 
   This (temporarily) fixes the bug with `npm i; npm run start` not working.



## [0.1.2] - 2023-06-10
### Added
- This CHANGELOG.md file
- `build-subdir` NPM script added to build for production with subdirectory support

### Changed
- README.md improved
- The initial position of the square is now a little randomized to make the animation unique each time the page is loaded