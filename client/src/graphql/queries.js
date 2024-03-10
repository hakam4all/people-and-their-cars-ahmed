import { gql } from '@apollo/client'

// changed persons to getPerson

export const GET_PERSONS = gql`
  {
    getPerson {
      id
      firstName
      lastName
    }
  }
`

export const ADD_PERSON = gql`
  mutation AddPerson($id: String!, $firstName: String!, $lastName: String!) {
    addPerson(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`

export const REMOVE_PERSON = gql`
  mutation RemovePerson($id: String!) {
    removePerson(id: $id) {
      id
      firstName
      lastName
    }
  }
`

export const UPDATE_PERSON = gql`
  mutation UpdatePerson($id: String!, $firstName: String!, $lastName: String!) {
    updatePerson(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`



//Cars module

// GET_CARS: Changed cars to getCar 

export const GET_CARS = gql`
  {
    getCar {
      id
      year
      make
      model
      price
      personId
    }
  }
`

export const GET_PERSON_CARS = gql`
query personCars($personId: String!){
  personCars(personId: $personId){
      id
      year
      make
      model
      price
      personId
  }
}
`

export const ADD_CAR = gql`
  mutation AddCars($id: String!, $year: Int!, $make: String!, $model: String!, $price: Float!, $personId: String!) {
    addCar(id: $id, year: $year, make: $make, model: $model, price: $price, personId: $personId) {
      id
      year
      make
      model
      price
      personId
    }
  }
`


export const REMOVE_CAR = gql`
  mutation RemoveCar($id: String!) {
    removeCar(id: $id) {
      id
      year
      make
      model
      price
      personId
    }
  }
`

export const UPDATE_CAR = gql`
  mutation UpdateCar($id: String!, $year: Int!, $make: String!, $model: String!, $price: Float!) {
    updateCar(id: $id, year: $year, make: $make, model: $model, price: $price) {
      id
      year
      make
      model
      price
  }
}`

