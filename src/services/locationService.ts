export interface Coordinates {
  lat: number;
  lng: number;
}

export function getCurrentDeviceLocation(): Promise<Coordinates> {
  return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      reject(new Error('Geolocation is not supported by your current web browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject(new Error('Location permission was denied. You can still select any city preset from the dropdown.'));
            break;
          case error.POSITION_UNAVAILABLE:
            reject(new Error('Position unavailable. Your device could not determine current coordinates.'));
            break;
          case error.TIMEOUT:
            reject(new Error('Location request timed out. Please check signal or select a city.'));
            break;
          default:
            reject(new Error('An unexpected error occurred while requesting device location.'));
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 9000,
        maximumAge: 0, // Never use cached stale positions
      }
    );
  });
}
