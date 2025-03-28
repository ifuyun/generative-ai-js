/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { expect, use } from "chai";
import * as chaiAsPromised from "chai-as-promised";
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
  SchemaType,
  Tool,
} from "../..";
import { Part } from "../../types";

use(chaiAsPromised);

/**
 * Integration tests against live backend.
 */

describe("startChat - tools", function () {
  const tools: Tool[] = [
    {
      functionDeclarations: [
        {
          name: "getTemperature",
          description:
            "Get current temperature in degrees Celsius in a given city",
          parameters: {
            type: SchemaType.OBJECT,
            properties: {
              city: {
                type: SchemaType.STRING,
                description: "A city name, for example, San Francisco",
              },
            },
            required: ["city"],
          },
        },
      ],
    },
  ];

  const part1: Part = {
    text: "What is the temperature in New York?",
  };
  const part2: Part = {
    functionResponse: {
      name: "getTemperature",
      response: {
        name: "getTemperature",
        content: {
          temperature: "30",
        },
      },
    },
  };

  this.timeout(60e3);
  this.slow(10e3);
  it("stream false", async () => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro-latest",
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
      ],
      tools,
    });
    const chat = model.startChat();
    const result1 = await chat.sendMessage([part1]);
    expect(result1.response.functionCalls()).not.to.be.empty;
    const result2 = await chat.sendMessage([part2]);
    expect(result2.response.text()).to.not.be.empty;
    const history = await chat.getHistory();
    expect(history[0].parts[0].text).to.equal(part1.text);
    expect(history[2].parts[0].functionCall).to.deep.equal(part2.functionCall);
    expect(history[3].parts[0].text).to.include("30");
    expect(history.length).to.equal(4);
  });
});
