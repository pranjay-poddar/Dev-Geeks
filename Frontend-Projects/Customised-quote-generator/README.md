# Customised Random Quote Generator

## Screenshots
![Input from User](Frontend-Projects/Customised-quote-generator/SettingInput.jpg)
![Result](Frontend-Projects/Customised-quote-generator/Result.jpg)

## Demo 
- [Have a look!](https://arcvaishali.github.io/Customised-Random-Quote-Generator/)

Customised Random Quote Generator takes, 

- Name
- Favorite Activity 
- Favorite Place
- Degree of Randomness (from 0 to 1, higher the degree of randomness less relevant the quote)

And then these inputs are passed in a prompt to AI which generates **Oscar Wilde style poetic qoute** using [OpenAI API by **Scrimba** (a learning platform)](https://apis.scrimba.com/openai/v1/completions) and an **image** relevant to the quote using an [API by Scrimba](https://apis.scrimba.com/unsplash/photos/random)

## Prompt used-

```
Create a poetic phrase about ${favActivity} and ${favPlace} in the insightful, witty and satirical style of Oscar Wilde. Omit Oscar Wilde's name.
```

## Tech Stack-
- HTML 
- CSS
- JavaScript
- OpenAI API



Happy Coding!
