export function loader () {
  return `
    <!DOCTYPE html>
    <html>
    <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
    .loader {
      border: 2px solid #f3f3f3;
      border-radius: 50%;
      border-top: 2px solid #3498db;
      border-left: 2px solid #3498db;
      width: 50px;
      height: 50px;
      animation: spin 0.5s linear infinite;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    </style>
    </head>
    <body>
    
    <h2>How To Create A Loader</h2>
    
    <div class="loader"></div>
    
    </body>
    </html>
  `
}
