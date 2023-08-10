# Expenses chart component solution

This is a solution to the [Expenses chart component challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/expenses-chart-component-e7yJBUdjwt). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- View the bar chart and hover over the individual bars to see the correct amounts for each day
- See the current day’s bar highlighted in a different colour to the other bars
- View the optimal layout for the content depending on their device’s screen size
- See hover states for all interactive elements on the page
- **Bonus**: Use the JSON data file provided to dynamically size the bars on the chart

### Screenshot

![](/images/ss.png)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow
- Javascript
- Importing JSON data

### What I learned

For the first time I used import statement in vanilla JS. I have used imports all the time in React but I never knew how to use it in vanilla JS. It was a very good refresher to strengthen by base in JS 

```html
<h1>Some JS code I'm proud of</h1>
```
```js
for(let i = 0; i < data.length; i++){
    const heightPercentage = data[i].amount / highestAmt * 100
    bar[i].style.height =  (heightPercentage/100 ) * 120 + 'px'
    if(bar[i].style.height === '120px'){
        bar[i].style.backgroundColor = 'hsl(186, 34%, 60%)'
    }
}
```

### Continued development

I want to continue to work on my JS skills. I want to learn more about the DOM and how to manipulate it. I also want to learn more about the different methods and functions in JS.

### Useful resources

- [FreeCodeCamp](https://www.freecodecamp.org/news/how-to-read-json-file-in-javascript/) - This helped me for importing JSON data in JS. It clearly mentioned all the error that I might face and how to solve them.

## Author

- Website - [Palak Goyal](https://github.com/Palakkgoyal)
- Frontend Mentor - [@Palakkgoyal](https://www.frontendmentor.io/profile/Palakkgoyal)
- Twitter - [@Palaktwts](https://twitter.com/Palaktwts)

## Acknowledgments

I want to thank Frontend Mentor for their projects. I have learnt so much from them. I also want to thank FreeCodeCamp for their amazing articles. They have helped me so much in my journey of learning web development.