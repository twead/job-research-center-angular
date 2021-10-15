// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyDazlMzA9lpIL9_BW_BEaq-NF6q2QFoNfA",
    authDomain: "jobresearchcenter-feb2b.firebaseapp.com",
    projectId: "jobresearchcenter-feb2b",
    storageBucket: "jobresearchcenter-feb2b.appspot.com",
    messagingSenderId: "97133417826",
    appId: "1:97133417826:web:d300ec0083638ba955483b",
    measurementId: "G-9SKML15MM3"
  },
  authURL: "http://localhost:8080/auth/",
  userURL: "http://localhost:8080/api/profile/",
  employerURL: "http://localhost:8080/employer/advertisement/",
  employeeURL: "http://localhost:8080/employee/advertisement/",
  dashboardURL: "http://localhost:8080/api/dashboard/",
  messageURL: "http://localhost:8080/message/",
  storageURL: "https://firebasestorage.googleapis.com/v0/b/jobresearchcenter-feb2b.appspot.com/o/",
  szakdolgozatEmail: "szakdolgozat.jobresearchcenter@gmail.com"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
