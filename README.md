# Keyboard Firmware Builder

## Setup

To set up the project for development, run `npm install` in the root of the project to install dependencies.

Create a `local.json` file in `src/const`, in the format:

    {
		"API": "URL to server /build route",
		"PRESETS": "URL to static/presets folder"
	}

## Compiling

To compile, run `npm run build`.

## Deploying

To deploy a production version of the application, run `npm run deploy`.

## License

Keyboard Firmware Builder is under the GNU GPL v3 license. The license information for QMK Firmware can be found at https://qmk.fm/license/.
