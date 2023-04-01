import { Configuration, OpenAIApi } from "openai";
import { NodeVM } from 'vm2';

import { api_result } from './sample_api_result.js';

// VM2 configuration
const vm = new NodeVM({
    console: 'inherit',
    sandbox: {},
    require: {
        external: true,
        builtin: ['fs', 'path'],
        root: './',
        mock: {
            fs: {
                readFileSync: () => 'Nice try!'
            }
        }
    }
});

// OpenAI configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// Limit Token usage through generation of compression code for data
function cut_json_prompt_at_token(json_api_result, token_count) {
    return json_api_result.split(" ").slice(0, token_count).join(" ");
}

async function generate_template_parser(api_result, variable) {
    const template_prompt = ("Complete the function so it returns " + variable + " as a string function foo(){ const data = " + cut_json_prompt_at_token(api_result, 1900) + "...};")

    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: template_prompt,
        max_tokens: 2000,
    });

    return "module.exports = function(){ const data = " + api_result + ";" + completion.data.choices[0].text;
}

async function module(api_result, type, variable) {
    const prompt_parser = await generate_template_parser(api_result, variable);

    console.log(await prompt_parser)

    const functionInSandbox = vm.run(prompt_parser);
    const result = functionInSandbox();

    var new_prompt;
    switch(type) {
      case "Text":
        new_prompt = "Write an HTML email on " + variable + 
          " with values: " + result.split(" ").slice(0, 3990).join(" "); // Room for improvement 
        break;
      case "Text":
        new_prompt = "Write an HTML email on " + variable + 
          " with values: " + result.split(" ").slice(0, 3990).join(" "); // Room for improvement 
        break;
      default:
        throw new Error('Type is invalid');
    } 
    
    console.log(new_prompt);

    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: new_prompt,
        max_tokens: 2500,
    });

    return completion.data.choices[0].text;
}

// Main
(async () => {
  const variable = "the titles";

  console.log(
    "Result: " + 
    await module(api_result, "Text", variable)
  );
})();