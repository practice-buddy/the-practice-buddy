/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map:any = {
  'ng2-dragula': 'vendor/ng2-dragula',
  'dragula': 'vendor/dragula',
  'lodash': 'vendor/lodash',
};

/** User packages configuration. */
const packages:any = {
  'ng2-dragula': {'main': 'ng2-dragula.js'},
  'dragula': {'main': 'dist/dragula.js'},
  'lodash': {'main': 'lodash.js'}
};

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels:string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',

  // Thirdparty barrels.
  'rxjs',

  // App specific barrels.
  'app',
  'app/shared',
  'app/model',
  'app/services',
  'app/+execute',
  'app/+manage',
  'app/+manage/detail',
  'app/+manage/exercise-focus',
  'app/+manage/create-new-exercise',
  'app/+login',
  'app/+manage/library-list',
  'app/+execute/focus-list',
  'app/+execute/execute-exercise',
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
