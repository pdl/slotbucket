/* 
# test_slotbucket.js
*/

test( "Check QUnit is working ok", function() {
	equal( 2+2, 4, "equal: 2+4=4" );
	deepEqual( [{}], [{}], "deepEqual: [{}] = [{}]" );
});

test( "Check we have jQuery and a test canvas", function() {
	ok( $('#testcanvas'), "$('#testcanvas') returns true" );
});
test( "Check we can set up a scope", function() {
	setup_scope();
	equal( $('#scope').length,1, "$('#scope') returns one element after setup_scope()" );
	equal( $('#scope>li').length,4, "$('#scope>li') returns four elements after setup_scope()" );
	for (var i=1;i<5;i++){
		equal( $('#scope>li>span#item'+i).length,1, "$('#scope>li>span#item"+i+"') returns one element" );
	}
	equal( $('#scope .odd').length,2, "$('#scope .odd') returns two elements after setup_scope()" );
	equal( $('#scope .even').length,2, "$('#scope .even') returns two elements after setup_scope()" );
	clear_canvas();
	equal( $('#scope').length,0, "$('#scope') returns no elements after clear_canvas()" );
});


test( "Slotbucket forceArray works", function() {
	setup_scope();
	var oddSlots = [document.getElementById('slot1'), document.getElementById('slot3')]
	deepEqual( $.fn.slotbucket.forceArray(oddSlots),oddSlots, "Arrays pass through forceArray" );
	deepEqual( $.fn.slotbucket.forceArray('#slot1, #slot3'),oddSlots, "forceArray evaluates strings as jQuery expressions" );
	deepEqual( $.fn.slotbucket.forceArray(function(){return oddSlots;}),oddSlots, "forceArray evaluates strings as jQuery expressions" );
});

test( "Slotbucket can reorder by ID", function() {
	setup_scope();
	$.fn.slotbucket({
		'slotSet': '#scope>li',
		'itemSet': '#scope>li>span',
		'instructionSet':[
			{'into':'#slot1', 'put':'#item4'},
			{'into':'#slot2', 'put':'#item3'},
			{'into':'#slot3', 'put':'#item2'},
			{'into':'#slot4', 'put':'#item1'}
		]
	});
	equal( $('#slot1 #item4').length,1, "#slot1 contains #item4" );
	equal( $('#slot1 #item1').length,0, "... and not #item1" );
	equal( $('#slot2 #item3').length,1, "#slot2 contains #item3" );
	equal( $('#slot2 #item2').length,0, "... and not #item2" );
	equal( $('#slot3 #item2').length,1, "#slot3 contains #item2" );
	equal( $('#slot3 #item3').length,0, "... and not #item3" );
	equal( $('#slot4 #item1').length,1, "#slot4 contains #item1" );
	equal( $('#slot4 #item4').length,0, "... and not #item4" );
});

test( "Slotbucket can reorder by ID without making changes", function() {
	setup_scope();
	$.fn.slotbucket({
		'slotSet': '#scope>li',
		'itemSet': '#scope>li>span',
		'instructionSet':[
			{'into':'#slot1', 'put':'#item1'},
			{'into':'#slot2', 'put':'#item2'},
			{'into':'#slot3', 'put':'#item3'},
			{'into':'#slot4', 'put':'#item4'}
		]
	});
	equal( $('#slot1 #item1').length,1, "#slot1 contains #item1" );
	equal( $('#slot2 #item2').length,1, "#slot2 contains #item2" );
	equal( $('#slot3 #item3').length,1, "#slot3 contains #item3" );
	equal( $('#slot4 #item4').length,1, "#slot4 contains #item4" );
});


test( "Slotbucket can work with groups of slots by class", function() {
	setup_scope();
	$.fn.slotbucket({
		'slotSet': '#scope>li',
		'itemSet': '#scope>li>span',
		'instructionSet':[
			{'into':'.odd', 'put':'#item4'},
		]
	});
	equal( $('#slot1 #item1').length,1, "#slot1 contains #item4" );
	equal( $('#slot3 #item1').length,0, "#slot3 does not contain #item4" );
	equal( $('#slot4 #item1').length,0, "#slot4 does not contain #item4" );
});
test( "Slotbucket can work with groups of slots by id", function() {
	setup_scope();
	$.fn.slotbucket({
		'slotSet': '#scope>li',
		'itemSet': '#scope>li>span',
		'instructionSet':[
			{'into':'#slot2, #slot3, #slot4', 'put':'#item1'},
		]
	});
	equal( $('#slot1 #item1').length,0, "#slot1 does not contain #item1" );
	equal( $('#slot2 #item1').length,1, "#slot2 contains #item1" );
	equal( $('#slot3 #item1').length,0, "#slot3 does not contain #item1" );
	equal( $('#slot4 #item1').length,0, "#slot4 does not contain #item1" );
});

