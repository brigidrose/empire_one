angular.module('signonSlider.services', [])

.factory('Slides', function() {

  var images = [{
    bridge: {class:"bridge", img:"img/login/signon1/brooklyn_bridge.png"},
    rectangle84:{ class:"rectangle84", img:"img/login/common/Rectangle84.png"},
    dots1: {class:"dots", img:"img/login/signon1/PageControllerBlack.png"},
    lumalogo: {class:"lumalogo", img:"img/login/signon1/Fill2.png"},
    lumaText: {class:"lumatext", text:"LUMA"},
    legacyText: {class:"legacytext", text:"LEGACY"},
    screen1text1: {class:"screen1 text1", text:"Keep your life's most precious"},
    screen1text2: {class:"screen1 text2", text:"moments in a place close to your heart"},
    rectangle1: {class:"rectangle1", img:"img/login/common/Rectangle1.png",text:"I have a necklace"},
    rectangle2: {class:"rectangle2", img:"img/login/common/Rectangle1.png",text:"I want one!"},

    capture: {class:"topHeading capture", text:"CAPTURE"},
    dots2: {class:"dots", img:"img/login/signon2/PageControllerBlack.png"},
    screen2text1: {class:"screen2 text1", text:"Luma will gather photos taken"},
    screen2text2: {class:"screen2 text2", text:"around that location, allowing you"},
    screen2text3: {class:"screen2 text3", text:"to create a story faster"},

    story: {class:"topHeading story", text:"YOUR STORY"},
    dots3: {class:"dots", img:"img/login/signon3/PageControllerBlack.png"},
    screen3text1: {class:"screen3 text1", text:"Enrich the moments you capture"},
    screen3text2: {class:"screen3 text2", text:"to create a story"},

    unlock: {class:"topHeading unlock", text:"UNLOCK"},
    dots4: {class:"dots", img:"img/login/signon4/PageControllerBlack.png"},
    screen4text1: {class:"screen4 text1", text:"You can set some of your stories to"},
    screen4text2: {class:"screen4 text2", text:"unlock on a special date or location"},



    signin1: {class:"signin1", img:"img/login/Sign-In1.png"},
    signin2: {class:"signin2", img:"img/login/Sign-In2.png"},
    signin3: {class:"signin3", img:"img/login/Sign-In3.png"},
    signin4: {class:"signin4", img:"img/login/Sign-In4.png"},

  }];


  return {
    all: function() {
      return images;
    }
  };
});