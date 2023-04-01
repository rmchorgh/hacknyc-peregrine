import { LinearDocument } from "@linear/sdk";

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// Fine tune

function generate_linear_prompt(prompt, _type, ...vars) {
    // (async () => {
    //     const issues = await linearClient.issues({ orderBy: LinearDocument.PaginationOrderBy.UpdatedAt });
    // })();

    return prompt
}

export async function module(prompt, ...vars) {
    var custom_prompt = generate_linear_prompt(prompt, "some");

    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 300,
    });

    return completion.data.choices[0].text;
}