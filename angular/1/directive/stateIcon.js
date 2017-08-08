angular.module('klwkData').directive('ngState', function(){

    return {
        restrict: 'E',
        scope: {
            state: '='
        },
        link: function($scope, element, attrs){
            
        },
        template: ''
        + '<i class="iconfont icon-up" ng-if="state == \'up\' "></i>'
        + '<i class="iconfont icon-down" ng-if="state == \'down\' "></i>'
        + '<i class="iconfont icon-yuandian" ng-if="state == \'circle\' "></i>'
        + '<i class="iconfont icon-yuandian color-orange" ng-if="state == \'warn-circle\' "></i>'
    };
});