# Assignment 3 - Persistence: Two-tier Web Application with Database, Express server, and CSS template

## Membership Portal

This web app is the prototype the a club membership and attendance tracking
application for Rho Beta Epslion. This is intended to replace the previous
method which has stopped working and needed to be replaced. The functionality of
this website is to monitor how many community service hours the member has
completed and how many more they need to finish. There are also outlines for
future feature implementations.

This is two days past the initial due date, but I had something comeup and also
needed to start over part-way through the assignment. The only issue I really
had with this assignmnet was getting the PassportJS to work since when I used a
console.log() in the function.

The site supports both GitHub authenitcation and user creation through the main
sign in form. There is no dialog for creating an account, so it just
automatically creates a new user whenever an unkown username is created, but it
does have password validation.

I used the BootStrap CSS framework since it is a fairly common framework, and I
did not have to do any main changes other than assigning fonts and a primary
color scheme. The `sidebar.css` file was taken from the BootStrap website.

Express was used as the middleware service, and it handled a significant amount
of internal routing. To list a few:

- `express.static()` was used to serve files from the core directory
- `express.json()` was used to parse json files directly
- `app.get("/")` send the user to the homepage
- `app.get("/login")` routes the user to the homepage assuming that the user
  is validated
- `app.get("/auth/github"")` and `app.get("/auth/github/callback")`
  handles the github authentication and signin
- `app.get("/getData")` handles retrieving data from the server
- 'app.post("...")` is used for anything sending data to the middleware, and
  especially for accessing data in the server.

## Technical Achievements

- **Tech Achievement 1**: I used OAuth authentication via the GitHub strategy
- **Tech Achievement 2**: I managed to acheive 100% on all Google Lighthouse
  tests, at least running ony my local server

  I did not attempt to use another hosting site since they appeared to be behind
  paywalls, so this is still hosted on glitch: https://a3-valleyquail.glitch.me

  A demo user with premade data is username: 12 and password: 12
