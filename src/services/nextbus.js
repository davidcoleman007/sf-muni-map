const NEXT_BUS_BASE_URL = 'http://webservices.nextbus.com/service/publicJSONFeed';
const CMD_PARAM         = 'command';

export const VEHICLE_LOCATIONS_COMMAND = 'vehicleLocations';

export const vehicleLocationsCommandParams = (routeTag='sf-muni', sinceTime=(new Date().getTime()-15000)) => {
  return {
    a: routeTag,
    r: 'N',
    t: sinceTime
  }
};

export const fetchCommand = (command, params) => {
  const szParams = Object.entries(params).map(([key,value])=>`?${key}=${value}`).join('');
  return resolver(`${NEXT_BUS_BASE_URL}?${CMD_PARAM}=${command}${szParams}`)
};


export const fetchMuniLocations = () => {
  return fetchCommand(
    VEHICLE_LOCATIONS_COMMAND,
    vehicleLocationsCommandParams()
  );
};

const resolver = (url) =>{
  return fetch(url).then(
    (res) => {
      return res.json().then(
        (data) => {
          return data;
        }
      );
    }
  );
};