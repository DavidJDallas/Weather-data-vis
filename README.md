# App to View Historical Weather Trends and Patterns
## Work in Progress! Still Very Incompleted.

## How to Run

To install the relative dependencies, run

``npm install``

In your terminal. Then, run:

``npm run start``

in your terminal to launch the browser window, where you can interact with the app.

## How it Works

When the user first enters the app, they will have a choice of searching for their desired location either by the postcode or by the place location. When they enter this and press the relevant 'search' button, the postcode or place are first translated into latitude and longitude via a call to a geolocation API (I have used 'mapbox'). Once this is done successfully, the states of latitude and longitude are set via useState, and a call is made to a weather Data API to retrieve the relevent data (I have used 'open-meteo.com'). 

The user will then be taken to a page where various choices can be made as to how they would like to see the data and what categories they would like to view. 

For workings of more specific features, you can find comments in the places where I believe them to be helpful and in sections of code where I don't consider them to be completely self-explanatory. 
