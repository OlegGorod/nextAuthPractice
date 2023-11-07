import productsData from "../../../products-import.json";

function handler(request, response) {
    if (request.method !== 'GET') {
        response.status(405).end(); 
        return
    }

    const {id} = request.query;
    
    const filteredProduct = productsData.find((items) => items['SKU'] === id)
    if (filteredProduct === undefined) {
        response.status(404).json({message: 'Product not found'})
        return
    }
    response.status(200).json(filteredProduct)

}

export default handler
