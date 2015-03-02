System.config({
  "baseURL": "./",
  "paths": {
    "*": "*.js",
    "employee-scheduling-ui/*": "src/*.js",
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js"
  }
});

System.config({
  "map": {
    "angular": "github:angular/bower-angular@1.3.8",
    "angular-animate": "github:angular/bower-angular-animate@1.3.8",
    "angular-mocks": "github:angular/bower-angular-mocks@1.3.8",
    "angular-route": "github:angular/bower-angular-route@1.3.14",
    "angular-ui-router": "github:angular-ui/ui-router@0.2.11",
    "css": "github:systemjs/plugin-css@0.1.0",
    "font-awesome": "npm:font-awesome@4.2.0",
    "github:angular-ui/bootstrap-bower": "github:angular-ui/bootstrap-bower@0.12.0",
    "github:angular/bower-angular-messages": "github:angular/bower-angular-messages@1.3.8",
    "github:fyockm/bootstrap-css-only": "github:fyockm/bootstrap-css-only@3.3.0",
    "github:grevory/angular-local-storage": "github:grevory/angular-local-storage@0.0.5",
    "github:jeremypeters/ng-bs-animated-button": "github:jeremypeters/ng-bs-animated-button@2.0.3",
    "github:lodash/lodash": "github:lodash/lodash@2.4.1",
    "github:mgonto/restangular": "github:mgonto/restangular@1.4.0",
    "json": "github:systemjs/plugin-json@0.1.0",
    "text": "github:systemjs/plugin-text@0.0.2",
    "github:angular-ui/bootstrap-bower@0.12.0": {
      "angular": "github:angular/bower-angular@1.2.28"
    },
    "github:angular/bower-angular-animate@1.3.8": {
      "angular": "github:angular/bower-angular@1.3.8"
    },
    "github:angular/bower-angular-mocks@1.3.8": {
      "angular": "github:angular/bower-angular@1.3.8"
    },
    "github:angular/bower-angular-route@1.3.14": {
      "angular": "github:angular/bower-angular@1.3.8"
    }
  }
});

