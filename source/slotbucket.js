/*****************
 * slotbucket.js *
 *****************/

(function( $ ){


$.fn.slotbucket = function( options ) {  
	
	settings = $.extend( true, {
		'itemSet': [],
		'slotSet': [],
		'instructionSet': [],
		'callbacks': {
			'onAssign': function(slot, item){},
			'onComplete': function(slotMappingSet, itemBucket, slotBucket){
				
				$.each(slotMappingSet, function (index, slotMapping){
					$(slotMapping[0]).append($(slotMapping[1]).show());
				});
				$.each(itemBucket,function (index, item){
					$(item).hide();
				});
			}
		}
	}, options);
	
	settings.slotMappingSet = [];
	settings.itemBucket = $.fn.slotbucket.forceArray(settings.itemSet); // Copy the items into the itemBucket
	settings.slotBucket = $.fn.slotbucket.forceArray(settings.slotSet); // Copy the items into the slotBucket
	$.each(settings.instructionSet, function(index, instruction){
		slotSet = $.fn.slotbucket.forceArray(instruction.into);
		itemSet = $.fn.slotbucket.forceArray(instruction.put);
		// todo: filter put by itemSet and slotSet
		$.each(slotSet, function (index, slot){
			var item;
			var itemNumberInBucket;
			for (
				item = itemSet.shift(); 
				(itemNumberInBucket = $.inArray(item, settings.itemBucket) )==-1 && itemSet.length; // continuance condition
				item = itemSet.shift()){
				// nothing required here
			}
			var slotNumberInBucket = $.inArray(slot, settings.slotBucket);
			if (itemNumberInBucket > -1 && slotNumberInBucket > -1){
				settings.callbacks.onAssign(slot, item); // Run the onAssign callback
				settings.slotMappingSet.push([slot, item]); // Add the mapping to the slotMappingSet
				settings.itemBucket.splice(itemNumberInBucket, 1); // remove the item from the itemBucket
				settings.slotBucket.splice(slotNumberInBucket, 1); // remove the slot from the slotBucket
			}
			
		});
	});

	settings.callbacks.onComplete(settings.slotMappingSet, settings.itemBucket, settings.slotBucket);
	
	return this;

};
$.fn.slotbucket.forceArray = function(selector){ // creates an array copy of the array, or evaluates the jQuery selector/function
	if (typeof selector == 'string'){
		return $(selector).toArray();
	}
	if (typeof selector == 'function'){
		return selector();
	}
	if (typeof selector == 'object'){
		return selector.slice(0);
	}
};  
})( jQuery );
