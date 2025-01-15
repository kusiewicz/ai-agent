# AI Agent 🤖

<img width="1499" alt="Pasted Graphic 3" src="https://github.com/user-attachments/assets/63e732e9-4920-48ed-9194-b63e1982cb9b" />



This project is a small **Node.js**–based AI agent that combines OpenAI’s Large Language Model (LLM) with a set of modular <i>tools</i>. The agent can figure out when to call these tools — such as fetching posts from Reddit or generating images — and then incorporate the results back into its conversation with the user. It maintains a running memory of the conversation, so it can keep track of context across user queries.

## How It Works

1. **User Input**

   You run the AI Agent by providing a message via the command line:
   ```bash
   npm start "Fetch posts from LaLiga sub-reddit and then create a humorous meme image based on choosen post. If there is any with Vinicius, pick this one."
   ```

2. **Agent Orchestration**
  - The entry point `index.ts` takes in your user message and forwards it to `runAgent`.
    
  - Inside `runAgent` the system:
      - Logs your message to a memory store (using `lowdb`)
      - Calls `runLLM` to get a response from the OpenAI GPT-based model
      - If the AI decides it needs extra data (e.g., from Reddit) or wants to generate an image, it will output a tool call—at which point `toolRunner.ts` triggers the relevant tool.

3. **Memory**
  - Every message (including system and AI replies) is stored with metadata in a dummy JSON database `(db.json)` via `memory.ts`. This allows the AI to understand the context of previous messages.

4. **Tools**
  - **Reddit** `(reddit.ts)`: Fetches the latest posts from a specified subreddit (in this example, r/laliga).
  - **Image Generation** `(generateImage.ts)`: Uses DALL·E 3–style image generation to produce an image from a text prompt.

5. **UI/Logging**
  - The console output is managed by `ui.ts`, which provides a spinner and color-coded labels for each message role (user, assistant, etc.).

## Getting Started

1. **Install Dependencies**
  ```
  npm install
  ```

2. **Configure OpenAI**

   - Create a `.env` file with your OpenAI credentials:
 ```
 OPENAI_API_KEY=your_api_key_here
  ```

2. **Run the agent**

   - For example:
 ```
 npm start "Fetch posts from LaLiga subreddit and then create a humorous meme image..."
  ```
