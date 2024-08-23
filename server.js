const CLI = require('./lib/cli');
const pool = require('./lib/db')

// Create new instance of CLI class
const cli = new CLI(pool);

// Start by showing all employee data in a table, then run the app with inquirer prompts
cli.showStartData()
  .then(() => {
    return cli.run();
  })
  .catch((err) => {
    console.error('Error executing CLI functions:', err);
  });