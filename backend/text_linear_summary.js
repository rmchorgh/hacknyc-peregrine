import cohere from "cohere-ai";

export function module(prompt) {
    cohere.init('QeINVDp5BNd2PJj6irudKy8Q01ACu3vUHusy5LBR'); // This is your trial API key

    (async () => {
        const response = await cohere.generate({
            model: 'command-xlarge-nightly',
            prompt: prompt,
            max_tokens: 300,
            temperature: 0.9,
            k: 0,
            stop_sequences: [],
            return_likelihoods: 'NONE'
        });

        console.log(`Prediction: ${response.body.generations[0].text}`);
    })();
}