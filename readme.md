
# NAME #

slotbucket.js - a system for assigning content to locations in HTML according to a set of rules.

# DESCRIPTION #

It is called slotbucket because it is based on two key concepts:

1. The 'slot' into which content items are inserted.
2. The 'buckets' which contain unmatched items and slots.

Slotbucket is intended to meet the needs of complex responsive designs in which the location of elements may need to change according to available space, in ways which cannot be accomplished by CSS.

By defult, when items have been matched with slots, they will then be inserted into the slots and items left over will be hidden, however, this functionality is customisable, so slotbucket can also be used more generically as a way of pairing elements.

# SYNOPSIS #

	$.fn.slotbucket({
		'itemSet': <ITEM SET>,
		'slotSet': <SLOT SET>,
		'instructionSet': <SLOT INSTRUCTION SET>
		'callbacks': {
			'onAssign': function(<SLOT>, <ITEM>) { ... }
			'onComplete': <function(<SLOT MAPPING SET>, <ITEM BUCKET>, <SLOT BUCKET>){...}>
		}
	});
	
The `itemSet` and `slotSet` parameters define the elements which are candidates for matching. These go into separate buckets. Only elements listed here may be used in the `instructionSet`.

# TAXONOMY #

A SLOT is:

An element which contains no content.


A SLOT INSTRUCTION SET looks like this:

	[
		{
			'into':<SLOT SET>,
			'put':<ITEM SET>
			'onAssign': <function(<SLOT MAPPING>){...}>
		}
	]

A SLOT MAPPING looks like: 

	[ <SLOT>, <ITEM> ]

A SLOT MAPPING SET looks like this: 

	[ <SLOT MAPPING>, <SLOT MAPPING>, ... ]

A SLOT SET or ITEM SET is any of:

- a string, which will be evaluated as a jQuery Selector. 
- an array of DOM or jQuery elements
- a function which is evaluated (v1: nothing passed. v2: SLOT MACHINE passed) and returns an array of DOM or jQuery elements

When evaluated it will be a list of 0 or more nodes.

# HOW IT WORKS #
Rules for assigning items to slots:

- Each rule is considered in turn, and within each rule, each slot in a rule's SLOT LIST is considered in turn.
- Items already in the slot gain first priority (optional)
- Items are added in the order they are selected in the ITEM LIST 
- Irrespective of the rules above, items not in the bucket (whether because they are already assigned or never were in the bucket) must not be added.

# RESPONDBUCKET #

	$(document).ready(function(){
		$(window).resize(function(){$.fn.respondbucket({
			'slotConfig':{
				'slotSet': '#slot',
				'itemSet': '#mobileContent, #desktopContent',
			},
			'layoutRules': {
				'mobile':{
					'test': $.fn.respondbucket.widthrange(0, 1024),
					'slotConfig': {
						'instructionSet':[
							{'into':'#slot', 'put':'#mobileContent'},
						]
					}
				},
				'desktop':{
					'test': $.fn.respondbucket.widthrange(1025, null), // or simply 'test':1
					'slotConfig': {
						'instructionSet':[
							{'into':'#slot', 'put':'#desktopContent'},
						]
					}
				}
			}
		});
	}).resize();

respondbucket.js provides a convenient way of using slotbucket to accomplish responsive design.

# BUGS #

Please report bugs to dperrett@cambridge.org.

# AUTHOR #

Daniel Perrett

# LICENSE (BSD) #

Copyright 2011-2012 © Cambridge University Press. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met: 

- Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer. 
- Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
