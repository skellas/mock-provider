This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Purpose
Playing with the MockProvider component. And trying to figure out why I keep getting the following warning in my test suite:

```
  Warning: An update to Query inside a test was not wrapped in act(...).

    When testing, code that causes React state updates should be wrapped into act(...):

    act(() => {
      /* fire events that update state */
    });
    /* assert on the output */

    This ensures that you're testing the behavior the user would see in the browser. Learn more at https://fb.me/react-wrap-tests-with-act
        in Query (at App.tsx:37)
        in div (at App.tsx:36)
        in App (at App.test.tsx:51)
        in ApolloProvider (created by MockedProvider)
        in MockedProvider (created by WrapperComponent)
        in WrapperComponent

```

"Did you follow that link and try it their way?"

Yes, reader, yes I did. And it still throws the same warning. 


### `npm test`

This is how you can see the warning messages alongside the passing tests. 

