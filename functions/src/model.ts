import { Configuration, OpenAIApi } from "openai";
import { NodeVM } from "vm2";

function shuffle(array: any) {
	let currentIndex = array.length,
		randomIndex;

	// While there remain elements to shuffle.
	while (currentIndex !== 0) {
		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex],
			array[currentIndex],
		];
	}

	return array;
}

// VM2 configuration
const vm = new NodeVM({
	console: "inherit",
	sandbox: {},
	require: {
		external: true,
		builtin: ["fs", "path"],
		root: "./",
		mock: {
			fs: {
				readFileSync: () => "Nice try!",
			},
		},
	},
});

// OpenAI configuration
const configuration = new Configuration({
	apiKey: "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",
});

const openai = new OpenAIApi(configuration);

// Limit Token usage through generation of compression code for data
function cut_json_prompt_at_token(json_api_result: any, token_count: any) {
	const chars = json_api_result
		.split(/[^a-zA-Z0-9]/)
		.slice(0, token_count)
		.join("_").length;
	return json_api_result.slice(0, chars);
}

async function generate_template_parser(api_result: any, variable: any) {
	const template_prompt =
		"Complete the function so it returns " +
		variable +
		" as a string:\nfunction foo(){ const data = " +
		cut_json_prompt_at_token(JSON.stringify(shuffle(api_result)), 1500) +
		"...];";
	const completion = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: template_prompt,
		max_tokens: 2000,
	});

	return (
		"module.exports = function(){ const data = " +
		JSON.stringify(api_result) +
		";" +
		completion.data.choices[0].text
	);
}

async function module(api_result: any, type: any, variable: any) {
	const prompt_parser = await generate_template_parser(api_result, variable);

	const functionInSandbox = vm.run(prompt_parser);
	const result = functionInSandbox();

	var new_prompt;
	switch (type) {
		case "Text":
			new_prompt =
				"Write a section that can be pasted into an HTML email. The section should contain a text summary on " +
				variable +
				" with values: " +
				cut_json_prompt_at_token(result, 1500);
			break;
		default:
			throw new Error("Type is invalid");
	}

	const completion = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: new_prompt,
		max_tokens: 2000,
	});

	return completion.data.choices[0].text;
}

// Main
export default module;
