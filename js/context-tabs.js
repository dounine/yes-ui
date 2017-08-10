angular
    .module('BlankApp', ['ngMaterial'])
    .controller('AppCtrl', function ($scope, $timeout, $mdSidenav) {
        $scope.toggleLeft = buildToggler('left');
        $scope.toggleRight = buildToggler('right');

        function buildToggler(componentId) {
            return function () {
                $mdSidenav(componentId).toggle();
            };
        }
    }).controller('ContextTabsCtl', ContextTabsCtl);

function ContextTabsCtl ($scope, $log) {
    var tabs = [
            { title: 'One', content: "Tabs will become paginated if there isn't enough room for them."},
            { title: 'Two', content: "You can swipe left and right on a mobile device to change tabs."},
            { title: 'Three', content: "You can bind the selected tab via the selected attribute on the md-tabs element."}],
        selected = null,
        previous = null;
    $scope.tabs = tabs;
    $scope.selectedIndex = 2;
    $scope.$watch('selectedIndex', function(current, old){
        previous = selected;
        selected = tabs[current];
        if ( old + 1 && (old != current)) $log.debug('Goodbye ' + previous.title + '!');
        if ( current + 1 )                $log.debug('Hello ' + selected.title + '!');
    });
    $scope.addTab = function (title, view) {
        view = view || title + " Content View";
        tabs.push({ title: title, content: view, disabled: false});
    };
    $scope.removeTab = function (tab) {
        var index = tabs.indexOf(tab);
        tabs.splice(index, 1);
    };
}