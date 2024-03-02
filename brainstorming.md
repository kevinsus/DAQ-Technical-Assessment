# Brainstorming

This file is used to document your thoughts, approaches and research conducted across all tasks in the Technical Assessment.

## Firmware

## Telemetry

Task 1:
I run the whole program using docker compose up and found that the telemetry-streaming-service-1 gets an error message in server.ts, which is inside the streaming-service directory.
The error message is when the method parses a JSON string, and the function received a message which formatted incorrectly.

Fixing it would be by using try and catch statement. Essentially if an exception is thrown, the catch block will be executed to handle the exception.

Task 2:
I created another function where it will:

1. Check if the temperature is out of range
2. Then, check if the temperature between the first outbound range is more than 5000 ms:
   > If it is, then check if the counting occur more than 3 times and reset counting = 1 (Since this is the first time it is out of bound)
   > If it is not, then we need to increment the counting

(Note that the above is a pseudocode.)

Task 3:

> The source code for changing the font colour is inside live_value.tsx . Hence, its simply adding an if statements to change the colour of the text.

> To make less black spacing, I add a white background by changing the css properties of index.css, then change the width of app-header class as well as make the content centre.

> I also add a battery logo by importing an image into the app.tsx .

Task 4:


## Cloud
