1. **config.bak**:
   * **email.js**: will have email config where we can set email channel and their configuration, 
   * **key.js**: will have database connection string, It’s a secret key which is used for the protection of the password, It’s a social login configuration for Google and Facebook.

2. **helper**:
   * **apicall.helper.js**: to call the third party form WaftEngine we use the same function we use to expose API call helper.js folder
   * **email.helper.js**: to send the email we use the same function to we use to expose email helper.js
   * **photo.manipulate.js**: use to process the images(re-sizing)
   * **upload.helper.js**: use to upload the files
   * **validate.helper.js**: use to facilitate the work of API validate
   * **other.helper.js**: common function which is necessary for WaftEngine are their

3. **middleware:**
   * **auth.middleware.js**: use for the WaftEngine API authorization and authentication

4. **module:** Can know the module which is needed for WaftEngine. The structure of module folder(e.g.Content module).
   * **content.config.js**: module related configuration are here.(e.g. Success msg, validation msg, config key etc)
   * **content.controller.js**: have function of delete and loading complete
   * **content.schema.js**: defines the features of data structure necessary for content module
   * **content.validation.js**: response the content module related call data and make it valid date

5. **public:** files which were uploaded are kept here

6. **routes:**
   * **index.js**: all routes are register here
   * **api** (Folder): module related API are defined in module.js file name

7. **index.js**: it’s server entry point

8. **app.js**: app related function are emplement here

9. **package.json**

10. **pm2.json**: PM2 configuation to start server using PM2