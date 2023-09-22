# Changelog

## [0.4.0] - 2023, September 22
### Added
- Preprocessor for ignoring debug statements is now configurable. Switch it on and off for development and production builds separately in `as-codument-config.json`. See [details](https://github.com/dipdowel/parcel-transformer-assemblyscript-codument/blob/master/parcel-transformer-assemblyscript-codument/README.md#releaseproduction)
### Changed
- package "cosmiconfig" upgraded to "8.3.6" as it contains the fix and the package no longer breaks Parcel :)
 
## [0.3.0] - 2023, September 2
### Added
- Preprocessor for removing debug code. See [details](https://github.com/dipdowel/parcel-transformer-assemblyscript-codument/blob/master/parcel-transformer-assemblyscript-codument/README.md#releaseproduction) 

## [0.2.2] - 2023, September 2
### Changed
- package "cosmiconfig" downgraded to "7.1.0" by force, as the later versions break Parcel :(


## [0.2.1] - 2023, September 2
### Changed
- parcel-transformer-assemblyscript-codument bumped to 0.1.6
- as a result of ↑ ↑ ↑ AssemblyScript bumped to 0.27.9
- Lock files for yarn and npm  removed from all the templates


## [0.2.0] - 2023, july 16
### Added
- A new basic template for NodeJS projects added

## [0.1.7] - 2023, june 11
### Changed
- Templates don't have their own versions anymore, only the root-level package has a version
- Dependency versions updated
### Removed
- Template-specific CHANGELOGs removed

## [0.1.6] - 2023, xx xx

## [0.1.5] - 2023, june 11
### Changed
- README updated

## [0.1.4] - 2023, june 11
### fixed
- `template-canvas-2d-resizable` -- `npm i; npm run start` now works  

## [0.1.2] - 2023, june 10
### Changed
- Documentation improved
- template-basic: README.md improved
- template-basic: `add` function renamed to `addNumbers`, both functions now use `i32` type

## [0.1.1] - 2023, june 10
### Added
- Documentation

## [0.1.0] - 2023, june 10
### Added
- All the initial functionality
- README dummies
