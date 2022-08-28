import app from "./src/app";
/**
 * Get port from environment and store in Express.
 */
const port = process.env.DOCKER_PORT || 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
