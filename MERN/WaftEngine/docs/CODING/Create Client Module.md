Normally, a module consists of CRUD functionally. So, we will break this into four parts. Starting from simplest

1. Create data
2. Read: load all data
3. Update data
4. Delete data 

**Step 1:** Create container module.

`$ yarn run generate`
or

`$ npm run generate`

choose `container`

choose `Stateless Function`

What Should it be called? `News`

Do you want headers? `N`

Do you want an actions/constants/selectors/reducer tuple for this container? `Y`

Do you want sagas for asynchronous flows? (e.g. fetching data) `Y`

Do you want i18n messages (i.e. will this component use text)? `N`

Do you want to load resources asynchronously? `y`

It will generate all required file for News module.

**Step 2:** Connect it to router. Now, we can start the app for rest of the process

`$ npm start` 
or

`yarn start`
Open `app/routes/admin.js` import new `module/Lodeable`

Import artist module page from `containers/News/ Loadable`

eg : `import DashboardPage from '../containers/News/Loadable';`

Add another object to array below

`“/admin/dashboard”`

```
Routes=[{
              …}
              ....,
              { path:/ admin artist manage
                Comp
```

on News
Integrate route link in sidebar

`app/layout/admin/components( main list item.js)`
Copy any link block and make changes accordingly 

```html
<link to= "/admin/artistmanage">
<list item button selected= {path name=...>
<list item……..>
</link>
```

 Now, the route should be setup

 **Step 3:** Now, we can start working on the generated file

Edit

`/app/containers/admin/News/index.js`

Import page header and page content return <....>

```
<page header> artist manage </page head>
<page content> this is body < /page content>
```

 **Step 4:** Now, we want to call a get request to list down all artist

For every async api call, we define three actions: request, success, failure in constant.js. We follow redux ducks pattern here

```
export constant LOAD_ALL_REQUEST  
                LOAD_ALL_SUCCESS
                LOAD_ALL_FAILURE
```

We then create corresponding action creators in action.js

```
eg: export constant load request
  =  payload =({ type:(from constant) payload})
```

**Step 5:** Then we do api call from saga.js, where we take type of action in action.js and make function according to type. The function in saga.js is generic function as

```
eg: function* load all (...){...}
```

and use yield for it 

And we export all the functions in the saga as

```
export default function* default saga (..) { yield take/ takelatest( type, function)}
```

while calling api, we call it as 

eg: for get method

```
api.get ( request, success function, failure function)
```

**Step 6:** Then we have to modify reducer.js for different types like success, failure, request. We import produce from inner action type from constant and modify as below:

```
switch (action) {
    Case type :
    (modification)
    break;
}
```

Step 7: Then we take the value of modified value in index.js from reducer.js through selector.js. The selector.js structure is as below:

```
export constant make select all=(..)
Create selector (select domain, state=state all);
```

Then use import the selector function in index.js use the value of reduce in index.js.

 

