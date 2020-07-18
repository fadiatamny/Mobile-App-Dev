export const getCurrentPositionAsync = () =>
  Promise.resolve({
    coords: {
      accuracy: 65,
      altitude: 60.79429626464844,
      altitudeAccuracy: 11.902812004089355,
      heading: -1,
      latitude: 32.07068481041871,
      longitude: 34.82329083642053,
      speed: -1
    },
    timestamp: 1595019472417.503
  });

export const reverseGeocodeAsync = () =>
  Promise.resolve([
    {
      city: 'Ramat Gan',
      country: 'Israel',
      isoCountryCode: 'IL',
      name: 'Negba Road 7',
      postalCode: '5234807',
      region: 'Tel Aviv',
      street: 'Negba Road'
    }
  ]);
