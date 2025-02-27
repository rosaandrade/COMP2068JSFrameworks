//---------------------------------------------------------
// Import required modules
const connect = require('connect'); // Connect framework for middleware-based server
const url = require('url'); // URL module to parse query parameters
const http = require('http'); // HTTP module to create and serve the web page

// Create a Connect application
const app = connect();

// Function to render an HTML form for user input and display the result
function renderForm(res, result = '') {
    const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Simple Calculator</title>
        </head>
        <body>
            <h2>Simple Calculator</h2>
            <form method="GET" action="/lab3">
                <input type="text" name="x" placeholder="Enter first number" required>
                <select name="method">
                    <option value="add">+</option>
                    <option value="subtract">-</option>
                    <option value="multiply">×</option>
                    <option value="divide">÷</option>
                </select>
                <input type="text" name="y" placeholder="Enter second number" required>
                <button type="submit">Calculate</button>
            </form>
            <h3>Result: ${result}</h3>
        </body>
        </html>
    `;
    
    // Set the response header to serve HTML content
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html); // Send the HTML page to the client
}

// Function to handle calculation requests
function calculate(req, res) {
    const query = url.parse(req.url, true).query; // Parse query parameters from the URL
    
    // If no parameters are provided, show the form
    if (!query.method || query.x === undefined || query.y === undefined) {
        return renderForm(res);
    }

    const method = query.method; // Extract operation type
    const x = parseFloat(query.x); // Convert 'x' to a number
    const y = parseFloat(query.y); // Convert 'y' to a number

    // Validate input numbers
    if (isNaN(x) || isNaN(y)) {
        return renderForm(res, 'Invalid input. Please provide numeric values.');
    }

    let result; // Variable to store the result
    
    // Perform calculation based on the selected method
    switch (method) {
        case 'add':
            result = `${x} + ${y} = ${x + y}`;
            break;
        case 'subtract':
            result = `${x} - ${y} = ${x - y}`;
            break;
        case 'multiply':
            result = `${x} * ${y} = ${x * y}`;
            break;
        case 'divide':
            if (y === 0) { // Handle division by zero
                return renderForm(res, 'Error: Division by zero is not allowed.');
            }
            result = `${x} / ${y} = ${x / y}`;
            break;
        default:
            return renderForm(res, 'Invalid method. Please use add, subtract, multiply, or divide.');
    }

    return renderForm(res, result); // Display the result in the form
}

// Register the calculate function for the '/lab3' route
app.use('/lab3', calculate);

// Create an HTTP server using Connect and listen on port 3000
const server = http.createServer(app);
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000/lab3');
});


// // Example URL requests for testing:
// // http://localhost:3000/lab3?method=add&x=16&y=4       (Expected Output: 16 + 4 = 20)
// // http://localhost:3000/lab3?method=subtract&x=16&y=4  (Expected Output: 16 - 4 = 12)
// // http://localhost:3000/lab3?method=multiply&x=16&y=4  (Expected Output: 16 * 4 = 64)
// // http://localhost:3000/lab3?method=divide&x=16&y=4  (Expected Output: 16 / 4 = 4)
// // http://localhost:3000/lab3?method=divide&x=7&y=0    (Error: Division by zero is not allowed.)
// // http://localhost:3000/lab3?method=divide&x=.&y=4 (Invalid input. Please provide numeric values for x and y.)