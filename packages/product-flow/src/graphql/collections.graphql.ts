// import {gql} from '@apollo/client';
import {graphql} from '../gql';

const GET_COLLECTIONS = graphql(`
  query Collections {
    collections(options: {topLevelOnly: true}) {
      totalItems
      items {
        id
        slug
        name
        description
        position
        productVariants {
          items {
            id
            name
            price
            productId
            product {
              description
              assets {
                id
                name
                mimeType
                source
                width
                height
              }
            }
            assets {
              id
              name
              mimeType
              source
              width
              height
            }
          }
          totalItems
        }
      }
    }
  }
`);

export default GET_COLLECTIONS;
