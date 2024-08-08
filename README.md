# UI5 Web Components examples using OData V4 service

This project contains Vue and React examples using the new UI5 Web Components 2.0 Table (next to UI5 samples), using a "real" CAP based OData V4 service. The React examples use React 19rc which supports custom components directly.

File or Folder | Purpose
---------|----------
`app/` | folder for UI frontends 
`app/reactworkouts` | React 19 app showing a custom UI5 web compontent (Timer) and the UI5 Web Component Table using OData V4 service and showing eventing between table and custom web copmonent. 
`app/reactexercises` | React 19 app with UI5 Web Component Table showing the list of 637 exercises using the growing capabilities of the table. 
`app/reactworkouts/dist` | built version of the app above. 
`app/reactexercises/dist` | built version of the app above. 
`app/vueexercises` | Vue app with UI5 Web Component Table showing the list of 637 exercises. 
`app/fsworkouts` | UI5 freestyle app showing workouts with exercises. 
`app/lrworkouts` | Fiori Elements List Report showing workouts with exercises. 
`db/` | data files with workout and exercises data
`srv/` | OData service for Workouts and Exercises
`package.json` | project metadata and configuration


## Run the examples

- Install the SAP CDS Development kit with `npm i -g @sap/cds-dk`
- Open a new terminal in the main workoutODataV4 folder, run `npm install` and then `cds watch`
- (in VS Code simply choose _**Terminal** > Run Task > cds watch_)
- open [http://localhost:4004/](http://localhost:4004/)
- the Vue, UI5 and Fiori elements apps, and the built versions (.../dist) of the React apps can be opened directly.
- to test and debug the dev versions of the React apps, go to the application folder (/reactexercises or /reactworkouts) and run `np run dev` (in addition to `cds watch` in the workouts folder) which will serve the UIs at port 5173 (while the OData service is served at port 4004)


## Learn More

Learn more at https://sap.github.io/ui5-webcomponents/ 
