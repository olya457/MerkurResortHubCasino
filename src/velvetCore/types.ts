import type {ImageSourcePropType} from 'react-native';

export type VenueNote = {
  id: string;
  name: string;
  hours: string;
  phone: string;
  image: ImageSourcePropType;
  description: string;
};

export type GatherNote = {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  short: string;
  image: ImageSourcePropType;
  description: string;
};

export type PlateNote = {
  id: string;
  name: string;
  minutes: number;
  ingredients: string;
  price: number;
  image: ImageSourcePropType;
};
