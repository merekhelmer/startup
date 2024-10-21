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
