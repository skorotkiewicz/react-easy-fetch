# react-easy-fetch

> Easy React component wrapper for axios

## Install

```
yarn add react-easy-fetch
// or
npm i react-easy-fetch
```

## Props

| prop      | default |   type |
| --------- | :-----: | -----: |
| url       |         | string |
| params    |   {}    | object |
| method    |  "get"  | string |
| data      |   {}    | object |
| options   |   {}    | object |
| onSuccess |         |   void |
| onError   |         |   void |

## Example

```jsx
import { EasyFetch } from "react-easy-fetch";

const App = () => {
  const handleSuccess = (data) => console.log(data);
  const handleError = (error) => console.log(error);

  const Posts = (props) => {
    console.log(props.response);
    return <div>{props.isLoading && "Loading..."}</div>;
  };

  return (
    <EasyFetch
      url="https://jsonplaceholder.typicode.com/posts"
      method="post"
      params={{ posts: 1 }}
      data={{ post: 1, user: 2 }}
      options={{
        headers: { "X-Custom-Header": "value" },
      }}
      onSuccess={(data) => {
        console.log("onSuccess");
        handleSuccess(data);
      }}
      onError={(error) => {
        console.log("onError");
        handleError(error);
      }}
    >
      <Posts />
    </EasyFetch>
  );
};
```
