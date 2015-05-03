angular.module('story.services', [])

.factory('Story', function() {

  var info = [{
    
    allstories: {class:"allstories", text:"All Stories"},
    nearby: {class:"nearby", text:"Nearby"},
    drafts: {class:"drafts", text:"Drafts"},
    


  }];


  return {
    all: function() {
      return info;
    }
  };
});