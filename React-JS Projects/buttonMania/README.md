# Button-Mania

Welcome to the Button-Mania project!  
To get started with Button-Mania, please follow the instructions below:

## Setup

Please refer to the [Setup Guide](./setup.md) for detailed instructions on how to set up Button-Mania on your local machine.

## How to Contribute

Contributing to Button-Mania is a simple process. Follow the steps below to start contributing:

1. Create a button on [codepen.io](https://codepen.io).
2. Take a screenshot of your button.
3. Save the screenshot in the `assets` folder with a unique filename that does not exist in the folder already. This screenshot will visually represent your button in the collection.
4. In the `assets` folder, navigate to `index.js`. Import your button image and export it.
5. Go to the `components/Buttons/AllButtons.jsx` file.
6. Create a new component called `ButtonCard` and pass it all the props required.
   Example:
   ```jsx
   <ButtonCard
     btnImg={neumorphicGreyBtn}
     imgAlt="neumorphic grey button"
     codepenLink="https://codepen.io/Palak-Goyal/pen/dygEaVp"
     zipFileName="trial-button"
     authorName="Palak Goyal"
     githubLink="https://github.com/palakkgoyal"
   />
   ```

7. Send a pull request (PR).
8. Wait for your PR to be reviewed and merged.

Thank you for your interest in contributing to Button-Mania!

If you have any further questions or need assistance, feel free to reach out to us.
  