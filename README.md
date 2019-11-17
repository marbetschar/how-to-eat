# How to eat
How can food after a disaster be correctly used so you don't use up certain types to fast or to slow? How can you know how to eat enough when panic and stress would interfere with rational thinking? This is where HOW TO EAT comes in and helps ration your food resources and helps you plan out how much you can consume in order to survive as long and healthy as possible. Future versions will provide different receipts for meals you can do with the resources entered before with the focus on what is really nutritious and can be cooked with the utensils available for example no access to boiling water or a pan to cook something on. With it's usage not only focused on total disasters, humans will be more likely to install the lite-weight application also just for different cooking ideas and rationing their food.

# Installation
## Project
`git clone https://github.com/marbetschar/how-to-eat.git`
`cd how-to-eat`
`npm install`
`npm start`

Afterwards the website will open directly with the application.

## Node-red / Cloudant
Setup the node-red and cloudant services via the IBM Cloud platform.
Create a database (or use `how-to-eat`)
Take the json from the `flows.json` file and import it into the node-red project.
Create data in the cloudant or copy paste some of the results from the `/all`