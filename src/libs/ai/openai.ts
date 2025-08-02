import "server-only";

import OpenAI from "openai";

const client = new OpenAI();

// choose from https://platform.openai.com/docs/guides/gpt/what-are-tokens
type BuildConfigProps = Pick<
  OpenAI.Responses.ResponseCreateParamsNonStreaming,
  "input" | "model" | "temperature"
>;

export const buildOpenAIClient = async (buildConfig: BuildConfigProps) => {
  const response = await client.responses.create({
    ...buildConfig,
    max_output_tokens: 1000,
  });

  return response;
};
