The GitLens extension for VS code is very helpful in visualizing the repository and version control changes, but isn't always intuitive 
## Midterm Study Notes
#### HTML Elements and Attributes
- link tag:
  - Links external resources to the HTML document
  - `<link rel="stylesheet" href="styles.css">`
- div Tag
  - Defines a division or section in an HTML document, container for other elements
  - `< div class="container" >
  < !-- Content goes here -- >
< /div >`
- Common HTML Tags:
  - Paragraph: p
  - Ordered List: ol
  - Unordered List: ul
  - Headings: h1, h2, h3
  -`< !DOCTYPE html >`
- Displaying image with hyperlink:
  `<a href="https://www.example.com">
  <img src="image.jpg" alt="Description">
</a>`

#### CSS Selectors and Styling
- ID Selector: `#elementID { /* styles */ `}
- Class Selector (.class): `.className { /* styles */ }`
- Change all div elements to have a red background:
`div {
  background-color: red;
}`
- Specific text styling: 
`<p>This is <span class="highlight">trouble</span> text.</p>
.highlight {
  color: green;
}`
- Box Model (from inside out): 
  - Content, Padding, Border, Margin
- CSS Flexbox
`.container {
  display: flex;
  flex-direction: row; /* or column */
  justify-content: center; /* horizontal alignment */
  align-items: center; /* vertical alignment */
}` 
- Flex Properties:
  - display: flex;
  - flex-direction: row | column;
  - justify-content: flex-start | center | flex-end | space-between | space-around;
  - align-items: stretch | center | flex-start | flex-end;

#### JavaScript 
- `const functionName = (parameters) => {
  // function body
};`
- `const newArray = originalArray.map((element, index, array) => {
  // return new value
});`
- `const numbers = [1, 2, 3];
const squares = numbers.map(num => num * num); // [1, 4, 9]`
- Selecting and modifying DOM elements: `const element = document.getElementById('elementID');
element.addEventListener('event', function() {
  // event handler code
});`
- Changing element styles:`const element = document.getElementById('byu');
element.style.color = 'green';`
- Using Query selectors:`document.querySelector('#id')` or `document.querySelector('.class')`
- Adding New Properties: `obj.newKey = newValue;`
- Including JavaScript in HTML: `<script>
  // JavaScript code here
</script>`
- Working with promises: `const myPromise = new Promise((resolve, reject) => {
  // asynchronous operation
  if (success) {
    resolve(result);
  } else {
    reject(error);
  }
});`
- Handling a promise:`myPromise.then(result => {
  // handle success
}).catch(error => {
  // handle error
});`

#### JSON (JavaScript Object Notation)
`{
  "key": "value",
  "array": [1, 2, 3],
  "object": {
    "nestedKey": "nestedValue"
  }
}`

#### Console Commands (Unix/Linux)
- chmod: change file access permissions
- pwd: print current working directory
- ls -la: list all files and directories with detailed information
- vim: open the Vim text editor
- nano: open the Nano text editor
- mkdir: new directory
- mv: move or rename files and directories
- rm: remove files or directories
- man: display the manual pages for commands
- ssh: securely connect to a remote server (remote shell session)
- ps: display currently running processes
- wget: download files from the internet
- sudo: execute a command with superuser privileges

#### Domain Name System (DNS)
Example Domain: startup.stream.sync.click
- Top-Level Domain (TLD): .click
- Second-Level Domain: sync.click
- Subdomain: stream.sync.click
- Sub-subdomain: startup.stream.sync.click

#### DNS A Record
- Maps a domain name to an IPv4 address, cannot point to another A record
- Port 80: HTTP (Hypertext Transfer Protocol)
- Port 443: HTTPS (HTTP Secure)
- Port 22: SSH (Secure Shell)

#### HTTPS and Web Certificates
- HTTPS: Secure version of HTTP, encrypts data between client and server
- Web Certificate: Required for HTTPS, validates the identity of the website, issued by Certificate Authorities (CAs).

