# INDEXED DB USAGE EXAMPLE

This project is a simple demonstration of how to use IndexedDB in a web application. The main file is `app.js`.

## Getting Started

To get started with this project, clone the repository and open `index.html` in your browser.

## Prerequisites

This project requires a modern web browser that supports IndexedDB. No additional libraries or frameworks are needed.

## File Structure

- `app.js`: This is the main JavaScript file. It initializes an IndexedDB database and populates it with some sample data.

## How it works

The `app.js` file contains the main logic for initializing and populating an IndexedDB database.

When the DOM content is loaded, the `InitIndexedDB` function is called. This function initializes an IndexedDB database named "ADHIDB_V1".

The database is populated with a list of objects, each representing a user with an `id`, `name`, `role`, and `desc` (description).

The `onupgradeneeded` event is used to create an object store in the database, and to define indexes on the `id`, `name`, and `desc` fields. The `id` field is unique, while the `name` and `desc` fields are not.

Once the object store is created and the transaction is complete, the `DataList` array is iterated over and each object is added to the object store.

## Built With

- JavaScript
- IndexedDB API

## Authors

- Adhi Muhammad Fahmi

## License

This project is licensed under the MIT License

## Acknowledgments

- Thanks to all contributors to this project.