<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Solver is an app that any long or middle-term project team members can ask and answer questions.

###  Project Timeline

Week 1 (19.09.2022-23.09.2022)
•	Introduction to the Solver task.
•	Installing Node and the required tools for the project. 
•	Generated the NestJS starting project and getting familiar with the framework.
•	Defining the endpoints for the application, the entities, and the relationship between them.

Week 2 (26.09.2022-30.09.2022)
•	Created user and workspace entity.
•	Setting up basic CRUD functionality for the workspaces module. 
•	Added persistence to the application
•	Implemented authentication and authorization with passport (package) and JWT token.

Week 3 (3.10.2022-7.10.2022)
•	Implemented CRUD functionality for the question module. Organized the relationships between user, workspace and question entity.
•	The application and the database were set up on separate Docker containers.
•	Implemented a unit and integration test for the GET Workspaces endpoint, to familiarize with testing and JEST package.
•	Added swagger.

Week 4 (10.10.2022-14.10.2022)
•	Implemented central error handling.
•	Implemented logging.
•	Test the application with JMeter
•	Implemented caching with Redis

Week 5 (17.10.2022-21.10.2022)
•	Getting familiar with microservice architecture
•	Compare diferent NestJS transporters : MQTT, RabbitMQ, Kafka
•	Create a simple microservice aplication with RabbitMQ as message broker


Week 6 (25.10.2022-28.10.2022)
• Reorganise the Solver aplication into microservices
• Created microservices: App-Gateway, Auth, Workspaces and Questions with separate DB
• Dockerise every microservice




