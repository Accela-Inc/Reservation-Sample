'use strict';

/* Animation */
(function(){
	var siteResAnimations = angular.module('siteReservationAnimations', ['ngAnimate']);
	
	siteResAnimations.animation('.site', function() {
	
	  var animateUp = function(element, className, done) {
	    if(className != 'active') {
	      return;
	    }
	    element.css({
	      position: 'absolute',
	      top: 500,
	      left: 0,
	      display: 'block'
	    });
	
	    jQuery(element).animate({
	      top: 0
	    }, done);
	
	    return function(cancel) {
	      if(cancel) {
	        element.stop();
	      }
	    };
	  }
	
	  var animateDown = function(element, className, done) {
	    if(className != 'active') {
	      return;
	    }
	    element.css({
	      position: 'absolute',
	      left: 0,
	      top: 0
	    });
	
	    jQuery(element).animate({
	      top: -500
	    }, done);
	
	    return function(cancel) {
	      if(cancel) {
	        element.stop();
	      }
	    };
	  }
	
	  var animateFadeIn = function(element, className, done) {
	    if(className != 'active') {
	      return;
	    }
	    element.css({
	      
	    });
	
	    jQuery(element).fadeIn('slow').attr('aria-hidden', 'false');
	
	    return function(cancel) {
	      if(cancel) {
	        element.stop();
	      }
	    };
	  }
	
	  var animateFadeOut = function(element, className, done) {
	    if(className != 'active') {
	      return;
	    }
	
	    jQuery(element).fadeOut().attr('aria-hidden', 'true');
	
	    return function(cancel) {
	      if(cancel) {
	        element.stop();
	      }
	    };
	  }
	
	  return {
	    addClass: animateUp,
	    removeClass: animateDown
	  };
	});
}());