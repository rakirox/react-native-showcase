// import {gql} from '@apollo/client';
import {graphql} from '../gql';

const GET_FACETS = graphql(`
  query Facets($ids: [String!]) {
    facets(options: {filter: {id: {in: $ids}}}) {
      totalItems
      items {
        id
        name
        code
        values {
          name
          code
        }
      }
    }
  }
`);

export default GET_FACETS;
