import type { NextApiRequest, NextApiResponse } from 'next'
import { CartDetails } from '../../interfaces';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if(req.method !== 'POST') {
        res.status(405).json({ message: 'Method not allowed' });
        return;
    } 

    // get existing cart data

    const getCartResponse = await fetch(`${process.env.COFFEE_SERVER_URL}/coffeeCart`);

    const cartData: CartDetails = await getCartResponse.json();

    // create coffee history entry.

    const createCoffeeOrderResponse = await fetch(`${process.env.COFFEE_SERVER_URL}/coffeeHistory`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cart: cartData,
            total: cartData.reduce((acc, item) => acc + item.cost, 0),
            date: new Date()
        })
    });

    const createCoffeeOrderData = await createCoffeeOrderResponse.json();
    console.log('createCoffeeOrderData', createCoffeeOrderData)

    // clear coffeeCart

    for(let i = 0; i < cartData.length; i++) {
        const clearCartResponse = await fetch(`${process.env.COFFEE_SERVER_URL}/coffeeCart/${i + 1}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    
        const clearCartData = await clearCartResponse.json();
    }

    res.status(200).json(createCoffeeOrderData)
}