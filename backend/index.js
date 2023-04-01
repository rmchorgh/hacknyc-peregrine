import { module as tlinear_mod } from "./text_linear_summary.js";

(async () => { 
    console.log(
        "Result: " + 
        await tlinear_mod('I am creating an application that sends a JSON to an LLM that uses it to write a custom newsletter. Here is an example JSON create HTML code for a newsletter out of it. {"subject": "Weekly Spotify Report", purpose: "gives me a weekly update about my spotify listening habits" "section": { "title": "My favorite music", "module": { "Type": "List", "API": "Spotify", "Description": "Extract information about my favorite albums" }, "module": { "Type": "List", "API": "Spotify", "Description": "Extract information about my favorite songs" } } }', "some_vars")
    );
})();
