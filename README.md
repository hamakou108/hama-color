# HamaColor

## Description

HamaColor is a browser extension that changes the color of the screen edges based on user-defined URL patterns. This helps users visually distinguish browser tabs or environments (e.g., development, staging, production) quickly.

## Features

- Customize screen edge color based on URL patterns.
- Define multiple rules for different websites.
- Simple and intuitive rule format (pattern,color).
- Lightweight and unobtrusive.

## Installation

### From Chrome Web Store (Recommended)

1. Go to the HamaColor page on the Chrome Web Store: https://chromewebstore.google.com/detail/hamacolor/ciofpkbhollmjpaobphhjdngaohglpgp?pli=1
2. Click "Add to Chrome".

### Manual Installation (for developers or testing)

1. Clone this repository: `git clone https://github.com/hamakou108/hama-color.git`
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" using the toggle switch in the top right corner.
4. Click the "Load unpacked" button.
5. Select the `dist` directory within the cloned repository. (Note: you might need to run `pnpm build` first to generate the `dist` directory).

## Usage

Rules are defined as a list of comma-separated pairs of URL patterns and colors. Each rule should be on a new line.

1. Click on the HamaColor extension icon in your browser toolbar.
2. The popup will show a textarea for your rules.
3. Enter your rules in the following format:

   ```
   <URL_pattern>,<color>
   ```

   - `<URL_pattern>`: A string that will be matched against the current tab's URL. This can be a full URL or a partial match (e.g., a domain name or a specific path).
   - `<color>`: Any valid CSS color name (e.g., `red`, `blue`, `green`) or hex code (e.g., `#FF0000`, `#00FF00`).

   **Example:**

   ```
   github.com,red
   developer.mozilla.org,#0000FF
   localhost:3000,rgba(0,255,0,0.5)
   ```

4. Click "Save". The extension will apply the color to the edges of the screen for any tab whose URL matches one of the defined patterns. The first matching pattern will be used.

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or find a bug, please open an issue on the GitHub issue tracker.

When contributing code, please ensure you:

- Fork the repository.
- Create a new branch for your feature or bug fix.
- Write clear and concise commit messages.
- Ensure your code lints correctly (`pnpm lint`).
- Add tests for new functionality if applicable (`pnpm test`).
- Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
