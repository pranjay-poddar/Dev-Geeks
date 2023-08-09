

import requests
import json
import discord

def handle_responses(message):
    category = message
    # print(category)
    if(message=='help'):
        return """you can choose your quotes from the following options:
        age
        alone
        amazing
        anger
        architecture
        art
        attitude
        beauty
        best
        birthday
        business
        car
        change
        communications
        computers
        cool
        courage
        dad
        dating
        death
        design
        dreams
        education
        environmental
        equality
        experience
        failure
        faith
        family
        famous
        fear
        fitness
        food
        forgiveness
        freedom
        friendship
        funny
        future
        god
        good
        government
        graduation
        great
        happiness
        health
        history
        home
        hope
        humor
        imagination
        inspirational
        intelligence
        jealousy
        knowledge
        leadership
        learning
        legal
        life
        love
        marriage
        medical
        men
        mom
        money
        morning
        movies
        success"""
    api_url = 'https://api.api-ninjas.com/v1/quotes?category={}'.format(category)
    response = requests.get(api_url, headers={'X-Api-Key': '[API KEY]'})
    # print(response.text)
    if response.status_code == requests.codes.ok:
        data = json.loads(response.text)
        # print(data)
        return data[0]['quote']
    else:
        return "Error, quotes not found, try another key"

def run_bot():
    TOKEN = '[TOKEN]'
    intents = discord.Intents.default()
    intents.message_content = True
    client = discord.Client(intents=intents)

    @client.event
    async def on_ready():
        print(f'{client.user} is now running')

    @client.event
    async def on_message(message):
        if message.author == client.user:
            return

        user_message = message.content.lower()
        user_message=user_message[1:]
        response = handle_responses(user_message)


        try:
            await message.author.send(response)
        except discord.errors.HTTPException as e:
            print(f"Failed to send message to {message.author}: {e}")

    client.run(TOKEN)

run_bot()



