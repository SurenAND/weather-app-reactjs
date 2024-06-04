import NodeGeocoder, { Options } from "node-geocoder";

export const getCity = (lat: number, lon: number) => {
  const options: Options = {
    provider: "openstreetmap",
  };

  const geocoder = NodeGeocoder(options);

  geocoder
    .reverse({ lat, lon })
    .then((res) => {
      const city = res[0]?.city;
      console.log(city);
    })
    .catch(console.error);
};
