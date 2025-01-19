import {PriceRange, SinglePrice} from './gql/graphql';

export function isSinglePrice(
  price: SinglePrice | PriceRange,
): price is SinglePrice {
  return (price as SinglePrice).value !== undefined;
}
export function isPriceRange(
  price: SinglePrice | PriceRange,
): price is PriceRange {
  return (
    (price as PriceRange).max !== undefined &&
    (price as PriceRange).min !== undefined
  );
}

export function priceExtractor(price: SinglePrice | PriceRange) {
  if (isPriceRange(price)) {
    if (price.min === price.max) {
      return `$${price.max.toLocaleString()}`;
    }
    return `$${price.min.toLocaleString()} - $${price.max.toLocaleString()}`;
  } else if (isSinglePrice(price)) {
    return `$${price.value.toLocaleString()}`;
  }
}

export function interpolate(
  value: number,
  inputRange: [number, number],
  outputRange: [number, number],
) {
  const [inputMin, inputMax] = inputRange;
  const [outputMin, outputMax] = outputRange;
  const normalizedValue = (value - inputMin) / (inputMax - inputMin);

  return normalizedValue * (outputMax - outputMin) + outputMin;
}
