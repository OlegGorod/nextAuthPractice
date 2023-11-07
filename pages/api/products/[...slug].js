import productsData from "../../../products-import.json";

function handler(request, response) {
  if (request.method !== "GET") {
    response.status(405).end();
    return;
  }

  const {slug} = request.query;
  const isValidSegment = slug.some((item) => item === undefined);
  const isSegmentExist = productsData.some(item => item['Manufacturer'] === slug[1])
  if (isValidSegment || !isSegmentExist) {
    response.status(404).json({ message: "Product not found, unfortunately" });
    return;
  }
  const currentType = slug[1];
  const similarProducts = productsData.filter(
    (items) => items["Manufacturer"] === currentType
  );

  response.status(200).json(similarProducts);
}

export default handler;
