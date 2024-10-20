# StarWars Test

A React application displaying Star Wars characters, films, and related data, built using React, RTK Query, and React Flow.

## Installation
### 1. Clone the Repository

```bash
git clone https://github.com/FedkinAndrey/star-wars.git
cd star-wars
```

### 2. Install Dependencies
Ensure you have Node.js (version 16 or higher) installed. Then, install the project dependencies:

```bash
npm install
```

## Getting Started
Create a .env file in the root directory or copy from project and set the following environment variable:

```bash
VITE_API_BASE_URL=your_api
```

Adjust the URL to match your API endpoint.

## Available Scripts
### Start the Development Server
Launch the development server:
```bash
npm run dev
```
This will start the application on `http://localhost:5173`.

### Build for Production
To create a production build:
```bash
npm run build
```
The optimized build output will be in the `dist` folder.

### Run Tests
Run all tests once:
```bash
npm run test
```

## Path Aliases
This project uses the @ alias to reference the src directory. This is configured in:

- vite.config.ts
- tsconfig.json

Use it like this:
```tsx
import App from '@/components/App';
```

## Test Descriptions

```text
- App Component Tests:
  - Loading State: Verifies that loading skeletons are displayed while data is being fetched.
  - Successful Data Fetch: Confirms that character cards are displayed when data is successfully fetched.
  - Error State: Checks that an error message is displayed when data fetching fails.
- CharacterCardItem Component Tests:
  - Render Character Details: Ensures the character’s name, birth year, and eye color are correctly displayed.
  - Click Event: Verifies that clicking the character card triggers the onClick handler with the correct character data.
```
These tests ensure that the components render correctly, respond to state changes, and handle user interactions as expected.