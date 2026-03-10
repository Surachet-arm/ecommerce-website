export const calcBulkUnitPrice = (product, qty) => {
  const tiers = [...(product.bulkPricing || [])].sort((a, b) => b.minQty - a.minQty);
  const tier = tiers.find((t) => qty >= t.minQty);
  if (!tier) return product.price;
  return Number((product.price * (1 - tier.discountPercent / 100)).toFixed(2));
};

export const calcShippingByWeight = (totalWeight, method = 'standard') => {
  if (method === 'pickup') return 0;
  const base = method === 'express' ? 25 : 12;
  const rate = method === 'express' ? 1.8 : 1.1;
  return Number((base + totalWeight * rate).toFixed(2));
};
