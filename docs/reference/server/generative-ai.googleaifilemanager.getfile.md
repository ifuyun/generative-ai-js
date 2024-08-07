<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@google/generative-ai](./generative-ai.md) &gt; [GoogleAIFileManager](./generative-ai.googleaifilemanager.md) &gt; [getFile](./generative-ai.googleaifilemanager.getfile.md)

## GoogleAIFileManager.getFile() method

Get metadata for file with given ID.

Any fields set in the optional  parameter will take precedence over the [RequestOptions](./generative-ai.requestoptions.md) values provided at the time of the [GoogleAIFileManager](./generative-ai.googleaifilemanager.md) initialization.

**Signature:**

```typescript
getFile(fileId: string, requestOptions?: SingleRequestOptions): Promise<FileMetadataResponse>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  fileId | string |  |
|  requestOptions | SingleRequestOptions | _(Optional)_ |

**Returns:**

Promise&lt;[FileMetadataResponse](./generative-ai.filemetadataresponse.md)<!-- -->&gt;

