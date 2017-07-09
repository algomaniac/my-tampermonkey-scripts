// ==UserScript==
// @name         JDA Jira DoD Script
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Load Jira Template for DoD & Acceptance Criteria
// @author       Tapan Chandra
// @match        https://jira.jda.com/browse/*
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @require      https://code.jquery.com/jquery-3.2.1.slim.min.js
// ==/UserScript==

/* jshint ignore:start */
var inline_src = (<><![CDATA[
/* jshint ignore:end */
    /* jshint esnext: false */
    /* jshint esversion: 6 */

    function updateDom() {
		if (!$('#spl-btn').length) {
			$('<ul/>', {
				id: 'spl-btn',
				class: 'ops view-layout-buttons toolbar-group'
			}).html(
				$('<li/>', {
					class:'toolbar'
				}).html($('<a/>',{
					class:'first button toolbar-trigger',
					href:'#',
					text:'Load DoD Template'
				}))).appendTo("#descriptionmodule_heading").click(function(){
				$('#description-val span').click();
				var original_text = $('#description').val();
				var template = `Add a description line here

*Acceptance Criteria*

* Criteria 1
    ** Criteria 1 - Subtask
* Criteria 2

*Definition of Done*

/ - (/), x - (x)
|| DoD Item || Owner || Signoff || Justification Notes ||
| Product owner approved the story |  | (x) | |
| Technical Architect approves the design |  | (x) | |
| All code is committed on the team branch |  | (x) | |
| All code has been peer reviewed |  | (x) | |
| Satisfies all acceptance criteria |  | (x) | |
| No unresolved subtasks including pre-merge bugs |  | (x) | |
| Test plan is reviewed and documented (provide the link) |  | (x) | |
| Unit/Manual testing is performed / tester signoff is provided |  | (x) | |
| FA/Product Owner signoff provided | |  (x) | |
| Story isn't regressing other tests \\ E.g. Passes CI validations |  | (x) | |
| Release Notes is documented | |  (x) | |
`;

				if(original_text) {
					$('#description').val(original_text + '\n\n\n' + template);
				} else {
					$('#description').val(template);
				}
				//Submit
				$('#description-form .save-options button[type="submit"]').click();
			});
		}
	}
	window.updateDom = updateDom();

	MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

	var observer = new MutationObserver(function(mutations, observer) {
	    mutations.forEach(function(mutation) {
	        if (mutation.attributeName === "class") {
	            var attributeValue = $(mutation.target).prop(mutation.attributeName);
	            if(attributeValue.indexOf('inactive') != -1) {
	    	        console.log('updating dom');
	    	        updateDom();
	            }
	        }
	    });
	});

	// define what element should be observed by the observer
	// and what types of mutations trigger the callback
	observer.observe(document, {
	    subtree: true,
		attributes: true 
	});

/* jshint ignore:start */
]]></>).toString();
var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
eval(c.code);
/* jshint ignore:end */




//$("#descriptionmodule_heading").append('<ul id="spl-btn" class="ops view-layout-buttons toolbar-group"><li class="toolbar-item"><a class="first button toolbar-trigger" href="#">Load DoD Template</a></li></ul>');