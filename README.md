# 🚧WIP🚧

# CUPRA Born Dashboard

A Vue.js dashboard for monitoring your CUPRA Born vehicle. 

### Light

![Dashboard Light Mode](examples/dashboard-light.png?raw=true "Dashboard Light Mode")

### Dark

![Dashboard Dark Mode](examples/dashboard-dark.png?raw=true "Dashboard Dark Mode")

## Features

- Real-time battery status monitoring
- Current mileage tracking
- Charging status and rate information
- Vehicle location mapping
- Dark/Light theme support

## Missing features
- Authentication in the application itself (for now, you need to generate a bearer token and add it to the `.env` file)
- A lot of other VW endpoints you can find the collection [here](https://github.com/Timwun/Cupra-WeConnect-Bruno-Collection) 
## Prerequisites

- Node.js (v16 or higher)
- npm

## Getting Started

Create a new `.env` file:

```env
VITE_VEHICLE_VIN=your_vehicle_vin_here
VITE_API_TOKEN=your_api_token_here
```
The `VITE_API_TOKEN` is a bearer token that (for now) you need to generate yourself with a tool like [Postman](https://www.postman.com/) or [Bruno](https://www.usebruno.com/). If you have a look at the [bruno collection](https://github.com/Timwun/Cupra-WeConnect-Bruno-Collection) you can download the collection and authenticate yourself in settings > auth > Get Access Token. Now go to an api call that requires authentication and copy the token by hovering over the var `{{access_token_set_by_collection_script}}` and paste it in the `.env` file. It should look like this:

```env
VITE_API_TOKEN=ey...
```


### Start the development server
```bash
npm run dev
```

## Contributing

This is a work in progress, and contributions are welcome. Please feel free to submit issues and pull requests.

## License

[MIT](LICENSE)

## Disclaimer

This is an unofficial project and is not affiliated with CUPRA or the Volkswagen Group.
