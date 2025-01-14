// import {gql} from '@apollo/client';
import {graphql} from '../gql';

const GET_PRODUCT = graphql(`
  query Product($productID: ID!) {
    product(id: $productID) {
      id
      name
      description
      assets {
        id
        name
        mimeType
        source
        width
        height
      }
      variants {
        id
        name
        price
      }
    }
  }
`);

export default GET_PRODUCT;
