import productsData from "../../../products-import.json";

async function handler(request, response) {
    if (request.method === "GET") {
        response.status(200).json(productsData);
      } else {
        response.status(405).end(); 
      }
}

export default handler;
