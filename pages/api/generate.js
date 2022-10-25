import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: generatePrompt(req.body.prompt, req.body.sample),
    temperature: 0.6,
    max_tokens: 70,
  });
  console.log(completion.data.choices[0].text);
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(prompt, sample) {
  console.log(`${sample} ${prompt}`);
  return `${sample} ${prompt}`;
}

/** 
Complete the sentence.

Start of sentence: It was a great day, but
End of sentence: the weather was awful.
Start of sentence: I hurt my leg so
End of sentence: I couldn't go to school that day, therefore
Start of sentence: ${prompt}
End of sentence:`
*/