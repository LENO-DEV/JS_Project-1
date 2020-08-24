module.exports.replaceTemplate = (temp, product) => {
  let output = temp.replace(/{% Product Name %}/g, product.productName);
  output = output.replace(/{% Image %}/g, product.image);
  output = output.replace(/{% Quantity %}/g, product.quantity);
  output = output.replace(/{% Price %}/g, product.price);
  output = output.replace(/{% ID %}/g, product.id);
  output = output.replace(/{% Nutrients %}/g, product.nutrients);
  output = output.replace(/{% Description %}/g, product.description);
  output = output.replace(/{% Country %}/g, product.from);

  if (!product.organic) {
    output = output.replace(/{% Not_Organic %}/g, "not-organic");
  }
  return output;
};
