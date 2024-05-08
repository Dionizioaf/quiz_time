# Quiz APP

It's a simpler version of popular online quiz event platforms. This open-source version is designed to be used by tech teams due to the complexity involved in deploying and fixing certain items. We do not aim to create a complete platform, but rather to develop a tool that can be used in internal events.

## Structure

The app in version 1.0 is divided into 3 folders:

**Server**: This contains the backend code in Python that manages WebSocket communication and database management.

**Client**: This is the client web interface used for interaction.

**Host**: This is the host screen that displays information and is cast to everyone during the questions.

## ROADMAP

Here we list some items that will be needed in app, that is not inserted in Github Issues:

- Save this information on the server to enable client reconnection.
- Include a button on the host to load clients.
- Allow the host to receive scores from clients to generate rankings.
- Create an event screen that displays the question and options during the flow.
- Add space for background music.
- Implement a reconnection feature for Clients and Host.

## Versões

1.0 - A version with every feature to make an event.
