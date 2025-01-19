// import {gql} from '@apollo/client';
import {graphql} from '../gql';

const GET_COLLECTION = graphql(`
  query Collection($slug: String!) {
    collection(slug: $slug) {
      id
      slug
      name
      description
      filters {
        code
        args {
          name
          value
        }
      }
      featuredAsset {
        id
        preview
      }
      productVariants {
        items {
          id
          name
          price
          productId
          facetValues {
            id
            facetId
            name
            code
          }
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
