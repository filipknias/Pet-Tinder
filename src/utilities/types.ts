export enum Colors {
  blue = "blue",
  green = "green",
  red = "red",
  black = "black",
  white = "white",
  purple = "purple"
}

export interface Token {
  token_type: string;
  expires_in: number;
  access_token: string;
}

export interface Pet {
  id:                     number;
  organization_id:        string;
  url:                    string;
  type:                   string;
  species:                string;
  breeds:                 Breeds;
  colors:                 PetColors;
  age:                    string;
  gender:                 string;
  size:                   string;
  coat:                   string;
  attributes:             Attributes;
  environment:            Environment;
  tags:                   string[];
  name:                   string;
  description:            string;
  organization_animal_id: null;
  photos:                 PrimaryPhotoCropped[];
  primary_photo_cropped:  PrimaryPhotoCropped|null;
  videos:                 any[];
  status:                 string;
  status_changed_at:      string;
  published_at:           string;
  distance:               null;
  contact:                Contact;
  _links:                 Links;
}

export interface Links {
  self:         Organization;
  type:         Organization;
  organization: Organization;
}

export interface Organization {
  href: string;
}

export interface Attributes {
  spayed_neutered: boolean;
  house_trained:   boolean;
  declawed:        null;
  special_needs:   boolean;
  shots_current:   boolean;
}

export interface Breeds {
  primary:   string;
  secondary: null;
  mixed:     boolean;
  unknown:   boolean;
}

export interface PetColors {
  primary:   string;
  secondary: null;
  tertiary:  null;
}

export interface Contact {
  email:   string;
  phone:   null;
  address: Address;
}

export interface Address {
  address1: null;
  address2: null;
  city:     string;
  state:    string;
  postcode: string;
  country:  string;
}

export interface Environment {
  children: boolean|null;
  dogs:     boolean|null;
  cats:     boolean|null;
}

export interface PrimaryPhotoCropped {
  small:  string;
  medium: string;
  large:  string;
  full:   string;
}
