// import {gql} from '@apollo/client';
import {graphql} from '../gql';

const GET_SEARCH = graphql(`
  query Search(
    $collectionId: ID!
    $skip: Int!
    $take: Int!
    $sort: SearchResultSortParameter
    $facetValueFilters: [FacetValueFilterInput!]
  ) {
    search(
      input: {
        collectionId: $collectionId
        groupByProduct: true
        skip: $skip
        take: $take
        sort: $sort
        facetValueFilters: $facetValueFilters
      }
    ) {
      totalItems
      collections {
        count
        collection {
          id
          name
          description
          productVariants {
            totalItems
            items {
              id
              name
              price
              assets {
                id
                source
              }
              product {
                description
                assets {
                  id
                  source
                }
              }
            }
          }
        }
      }
      facetValues {
        facetValue {
          id
          name
          code
          facet {
            id
            name
            code
          }
        }
        count
      }
      items {
        productName
        slug
        description
        score
        productAsset {
          id
          preview
        }
        price {
          ... on SinglePrice {
            value
          }
          ... on PriceRange {
            min
            max
          }
        }
        priceWithTax {
          ... on SinglePrice {
            value
          }
          ... on PriceRange {
            min
            max
          }
        }
        currencyCode
      }
    }
  }
`);

export default GET_SEARCH;