## Final Study Notes
#### Common Ports
- HTTP: 80
- HTTPS: 443
- SSH:  22
#### HTTP Status Codes
- 300 Range (Redirection): Requested resource has moved or requires redirection (`301 Moved Permanently`, `302 Found`)
- 400 Range (Client Errors): Request was invalid or cannot be fulfilled (`400 Bad Request`, `404 Not Found`)
- 500 Range (Server Errors): Server encountered an error and cannot fulfill the request (`500 Internal Server Error`)
#### HTTP Headers
`Content-Type Header`: Indicates the media type of the resource (text/html, application/json), tells the client how to interpret the response data
#### Cookies
- Secure Cookie: only sent over HTTPS connections
- HttpOnly Cookie: Inaccessible to client-side JavaScript; mitigates XSS attacks
- SameSite Cookie: Restricts cross-site request handling, includes Strict, Lax, None (requires secure flag)
#### Express Middleware 
```
app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
});
```
For an HTTP GET request to /api/document, the output would be:
`GET /api/document`

- Middleware and route handlers execute in the order they are defined.
- Once a response is sent (e.g., res.send()), subsequent middleware or handlers do not execute.

#### Front End JavaScript Fetch
Example backend code:
```
app.get('/api/data', (req, res) => {
    res.json({ message: "Hello, World!" });
});
```
Frontend fetch:
```
fetch('/api/data')
  .then(res => res.json())
  .then(data => console.log(data.message));
```
Console output:
Hello, World!
#### MongoDB Queries
`{name: "Mark"}`
This query selects all documents where the name field matches "Mark" exactly.
example: `{ "_id": 1, "name": "Mark", "age": 25 }`
#### Password Storage
Passwords should be stored using a strong hash function (bcrypt2), never store in plain text
#### WebSockets
Back-end:
```
const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });
server.on('connection', ws => {
    ws.send('Welcome!');
});
```
Front-end:
```
const ws = new WebSocket('ws://localhost:8080');
ws.onmessage = event => console.log(event.data);
```
Console log:
Welcome!
#### Acronyms
- JSX: JavaScript XML (syntax extension for React)
- JS: JavaScript
- AWS: Amazon Web Services
- NPM: Node Package Manager
- NVM: Node Version Manager
#### React
```
const Greeting = ({ name }) => <div>Hello, {name}!</div>;
```
For `<Greeting name="Merek"` />, output:
Hello, Merek!

- Nested Components: React components can include each other
```
const Counter = () => {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
};
```
- React re-renders components when state changes, conditional rendering updates the displayed components dynamically
- Clicking a button or triggering a state change toggles between rendering different components
```
setValue(value + 1);       // uses the current state
setValue((prev) => prev + 2);  // uses the updated state
```
In React, these updates are batched, and the final result reflects the combined updates

- useState: Manage component state
- useContext: Access and update context values
- useRef: Access DOM elements or persist values
- useEffect: Side effects (data fetching, subscriptions) that run after render
- useMemo/useCallback (Performance Hooks): Optimize rendering
#### React Router
Allows route-based rendering in React apps, BrowserRouter must wrap routes, Link creates navigable links, and Route defines a component for a particular path
#### package.json
Eescribes the project, lists dependencies, scripts, and other metadata for a Node.js project
#### fetch Function
fetch(url, options): Performs network requests, returns a promise with a Response. Used in front end JS and can be used in back end Node.js
#### Node.js
Node.js runs JavaScript on the server-side and provides a runtime for building scalable applications
1. Synchronous code
2. Microtasks (Promises, queueMicrotask)
3. Macrotasks (Timers, I/O callbacks)
```
console.log("Start");
setTimeout(() => console.log("Timeout"), 0);
Promise.resolve().then(() => console.log("Promise"));
console.log("End");

// Output:
Start
End
Promise
Timeout
```
#### PM2
A production process manager for Node.js applications, helps keep apps running, manage restarts, and load balancing.
#### Vite
A build tool that provides fast development server and optimized builds for modern web projects, often used with React, Vue, etc.
