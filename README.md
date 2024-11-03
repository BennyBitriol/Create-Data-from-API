# User Management Application

This application utilizes the **DummyJSON** API to manage user data efficiently. Users are always grouped by their respective departments, and you can easily search, filter, and sort users based on various parameters.

## Features

- **Grouped Users by Department**: Access the API endpoint to retrieve users organized by their respective departments.
  - **API Document**: Use `https://create-data-from-api-p5v9.vercel.app/api` to use api document
  - **Using Search Function**: Send a request to `/department/search` to search and get the list of users categorized by department.
  - **Using Filter Function**: Send a request to `/department/filter` to filter and get the list of users categorized by department.

- **Search**: Find users by name.
  - **Example**: `search: 'John'`
  
- **Filter**: Narrow down results based on specific attributes.
  - **Example**: 
    - `filterKey: 'hair.color'`
    - `filterValue: 'Brown'`
  
- **Pagination**: Control the number of results returned.
  - **Limit**: Specify the number of results per page.
    - **Example**: `limit: 10`
  - **Skip**: Define the starting point for pagination.
    - **Example**: `skip: 0` (pagination starts from 0)
  
- **Sorting**: Order results to your preference.
  - **Order**: Choose between ascending or descending order.
    - **Example**: `order: 'asc'`
  - **Sort By**: Select the field to sort the results.
    - **Example**: `sortBy: 'firstName'`

## Installation

To install the necessary dependencies, run:

```bash
$ yarn install
```

## Running the Application

To start the application, use one of the following commands:

- **Development Mode**:

```bash
$ yarn run start
```

- **Watch Mode**:

```bash
$ yarn run start:dev
```

## Testing

To run unit tests, execute:

```bash
$ yarn run test
```
