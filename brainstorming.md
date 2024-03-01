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

## Cloud
