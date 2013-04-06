///<reference path="../def/angular.d.ts"/>
///<reference path="../def/jquery.d.ts"/>

interface IDroppedItem {
  url: string;
  files: any[];
}

// prevents drops from changing the page
angular.module('app')
.directive('dragignore', function($parse:ng.IParseService) {
  return function(scope:ng.IScope, element:JQuery, attrs) {
    var target = document

    target.addEventListener("dragover", function(e) {
      e.preventDefault()
      return false
    })

    target.addEventListener("drop", function(e) {
      e.preventDefault()
      return false
    })
  }
})

// drop="onDrop" will call scope.onDrop(IDroppedItem)
.directive('drop', function($parse:ng.IParseService) {
  return function(scope:ng.IScope, element:JQuery, attrs) {

    var target = element.get(0)
    //var onDrop = $parse(attrs.dragupload)
    var onDrop:(item:IDroppedItem)=>void = scope[attrs.drop]
    if (!onDrop) throw new Error("Could not find drop function: " + attrs.drop)

    //function shouldAccept(e) {
      //return (e.dataTransfer.files && e.dataTransfer.files.length && e.dataTransfer.files[0].type.match("text/plain"))
    //}

    target.addEventListener("dragenter", function(e) {
      element.addClass("drag")
    })

    target.addEventListener("dragleave", function(e) {
      element.removeClass("drag")
    })

    target.addEventListener("dragover", function(e) {
      e.stopPropagation()
      e.preventDefault()
      //var ok = e.dataTransfer && e.dataTransfer.types && e.dataTransfer.types.indexOf('Files') >= 0
      return false
    })

    target.addEventListener("drop", function(e) {
      // dropped! Check out e.dataTransfer
      e.stopPropagation()
      e.preventDefault()
      element.removeClass("drag")
      
      var url = e.dataTransfer.getData("url") || e.dataTransfer.getData("text/uri-list")
      var files = Array.prototype.slice.call(e.dataTransfer.files, 0)
      var item:IDroppedItem = {
        url: url,
        files: files,
      }

      scope.$apply(function() {
        onDrop(item)
      })
    })
  }
})


