/********************
 * Respondbucket.js *
 ********************/

(function( $ ){
	$.fn.respondbucket = function(options) {
		var settings = $.extend (true, {
			'slotConfig': {},
			'layoutRules': {}
		}, options);
		var currentLayout = $('body').attr('data-layout');
		var skipRest = false;
		$.each(settings.layoutRules, function(name, rule){
			if (name == null || skipRest == true){return null};
			if (rule.test()==true){
				$('body').addClass('layout-'+name); /* enable CSS1 support */
				if ((name != currentLayout) || currentLayout==null){
					$('body').removeClass('layout-'+currentLayout); /* enable CSS1 support */
					$('body').attr('data-layout', name);
					slotConfig = $.extend(1,settings.slotConfig, rule.slotConfig);
					$.fn.slotbucket(slotConfig);
				}
				skipRest=true;
			}
		});
	};
	$.fn.respondbucket.widthrange = function(min,max) {
		return function (){
			var w = $('body').width();
			return ((max==null || w <= max) && (min==null || w >= min));
		};
	};
})( jQuery );
