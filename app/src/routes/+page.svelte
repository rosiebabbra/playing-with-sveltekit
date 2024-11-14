<script>
	let userPrompt = '';
	let loading = false;
	// @ts-ignore
	/**
	 * @type {any[]}
	 */
	let chatHistory = []; // Keep track of user and AI messages.

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
			chatHistory = [
				// @ts-ignore
				...chatHistory,
				{ role: 'user', content: userPrompt },
				{ role: 'assistant', content: data.choices[0].message.content }
			];
			userPrompt = '';
		} catch (error) {
			console.error('Error:', error);
			// @ts-ignore
			chatHistory = [
				...chatHistory,
				{ role: 'system', content: 'Error: Could not fetch response' }
			];
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

		<div class="w-full mt-5">
			{#each chatHistory as message, index}
				<div class="mb-2">
					<strong class={message.role === 'user' ? 'text-blue-600' : 'text-green-600'}>
						{message.role === 'user' ? 'User:' : 'Assistant:'}
					</strong>
					<span>{message.content}</span>
				</div>
			{/each}
		</div>
	</div>
</main>
