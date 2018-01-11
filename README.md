

![Logo](screenshots/ElectronSQLite.png)

How to Build an Electron App with a Local SQLite3 Database That's Portable.
------------------------------------------------------------------------

This project demonstrates how to install and use a local SQLite3 database in Electron using [SQL.js](https://github.com/kripken/sql.js). SQL.js is a port of SQLite to JavaScript, by compiling the SQLite C code with [Emscripten](https://github.com/kripken/emscripten). Using only JavaScript means there are no C bindings or node-gyp compilations to deal with.

Updates
-------
__January 2018__
- Updated SQL.js to 0.4.0
- Updated Bootstrap to 4.0.0-beta.3. Form validation was revised to agree with [current documentation](http://getbootstrap.com/docs/4.0/components/forms/). Improved responsive layout and UTF-8 support.
- Dropped all non-functional UI features.


Quick Code Tour
---------------

 - The code entry point is in **package.json** under the key "main". The value is "main.js"
 - **main.js** calls model.initDb() from **model.js** which creates a new SQLite3 database from **schema.sql**. A callback creates a BrowserWindow and loads **index.html**.
 - **index.html** loads Bootstrap's CSS in the &lt;head&gt; tag and **renderer.js** after the closing &lt;body&gt; tag.
 - **renderer.js** loads Cheerio, jQuery, Bootstrap and it's dependency; Tether.
 - A [composed HTML pattern](https://github.com/patrickmoffitt/composed-html-example) is used to load the markup.
 - The application's database work is all done in **model.js**. Here you'll find functions to open and close the database as well as functions to select, insert, update, and delete records. [Prepared statements](https://en.wikipedia.org/wiki/Prepared_statement) are used throughout.
 - The application opens with a list of people. Click a red X to delete a person's record.

 ![People](screenshots/people-list.png)
 - Click a pencil (shown above) to edit a person:

 ![Edit](screenshots/edit-person.png)
 - Click Add in the left rail to add a new person record:

 ![Add](screenshots/add-person.png)

Uninstalling
-------------

 Please note that running this application will install a tiny SQLite database in the folder returned by electron.app.getPath('userData'). To uninstall simply delete this folder.
