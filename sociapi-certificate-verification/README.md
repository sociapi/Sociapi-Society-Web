# Sociapi Certificate Verification

## Overview
This project implements a Certificate Verification page for the Sociapi Society website using React, Vite, and TypeScript. The page allows users to verify the authenticity of certificates by entering a certificate ID.

## Project Structure
The project is organized as follows:

```
sociapi-certificate-verification
├── src
│   ├── components
│   │   └── CertificateVerification.tsx
│   ├── styles
│   │   └── CertificateVerification.module.css
│   ├── utils
│   │   └── api.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── public
│   └── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Installation
To set up the project, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   cd sociapi-certificate-verification
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Development
To start the development server, run:
```
npm run dev
```
This will launch the application in your default web browser.

## Usage
Navigate to `/verify` to access the Certificate Verification page. Users can enter a certificate ID to verify its authenticity. The page will display results based on the verification status.

## Components
- **CertificateVerification.tsx**: Main component for rendering the verification form and results.
- **CertificateVerification.module.css**: Styles specific to the Certificate Verification page, adhering to the Sociapi design system.

## Utilities
- **api.ts**: Contains functions for fetching and verifying certificate data.

## Configuration
- Ensure that the `tsconfig.json` is set up for JSX and module resolution compatible with React and Vite.
- The `package.json` includes scripts for development and building the project.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.