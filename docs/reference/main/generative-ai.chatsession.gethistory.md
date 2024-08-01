<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@fuyun/generative-ai](./generative-ai.md) &gt; [ChatSession](./generative-ai.chatsession.md) &gt; [getHistory](./generative-ai.chatsession.gethistory.md)

## ChatSession.getHistory() method

Gets the chat history so far. Blocked prompts are not added to history. Blocked candidates are not added to history, nor are the prompts that generated them.

**Signature:**

```typescript
getHistory(): Promise<Content[]>;
```
**Returns:**

Promise&lt;[Content](./generative-ai.content.md)<!-- -->\[\]&gt;
