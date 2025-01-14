// import {gql} from '@apollo/client';
import {graphql} from '../gql';

const GET_COLLECTION = graphql(`
  query Collection($collectionID: ID!) {
    collection(id: $collectionID) {
      id
      name
      description
      productVariants {
        items {
          id
          name
          price
          productId
          assets {
            id
            name
            mimeType
            source
            width
            height
          }
          product {
            assets {
              id
              name
              mimeType
              source
              width
              height
            }
            description
          }
        }
      }
    }
  }
`);

export default GET_COLLECTION;
