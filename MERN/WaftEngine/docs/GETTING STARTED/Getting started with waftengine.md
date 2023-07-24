1. Make sure that you have Node.js v8.15.1 and npm v5 or above installed.
2. Visit the waftengine github link and clone the mono repo using `git clone --depth=1 https://github.com/WaftTech/WaftEngine.git <YOUR_PROJECT_NAME>`
3. After the completion of clone, take the clone folder into interface of command `cd <YOUR_PROJECT_NAME>.`
4. Open the project on your faviorate IDE or Code editor. We use VS code, currently the most popular in js community.
5. Open the terminal/command shell.
6. Change directory to the server folder inside the cloned project.
7. Install the dependencies for server. `npm install` or `yarn install`
8. Change directory to the client folder inside the cloned project.
9. Install the dependencies for client. `npm install` or `yarn install`
10. Now, rename the folder name `config.bak` to `config`
11. Set the mongo db URL and other configuration which was on the `config/key.js` file (you can find the example for key.js, email.js) in the description
12. Import/ transfer the data of server database folder to your mongodb server folder
13. The base configuration of client is located in `client/app/containers/App/constants.js`
14. For the configuration of email, go to `server/config/email.js`
15. Start the server; `npm start` or `yarn start` from appropriate directory in your terminal.
16. Start the client on another shell; `npm start` or `yarn start` from appropriate directory in your terminal.
17. The client runs on [http://localhost:5051/](http://localhost:5051/)
18. The server runs on [http://localhost:5050/](http://localhost:5050/)

Congratulations You just setup Waft Engine.
