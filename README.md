# StreamSync
Have you ever spent more time looking for a movie than actually watching one? *StreamSync* revolutionizes your movie nights by bringing your group together to effortlessly choose the perfect film. Simply have each friend select their mood and pick their favorite genres. *StreamSync* instantly curates a list of top movie recommendations tailored to everyone's tastes. Then, with an interactive voting system, your group quickly decides on the movie that everyone will love. Turn the hassle of choosing a movie into a fun, collaborative experience with StreamSync, and make every movie night a hit!

## Design 
Here's a simple, rough draft design of the application (I'll work on shrinking this pic down)
![Mock](streamsync.jpeg) 

## Application Flow
- Group Session Initiation
  - User creates a new group session and receives a unique code to share with friends to 
- Preference Input
  - Each group member inputs their mood using and selects prefered genres
- Data Submission
  - The client application sends all group members' preferences to the server
- Recommendations
  - The server processes the combined preferences and calls a public movie API to fetch a list of movies 
- Movie List
  - API returns a list of movies to the server
  - Server responds to the client application with the curated movie list
- Voting Process
  - Group members view the recommended movies and vote for their top two choices
- Vote Tallying
  - The server collects all votes and tallies them
- Final Selection Display
  - Group's chosen movie is displayed and provides details such as synopsis, ratings, and streaming availability

## Technologies 
#### HTML
Structures the application with appropriate HTML pages for session creation/joining, preference input, combined movie recommendations and voting interface, and the final results display
#### CSS
Provides responsive and visually appealing styling across different devices, including enhancements for user interactions like mood selection and voting
#### React
Manages the user interface through components and state management, handling mood and genre inputs, displaying movie recommendations, enabling voting functionality, and navigation between different views 
#### Service
The backend will use `Node.js/Express` with endpoints for creating/joining sessions, collecting user preferences, retrieving movie recommendations, handling vote submissions, and providing the final selected movie
#### DB/Login
Utilizes a database to store session data, user preferences, and votes securely
#### WebSocket
WebSockets to broadcast real-time updates of voting progress and results to all group members

## HTML deliverable
I built out the structure of my application, *StreamSync*, using HTML.

- [x] **HTML pages** -  I created multiple HTML pages that represent the main components of the application, including `index.html` (home page with session creation/joining and preference input), `recommendations.html` (movie recommendations display and voting interface), `results.html` (final movie selection), and `login.html` (user authentication).
- [x] **Links** - Each page contains navigation links to other pages for seamless user experience. The home page includes links to the login page and the GitHub repository.
- [x] **Text** - All pages include headings, descriptions, and instructions to guide users through the application.
- [ ] **Images** -  I incorporated a main image (Logo.jpg) throughout the application and will add more in the future 
- [x] **DB/Login** - `login.html` includes input fields and a submit button for user login. There's also a placeholder for displaying data stored in the database, such as recent sessions in `index.html` and voting results in `results.html`.
- [x] **WebSocket** - In `index.html`, the group status section will display real-time updates on which group members have submitted their preferences. In `recommendations.html`, the voting progress section will show real-time updates on votes submitted by group members.

## CSS deliverable
- [x] **Header, Footer, and Main Content Body**
- Designed a consistent header and footer that appear uniformly across all pages
- The main content body is styled with appropriate padding and margins to ensure clear separation of content and improve readability
- [x] **Navigation Elements**
- Customized the navigation menu by removing default underlines and changing anchor colors to align with the application's color scheme
- [x] **Responsive Design**
- Utilized media queries to adjust layout and element sizes 
- Ensure the application maintains its usability on different screen sizes
- [x] **Application Elements**
- Applied consistent styling to forms, buttons, and other interactive elements to provide better visuals and user interaction
- [x] **Application Text Content**
- Maintained consistent font families/sizes throughout the application
- Enhanced readability by selecting appropriate font weights and line-heights
- [x] **Application Images**
- Use of image ("logo") in the page headers

## React deliverable
- [x] **Components**
- Created modular React components for each page: `Login`, `Home`, `Recommendations`, and `Results`
- Subcomponents for Login: `Authenticated` and `Unauthenticated` manage auth states dynamically
- CSS styling applied for each component
- [x] **Login**
- The application begins at the login page by default
- Successful login stores the username in localStorage and redirects the user to the Home page
- [x] **Application Logic:**
- Utilized React hooks like useState and useEffect to manage user state, authentication status, and component-specific logic
- [x] **Router**
- Implemented routing with `react-router-dom`
- Protected routes ensure unauthenticated users are redirected to the login page
- Navigation links integrated into the Header component
- [x] **Database**
- Mocked database functionality using localStorage for storing user authentication details 
- [x] **Websocket**
- WebSocket functionality is currently mocked with placeholders using setInterval to simulate dynamic data updates, will be replaced later

## Service deliverable
- [x] **Node.js/Express HTTP service**
- Backend service is implemented using Node.js and Express
- [x] **Static middleware for frontend**
- The backend uses Express static middleware to serve the React frontend when deployed
- [x] **Calls to third party endpoints**
- Placeholder functionality is implemented for fetching movie recommendations
- Real integration with The Movie Database (TMDB) API will be added in future deliverables
- [x] **Backend service endpoints** 
- `/api/auth/create` - Creates a new user and returns a unique token
- `/api/auth/login` - Logs in an existing user and refreshes their token
- `/api/auth/logout` - Logs out the user by invalidating their token
- `/api/session/create` - Creates a new session for movie night with a unique code
- `/api/session/preferences` - Submits user preferences (mood and genres) for the session
- `/api/recommendations/:sessionCode` - Placeholder endpoint that returns mock movie recommendations
- `/api/vote` - Records votes for a specific movie in a session
- `/api/results/:sessionCode` - Fetches voting results for a given session, determining the top-voted movie
- [x] **Frontend calls service endpoints** 
- Frontend components use fetch to interact with the backend

## DB/Login 
- [x] **MongoDB Atlas database created**
- Successfully set up and connected to MongoDB Atlas for secure and scalable data storage
- [x] **User registration**
- New users can create accounts, and their credentials (hashed for security) are stored in the database
- [x] **Existing user functionality**
- When an existing user logs in, their credentials are validated from the db, and a unique session token is generated
- [x] **Uses MongoDB to store credentials**
- Both user credentials (email and hashed passwords) and session-related data (preferences and votes) are securely stored in the database
- [x] **Restricts Functionality**
- You must log in to create a session or vote
- Secure API routes are accessible only after successful login (token-based validation using cookies)


[View Notes](notes.md)
