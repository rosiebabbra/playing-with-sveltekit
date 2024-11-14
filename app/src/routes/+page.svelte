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
			chatResponse = data.choices[0].message.content || 'No response';
		} catch (error) {
			chatResponse = `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`;
		} finally {
			loading = false;
		}
	}
</script>

<main>
	<div class="flex justify-center items-center pt-20">
		<h1 class="text-2xl font-bold text-pink-400">ChatGPT SvelteKit Demo</h1>
	</div>

	<div class="flex flex-col justify-center items-center w-1/2 mx-auto pt-3.5">
		<textarea
			bind:value={userPrompt}
			rows="4"
			placeholder="Enter your prompt..."
			class="mb-4 p-2 border rounded w-full"
		></textarea>
		<button
			on:click={getChatResponse}
			disabled={loading}
			class="p-2 bg-pink-400 text-white rounded"
		>
			{loading ? 'Loading...' : 'Get Response'}
		</button>
		{#if chatResponse}
			<p>{chatResponse}</p>
		{/if}
	</div>
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
