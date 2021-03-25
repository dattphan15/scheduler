# Interview Scheduler
A single page application built using React. The Interview Scheduler allows a user to view the current interview schedule, create an appointment, or edit/cancel an existing appointment that they have. 

#### Landing Page
!["Screenshot of Landing Page"](https://github.com/dattphan15/scheduler/blob/master/docs/01-Landing-Page.png)

#### Booking A New Interview
!["Screenshot of Booking A New Interview"](https://github.com/dattphan15/scheduler/blob/master/docs/02-Book-Edit-Interview.png)

#### Deleting An Existing Interview
!["Screenshot of Deleting An Existing Interview"](https://github.com/dattphan15/scheduler/blob/master/docs/03-Delete-Interview.png)

#### Error Handling (Deletion)
!["Screenshot of Error Handling (Deletion)"](https://github.com/dattphan15/scheduler/blob/master/docs/04-Error-Delete.gif)

#### Error Handling (Saving)
!["Screenshot of Error Handling (Saving)"](https://github.com/dattphan15/scheduler/blob/master/docs/05-Error-Edit.gif)

#### Deleting Loader
!["Screenshot of Deleting Loader"](https://github.com/dattphan15/scheduler/blob/master/docs/06-Deleting.png)

#### Saving Loader
!["Screenshot of Saving Loader"](https://github.com/dattphan15/scheduler/blob/master/docs/07-Saving.png)

## Notes on Functionality
• Data is persisted by the API server using a PostgreSQL database.
• The client application communicates with an API server over HTTP, using the JSON format.
• Jest tests are used through the development of the project.

## App Features
• Interviews can be booked between Monday and Friday.
• A user can switch between weekdays.
• A user can book an interview in an empty appointment slot.
• Interviews are booked by typing in a student name and clicking on an interviewer from a list of available interviewers.
• A user can cancel an existing interview.
• A user can edit the details of an existing interview.
• The list of days informs the user how many slots are available for each day.
• The expected day updates the number of spots available when an interview is booked or canceled.
• A user is presented with a confirmation when they attempt to cancel an interview.
• A user is shown an error if an interview cannot be saved or deleted.
• A user is shown a status indicator while asynchronous operations are in progress.
• When the user presses the close button of the error they are returned to the Form or Show view (skipping Status and Confirm).
• The application makes API requests to load and persist data. We do not lose data after a browser refresh.

## Technical Specifications
• React
• Webpack, Babel
• Axios
• Storybook, Webpack Dev Server, Jest, Testing Library
• The Scheduler client application created using Create React App. Express is the basis for the Scheduler API server application.
  Both servers run concurrently; requests are proxied from the Webpack development server to the API server.

Dependencies:
axios: ^0.21.1
classnames: ^2.2.6
normalize.css: ^8.0.1
react: ^16.9.0
react-dom: ^16.9.0
react-scripts: 3.0.0

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
