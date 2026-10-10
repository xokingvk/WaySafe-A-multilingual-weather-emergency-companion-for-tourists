import type { CityPreset } from '../types/emergency';

export const CITY_PRESETS: CityPreset[] = [
  {
    id: 'chennai',
    name: 'Chennai',
    state: 'Tamil Nadu',
    lat: 13.0827,
    lng: 80.2707,
    imdDistrictId: '555',
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    state: 'Maharashtra',
    lat: 19.0760,
    lng: 72.8777,
    imdDistrictId: '430',
  },
  {
    id: 'kolkata',
    name: 'Kolkata',
    state: 'West Bengal',
    lat: 22.5726,
    lng: 88.3639,
    imdDistrictId: '490',
  },
  {
    id: 'delhi',
    name: 'Delhi NCR',
    state: 'Delhi',
    lat: 28.6139,
    lng: 77.2090,
    imdDistrictId: '130',
  },
  {
    id: 'goa',
    name: 'Goa (Panaji)',
    state: 'Goa',
    lat: 15.4909,
    lng: 73.8278,
    imdDistrictId: '445',
  },
];
