# orullian-CLI-employee-tracker-module-12-challenge

## Description
This is a CLI-based employee tracker, mainly designed for small businesses. The employee tracker is entirely written in the backend and can be connected to a front end UI to make it end user friendly. Some functionality of the employee tracker includes, listing employee data, adding employees and deleting employees.  The data is housed in a local SQL database and contains three data tables: departments, roles and employees. Data is connected between all three tables with the use of FOREIGN KEYs.  

In its current form, users will perform all inputs on a CLI, for example, the integrated terminal associated with VSCode.  Users will also require a PostgreSQL account and input their credentials in the code before use.  A routes.js file is included with some starter routes if a user desires to implement an API. CRUD operations are modularized into their own .js files in the /lib folder and further subdivided by their type. 

## Usage
Users must first install PostgreSQL and all it's dependencies before using this application. Be sure to make a note of your login credentials as they are required for this app. After ensuring you have installed PostgreSQL, open the server.js file in your CLI of choice. VSCode comes with an integrated terminal and instructions will be geared toward this CLI.  

In your text editor of choice, input your PostgreSQL password on the cli.js and db.js files where it is indicated. Then, type `psql -U postgres` in the CLI. Type in your password. Now type in `\i db/schema.sql`. This will create and connect the user to a local instance of the employees_db SQL database. If desired, the user can type `\i db/seeds.sql` into the CLI to input some sample employee data into the database to see how it looks.

Now type `\q` to leave the PostgreSQL command line and type in `npm start` to initiate the app. The user will be greeted with a table showing all current employee data. Depending on how many employees are currently in the database, the table may not be large enough to show all data. Using the arrow keys, the user can select one of a range of options to view, create and delete data from the database. The user will arrow down or up and press enter to move on to further steps. After completed their selected operation, the related data table will be displayed with the new datapoints (or removed datapoints if deleted). The app will then return to the initial selection and the user can continue to use it without having to reinvoke `npm start`.

[Tutorial Video](https://www.loom.com/share/3418568ecbd2485eb2a6bb138421d19b?sid=6b319b19-d4c5-4255-9f27-9edf385c2ebb)

## Credits
### Third-Party Assets
- inquirer (npm)
- PostgreSQL
- pg (npm)
- node.js

All code is original and written by Jedediah Craig Orullian.

This project is part of an ongoing coding bootcamp.