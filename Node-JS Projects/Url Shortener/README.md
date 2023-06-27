# URL Shortener

This is a simple URL shortener application built with Node.js and EJS. It allows users to shorten long URLs and track the number of clicks on each shortened URL.

## Installation

1. Clone the repository:

   ```bash
   git clone <repository_url>
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up the MongoDB connection by configuring the `config/mongoDB.js` file.

4. Start the application:

   ```bash
   node index.js
   ```

5. Open your web browser and navigate to `http://localhost:3000` to access the URL shortener.

## Usage

1. Enter a URL in the input field on the home page and click the "Shorten" button.
2. The shortened URL will be displayed on the home page along with the original URL and the number of clicks.
3. Clicking on the shortened URL will redirect you to the original URL.
4. The number of clicks on each shortened URL will be updated automatically.

## Dependencies

The application uses the following dependencies:

- [express](https://www.npmjs.com/package/express): Fast, unopinionated, minimalist web framework for Node.js.
- [path](https://nodejs.org/api/path.html): Provides utilities for working with file and directory paths.
- [body-parser](https://www.npmjs.com/package/body-parser): Node.js body parsing middleware.
- [ejs](https://www.npmjs.com/package/ejs): Embedded JavaScript templates for rendering views.
- [mongoose](https://www.npmjs.com/package/mongoose): MongoDB object modeling tool designed to work in an asynchronous environment.

## Contributing

Contributions are welcome! Please refer to the [Contributing Guidelines](CONTRIBUTING.md) for more details.