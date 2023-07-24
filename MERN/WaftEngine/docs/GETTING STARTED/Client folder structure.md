Client side is a fork of popular react-boilerplate project on github. We add various components and modules to understand the project setup at client side, you can go through ReadMe.md file.

1. **app**
   * **assets**: it contains static assets like images, videos, stylesheets etc.
   
   * **components**: You add your reusable react components. Some design components are made for the example purpose like:
      * **Header**: It is header component.
      * **CustomButton**: it is button component
      * **CustomInput**: It is input box component.
      * **Table**: It is table components used across admin panels
      * **MediaElement**: which integrates the media (images) API and display the images. It also contains some utility components.
      * **Routes**: it contains admin routes and user routes which are which are higher order components which secure the routing of view according to their logged in authority.
      * **SlickSlider**: It integrates slider API.
      * **StaticContentDiv**: It is wrapper components for static content API.
      * **DateInput**: it is simple datapicker especially useful to select old dates.
   
   * **containers**: it contains modules. The main container that bootstraps the modules in the app container. Every container module follows a standard folder structure. All are the root landing pages. **App** folder contains following files:
      * **components**: components used in app container only.
      * **action.js**: contains list of action creators.
      * **constants.js**: contains list of action types.
      * **reducer.js**: redux-reducer function which contains initial value for redux store.
      * **saga.js**: redux-saga middleware for async action calls.
      * **selectors.js**: memorizing utility for selecting data from redux store.
      * **test.js**: you can add test here.
      * **index.js**: bootstraps routing, integrates global style and notifier(notistack).
   
   * **images**: folder contains favicon, app icon and logo.
   
   * **layouts**: it contains the base layout setup for the application for user, admin and public. Routes are looped here wrapped by a switch tag.
   
   * **utils**: utils folder contains the utilities used in the project. Extensively we use API.js to call APIs.