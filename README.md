# Weather Forecast Web Application

## Overview

This is a weather forecast web application built using React. It allows users to search for cities, view current weather details, and see forecast for the selected city. The application features infinite scrolling for city data, sorting functionality, and error handling for cases where city data cannot be retrieved.

## Features

- **City Search**: Search for cities using the AsyncPaginate component.
- **Infinite Scroll**: Load more cities as you scroll down.
- **City Details**: View current weather and a forecast for selected cities.
- **Sorting**: Sort city data by columns like City Name, Country, Timezone.
- **Error Handling**: Display appropriate messages when city data cannot be fetched.
- **Responsive Design**: Optimized for both desktop and mobile views.

## Additional Features

- **Additional Weather Data**: Each row in the weather forecast is clickable. When clicked, it reveals more detailed weather information.

- **Table Sorting**: Clicking on any of the table headers (e.g., City Name, Temperature, etc.) sorts the data accordingly. The sorting can be toggled between ascending and descending order for better data organization.

## Installation

To run the project locally, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/ramakrishnagarlapati/weather-app
    ```

2.  **Navigate to the project directory:**

    ```bash
    cd weather-app
    ```

3.  **Install dependencies:**

    ```bash
    npm install
    ```

4.  **Start the development server:**

        ```bash
        npm start
        ```

    Open your browser and visit http://localhost:3000 to view the application.
