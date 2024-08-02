### Warehouse Management System

<!-- Description: -->
The Warehouse Management System is a React-based application designed to manage warehouse listings, details, and custom fields. It allows users to view a list of warehouses, filter and sort them, view detailed information about a selected warehouse, and add new warehouses with custom fields.

<!-- Features: -->
Warehouse List: View and filter a list of warehouses.

Warehouse Details: View and edit detailed information about a specific warehouse.

Add New Warehouse: Add new warehouses with custom fields.

Custom Fields: Add and edit custom fields for each warehouse.

Carousel: Dynamic carousel to showcase images.

<!-- Technologies Used -->
Front-end: React.js, React-Redux
Back-end: None (client-side application)
Tools: Git, VS Code
Styling: Custom CSS


<!-- Installation -->
1.	Clone the repository
git clone https://github.com/your-username/your-repo-name.git
2.	Navigate to the project directory
cd your-repo-name
3.	Install the dependencies
npm install

<!-- Usage -->
1.	Start the development Server
npm start
2.	Open your browser and navigate to ‘http://localhost:3000’.

<!-- Project Structure -->
App.jsx: The main component defining the routes of the application.

index.js: Entry point of the application, setting up Redux, React Router, and the root component.

/pages/WarehouseList.jsx: Component for displaying the list of warehouses with filtering and sorting options.

/pages/WarehouseDetails.jsx: Component for displaying and editing the details of a specific warehouse.

/pages/components/Footer.jsx: Footer component with social media links.

/pages/components/PopupForm.jsx: Popup form component for adding new warehouses.

/redux/store.js: Redux store configuration.

/redux/warehouseSlice.js: Redux slice managing the warehouse state.

<!-- Acknowledgements -->
React: For building the user interface.
Redux: For state management.
React Toastify: For toast notifications.
React Slick: For the carousel component.