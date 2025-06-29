export interface Address {
  street: string;
  city: string;
  zipCode: string;
  country: string;
}

export interface Property {
  id: string;
  description: string;
  address: Address;
}

export interface Contact {
  id: string;
  name: string;
  address: Address;
}

export type RelationType = 'Eigentümer' | 'Mieter' | 'Dienstleister';

export interface Relation {
  id: string;
  propertyId: string;
  contactId: string;
  type: RelationType;
  startDate: string;
  endDate: string;
  services?: string[]; // Nur bei Dienstleister
}
