# Outswipe

Outswipe is a Progressive Web App (PWA) built with Angular, designed as a Tinder-like app for clothes. Users can swipe through clothing items, with specific swipe actions triggering different functionalities.

## Features

- **Swipe Left**: Ignore an item.
- **Swipe Right**: Show more clothes of the same type.
- **Swipe Up**: Add an item to the cart and view the price.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v12 or higher)
- [Angular CLI](https://cli.angular.io/)

### Installation

1. **Clone the repository**:
    ```sh
    git clone https://github.com/your-username/outswipe.git
    cd outswipe
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Add Angular Material**:
    ```sh
    ng add @angular/material
    ```

4. **Install HammerJS for touch gestures**:
    ```sh
    npm install hammerjs
    ```

5. **Import HammerJS in `main.ts`**:
    ```typescript
    import 'hammerjs';
    ```

### Running the App

To serve the application locally, run:
```sh
ng serve
