import { OPENAI_API_KEY } from '$env/static/private';

// @ts-ignore
export async function POST({ request }) {
    const { prompt } = await request.json();

    try {
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini', // Use the specific model you need
                prompt: prompt,
                max_tokens: 100
            })
        });

        const data = await response.json();

        if (!response.ok) {
            return new Response(JSON.stringify(data), {
                status: response.status,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch data from OpenAI' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}