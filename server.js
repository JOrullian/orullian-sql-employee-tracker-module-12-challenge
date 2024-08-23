const CLI = require('./lib/cli');
const pool = require('./lib/db')

const cli = new CLI(pool);

cli.showStartData()
  .then(() => {
    return cli.run();
  })
  .catch((err) => {
    console.error('Error executing CLI functions:', err);
  });