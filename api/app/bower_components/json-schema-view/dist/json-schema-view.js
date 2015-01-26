/*!
 * json-schema-view
 * https://github.com/mohsen1/json-schema-view
 * Version: 0.3.8 - 2014-10-21T20:17:10.821Z
 * License: MIT
 */


'use strict';

var module = angular.module('mohsen1.json-schema-view', ['RecursionHelper']);

module.directive('jsonSchemaView', function (RecursionHelper) {
  function link($scope) {
    $scope.isCollapsed = $scope.open < 1;

    // Determine if a schema is an array
    $scope.isArray = $scope.schema && $scope.schema.type === 'array';

    // Determine if a schema is a primitive
    $scope.isPrimitive = $scope.schema &&
      !$scope.schema.properties &&
      !$scope.schema.items &&
      $scope.schema.type !== 'array' &&
      $scope.schema.type !== 'object';

    /*
     * Toggles the 'collapsed' state
    */
    $scope.toggle = function() {
      $scope.isCollapsed = !$scope.isCollapsed;
    };

    /*
     * Returns true if property is required in given schema
    */
    $scope.isRequired = function(schema) {
      var parent = $scope.$parent.schema;

      if (parent && Array.isArray(parent.required) && schema.name) {
        return parent.required.indexOf(schema.name) > -1;
      }

      return false;
    };

    /*
     * Returns true if the schema is too simple to be collapsible
    */
    $scope.isPrimitiveCollapsible = function() {
      return $scope.schema.description ||
        $scope.schema.title;
    };
  }

  return {
    restrict: 'E',
    templateUrl: 'json-schema-view.html',
    replcae: true,
    scope: {
      'schema': '=',
      'open': '='
    },
    compile: function(element) {

      // Use the compile function from the RecursionHelper,
      // And return the linking function(s) which it returns
      return RecursionHelper.compile(element, link);
    }
  };
});

'use strict';

// from http://stackoverflow.com/a/18609594
angular.module('RecursionHelper', []).factory('RecursionHelper', ['$compile', function($compile){
  return {
    /**
     * Manually compiles the element, fixing the recursion loop.
     * @param element
     * @param [link] A post-link function, or an object with function(s)
     * registered via pre and post properties.
     * @returns An object containing the linking functions.
     */
    compile: function(element, link){
      // Normalize the link parameter
      if(angular.isFunction(link)){
        link = { post: link };
      }

      // Break the recursion loop by removing the contents
      var contents = element.contents().remove();
      var compiledContents;
      return {
        pre: (link && link.pre) ? link.pre : null,
        /**
         * Compiles and re-adds the contents
         */
        post: function(scope, element){
          // Compile the contents
          if(!compiledContents){
            compiledContents = $compile(contents);
          }
          // Re-add the compiled contents to the element
          compiledContents(scope, function(clone){
            element.append(clone);
          });

          // Call the post-linking function, if any
          if(link && link.post){
            link.post.apply(null, arguments);
          }
        }
      };
    }
  };
}]);

angular.module("mohsen1.json-schema-view").run(["$templateCache", function($templateCache) {$templateCache.put("json-schema-view.html","<div class=\"json-schema-view\" ng-class=\"{collapsed: isCollapsed}\"><div class=\"primitive\" ng-if=\"isPrimitive\"><a class=\"title\" ng-click=\"toggle()\"><span class=\"toggler\" ng-if=\"isPrimitiveCollapsible()\"></span>{{schema.title}}</a> <span class=\"type\">{{schema.type}}</span> <span class=\"required\" ng-if=\"isRequired(schema)\">*</span> <span class=\"format\" ng-if=\"!isCollapsed && schema.format\">({{schema.format}})</span> <span class=\"range minimum\" ng-if=\"!isCollapsed && schema.minimum\">minimum:{{schema.minimum}}</span> <span class=\"range maximum\" ng-if=\"!isCollapsed && schema.maximum\">maximum:{{schema.maximum}}</span><div class=\"description\">{{schema.description}}</div></div><div ng-if=\"isArray\" class=\"array\"><a class=\"title\" ng-click=\"toggle()\"><span class=\"toggler\"></span>{{schema.title}} <span class=\"opening bracket\">[</span><span class=\"closing bracket\" ng-if=\"isCollapsed\">]</span></a><div class=\"inner\"><div class=\"description\">{{schema.description}}</div><json-schema-view ng-if=\"!isCollapsed\" schema=\"schema.items\" open=\"open - 1\"></json-schema-view></div><span class=\"closing bracket\" ng-if=\"!isCollapsed\">]</span></div><div ng-if=\"!isPrimitive && !isArray\" class=\"object\"><a class=\"title\" ng-click=\"toggle()\"><span class=\"toggler\"></span>{{schema.title}} <span class=\"opening brace\">{</span><span class=\"closing brace\" ng-if=\"isCollapsed\">}</span></a><div class=\"inner\"><div class=\"description\">{{schema.description}}</div><div class=\"property\" ng-repeat=\"(propertyName, property) in schema.properties\"><span class=\"name\">{{propertyName}}:</span><json-schema-view schema=\"property\" open=\"open - 1\"></json-schema-view></div></div><span class=\"closeing brace\" ng-if=\"!isCollapsed\">}</span></div></div>");}]);