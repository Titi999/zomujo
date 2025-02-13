interface Coordinates {
  latitude: number;
  longitude: number;
}

/**
 * Retrieves the current geographical coordinates of the user's device.
 *
 * @returns {Promise<Coordinates>} A promise that resolves with the latitude and longitude of the user's current position.
 * @throws {Error} If geolocation is not supported by the browser or if there is an error retrieving the position.
 */
export function getCoordinates(): Promise<Coordinates> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        resolve({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
      },
      (error) => {
        reject(error);
      },
    );
  });
}
