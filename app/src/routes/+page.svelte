<script>
	let userPrompt = '';
	let chatResponse = '';
	let loading = false;

	async function getChatResponse() {
		loading = true;
		try {
			const response = await fetch('/api/gpt', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ prompt: userPrompt })
			});

			if (!response.ok) {
				throw new Error('Failed to fetch response from the server');
			}

			const data = await response.json();
			chatResponse = data.choices[0]?.text.trim() || 'No response';
		} catch (error) {
			chatResponse = `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`;
		} finally {
			loading = false;
		}
	}
</script>

<main>
	<h1>ChatGPT SvelteKit Demo</h1>

	<textarea bind:value={userPrompt} rows="4" placeholder="Enter your prompt..."></textarea>
	<button on:click={getChatResponse} disabled={loading}>
		{loading ? 'Loading...' : 'Get Response'}
	</button>

	{#if chatResponse}
		<h3>ChatGPT Response:</h3>
		<p>{chatResponse}</p>
	{/if}
</main>

<style>
	textarea {
		width: 100%;
		margin-bottom: 1em;
	}
	button {
		margin-bottom: 1em;
	}
</style>
