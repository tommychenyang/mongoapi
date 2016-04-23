angular.module('templates-main', ['partial/GundamBlock.tpl.html']);

angular.module("partial/GundamBlock.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partial/GundamBlock.tpl.html",
    "<div class=\"gundamblock\">\n" +
    "    <h3>{{name}}</h3>\n" +
    "    <p style=\"color: #202020;\">{{year}}</p>\n" +
    "\n" +
    "</div>");
}]);