test( "Slotbucket can work with groups of items by class", function() {
	setup_scope();
	$.fn.slotbucket({
		'slotSet': '#scope>li',
		'itemSet': '#scope>li>span',
		'instructionSet':[
			{'into':'#slot1', 'put':'.odd span'},
			{'into':'#slot2', 'put':'.odd span'},
			{'into':'#slot3', 'put':'.even span'},
			{'into':'#slot4', 'put':'.even span'}
		]
	});
	equal( $('#slot1 #item1').length,1, "#slot1 contains #item1" );
	equal( $('#slot1 #item3').length,0, "... and not #item3" );
	equal( $('#slot2 #item3').length,1, "#slot2 contains #item3" );
	equal( $('#slot2 #item1').length,0, "... and not #item1" );
	equal( $('#slot3 #item2').length,1, "#slot3 contains #item2" );
	equal( $('#slot3 #item4').length,0, "... and not #item4" );
	equal( $('#slot4 #item4').length,1, "#slot4 contains #item4" );
	equal( $('#slot4 #item2').length,0, "... and not #item2" );
});

test( "Slotbucket can work with item sets and slot sets", function() {
	setup_scope();
	$.fn.slotbucket({
		'slotSet': '#scope>li',
		'itemSet': '#scope>li>span',
		'instructionSet':[
			{'into':'#slot1, #slot2', 'put':'#item1, #item3'},
			{'into':'#slot3, #slot4', 'put':'#item2, #item4'},
		]
	});
	equal( $('#slot1 #item1').length,1, "#slot1 contains #item1" );
	equal( $('#slot1 #item3').length,0, "... and not #item3" );
	equal( $('#slot2 #item3').length,1, "#slot2 contains #item3" );
	equal( $('#slot2 #item1').length,0, "... and not #item1" );
	equal( $('#slot3 #item2').length,1, "#slot3 contains #item2" );
	equal( $('#slot3 #item4').length,0, "... and not #item4" );
	equal( $('#slot4 #item4').length,1, "#slot4 contains #item4" );
	equal( $('#slot4 #item2').length,0, "... and not #item2" );
});


test( "Slotbucket can set onAssign callback", function() {
	setup_scope();
	$.fn.slotbucket({
		'slotSet': '#scope>li',
		'itemSet': '#scope>li>span',
		'instructionSet':[
			{'into':'#slot1', 'put':'#item4'},
			{'into':'#slot2', 'put':'#item3'},
			{'into':'#slot3', 'put':'#item2'},
			{'into':'#slot4', 'put':'#item1'}
		],
		'callbacks':{
			'onAssign': function(slot, item){
				$(slot).attr('title',$(item).text());
				$(item).attr('title',$(item).text());
			}
		}
	});
	equal( $('#slot1').attr('title'),4, "#slot1 has title 4" );
	equal( $('#slot2').attr('title'),3, "#slot2 has title 3" );
	equal( $('#slot3').attr('title'),2, "#slot3 has title 4" );
	equal( $('#slot4').attr('title'),1, "#slot4 has title 1" );
	equal( $('#item1').attr('title'),1, "#item1 has title 1" );
	equal( $('#item2').attr('title'),2, "#item2 has title 2" );
	equal( $('#item3').attr('title'),3, "#item3 has title 3" );
	equal( $('#item4').attr('title'),4, "#item4 has title 4" );
});


function clear_canvas() {
	$('#testcanvas').empty();
}

function setup_scope() {
	clear_canvas();
	$('#testcanvas').append('<ul id="scope"><li'
		+' id="slot1" class="odd"><span  '
		+' id="item1"                    '
		+'        >1</span></li>         '
		+' <li                           '
		+' id="slot2" class="even"><span '
		+' id="item2"                    '
		+'        >2</span></li>         '
		+' <li                           '
		+' id="slot3" class="odd"><span  '
		+' id="item3"                    '
		+'        >3</span></li>         '
		+' <li                           '
		+' id="slot4" class="even"><span '
		+' id="item4"                    '
		+'        >4</span></li></ul>');
}
