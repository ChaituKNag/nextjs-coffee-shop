import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if(req.method !== 'POST') {
        res.status(405).json({ message: 'Method not allowed' });
        return;
    } 

    const body = req.body;

    const response = await fetch(`${process.env.COFFEE_SERVER_URL}/coffeeCart/${body.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();

    res.status(200).json(data)
}