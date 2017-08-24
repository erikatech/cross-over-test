Welcome to Video Portal

This application was built based on following technologies/frameworks

- AngularJS 1.x
- Grunt
- Karma/Jasmine
- SASS
- Angular Material
- Angm yeoman generator

The following functionalities were implemented:

- Authentication<br>
  This was done by implementing an interceptor that intercepts the httpResponse with the 401 status code. Everytime it faces this http status code,
  it redirects the user to login page, in order to avoid outside users to access the video list.

- Video list with lazy loading <br>
  To show the video list 'videogular' lib was used. I chose to use it because it got easier to perform the 'one video playing at time' requirement.
  <br>I used an API to perform the lazy loading functionality (scrollToEnd.js). It can recognize when the page reaches the bottom, and when it gets to it
  I call the service API passing new skip parameter.

- Rating videos<br>
  The user can rate videos from 1 to 5 stars. This functionality was provided by a directive I made. To render the stars the font-awesome package
  icons were used
  
  I won't be able to provide the back end for this API, since I'm not the one who wrote it. So, you won't be able to access the application,
  but you can see how it was done, throughout the code I provided  
