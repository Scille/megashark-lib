import axios, { AxiosInstance } from 'axios';

// Only the interesting subset
interface GeoapifyAutocompleteResult {
  name: string;
  country: string;
  country_code: string;
  state: string;
  state_code: string;
  county: string;
  county_code: string;
  postcode: string;
  city: string;
  street: string;
  housenumber?: string;
  lat: number;
  lon: number;
  formatted: string;
  address_line1: string;
  address_line2: string;
  result_type: 'unknown' | 'amenity' | 'building' | 'street' | 'suburb' | 'district' | 'postcode' | 'city' | 'county' | 'state' | 'country';
  distance: number;
  timezone: {
    name: string;
    name_alt: string;
    offset_STD: string;
    offset_STD_seconds: number;
    offset_DST: string;
    offset_DST_seconds: number;
    abbreviation_STD: string;
    abbreviation_DST: string;
  };
}

export interface Address {
  country: string;
  postalCode: string;
  city: string;
  address: string;
  address2?: string;
}

export const GEOAPIFY_MOCKED_API_KEY = 'GEOAPIFY_MOCKED';

export class GeoapifyAPI {
  axiosInstance: AxiosInstance;
  apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.axiosInstance = axios.create({
      baseURL: 'https://api.geoapify.com',
      timeout: 5000,
    });
  }

  async autocomplete(query: string): Promise<Array<Address>> {
    if (this.apiKey === GEOAPIFY_MOCKED_API_KEY) {
      console.log('Autocomplete address is disabled, providing some fake data');

      // Simulate a long query
      await new Promise((res) => setTimeout(res, 500));

      return [
        {
          country: 'United Kingdom',
          postalCode: 'NW1 6XE',
          city: 'London',
          address: '221B Baker Street',
        },
        {
          country: 'United Kingdom',
          postalCode: 'KT23 3AS',
          city: 'Surrey',
          address: '4 Privet Drive',
          address2: 'The cupboard under the stairs',
        },
      ];
    }

    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&format=json&apiKey=${this.apiKey}`;

    const response = await axios.get(url);
    if (response.status !== 200) {
      console.warn(`Error when trying to autocomplete address: ${response.statusText} ${response.data}`);
      return [];
    }
    const result = response.data.results as Array<GeoapifyAutocompleteResult>;
    return result.map((addr) => {
      return {
        country: addr.country,
        postalCode: addr.postcode,
        city: addr.city,
        address: addr.address_line1,
      };
    });
  }
}
