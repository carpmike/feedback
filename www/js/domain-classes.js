'use strict';

function findInList(list, id) {
    var it = null,
        l = list.length,
        i;
    for (i = 0; i < l; i = i + 1) {
        if (list[i].id == id) {
            it = list[i];
            break;
        }
    }
    return it;
}

angular.module('myApp.domainClasses', [])
    .factory('people', ['$log', 'person', function ($log, person) {
        function People() {
            this.people = person.query();
        }

        People.prototype.findById = function (id) {
            return findInList(this.people, id);;
        };

        return new People();
    }])
    .factory('categories', ['$log', 'category', function ($log, category) {
        function Categories() {
            this.categories = category.query();
        }

        Categories.prototype.findById = function (id) {
            return findInList(this.categories, id);;
        };

        return new Categories();
    }]);

