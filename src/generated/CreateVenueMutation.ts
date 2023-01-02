/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VenueInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateVenueMutation
// ====================================================

export interface CreateVenueMutation_createVenue {
  __typename: "Venue";
  id: string;
}

export interface CreateVenueMutation {
  createVenue: CreateVenueMutation_createVenue | null;
}

export interface CreateVenueMutationVariables {
  input: VenueInput;
}
