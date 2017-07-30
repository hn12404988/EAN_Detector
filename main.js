document.getElementById("EAN").addEventListener('click', () => {
    //console.log("Popup DOM fully loaded and parsed");
    function getDOM(digit) {
        //You can play with your DOM here or check URL against your regex
		function recurseDomChildren(start, output){
			var nodes;
			if(start.childNodes){
				nodes = start.childNodes;
				loopNodeChildren(nodes, output);
			}
		}

		function loopNodeChildren(nodes, output){
			var node;
			for(var i=0;i<nodes.length;i++){
				node = nodes[i];
				if(output){
					outputNode(node);
				}
				if(node.childNodes){
					recurseDomChildren(node, output);
				}
			}
		}

		function outputNode(node){
			//var whitespace = /^\s+$/g;
			var res;
			if(node.nodeType === 1){
				res = check(node);
				if(res!==""){
					console.log(node);
					//console.log(res);
				}
			}
			/*
			else if(node.nodeType === 3){
				//clear whitespace text nodes
				node.data = node.data.replace(whitespace, "");
				if(node.data)
				{
					//console.log("text: " + node.data);
				}  
			}
			*/
		}
		/**
		 * @param {element} node - Node element.
		 * @member {string} str - String of this element's outerHTML without innerHTML.
		 * @return {string} - If regex check exist, return member str, else return empty string.
		 **/
		function check(node){
			var str,
				pattern = "\\D(\\d{"+digit+","+digit+"})\\D",
				regex = new RegExp(pattern,"g");
			if(node.children.length>0){
				str = node.outerHTML.slice(0, node.outerHTML.indexOf(node.innerHTML));
			}
			else{
				str = node.outerHTML;
			}
			if(str.search(regex)>0){
				return str;
			}
			else{
				return "";
			}
		}
		//console.log('Tab script:');
		console.clear();
		recurseDomChildren(document, true);
		/*
		  for(var ele in document.body.children){
		  console.log(ele);
		  }
		*/
		/*
		  var head = document.head.outerHTML,
		  body = document.body.outerHTML,
		  test = "3423423";
		  ean_regex = "/(\d{1,13})/g";
		  var result_head = head.match(ean_regex),
		  result_body = body.match(ean_regex),
		  result_test = test.match(ean_regex);
		  console.log(result_head);
		  console.log(result_body);
		  console.log(result_test);
		*/
        return document.body.innerHTML;
    }

    //We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
    chrome.tabs.executeScript({
        code: '(' + getDOM + ')('+document.getElementById("digitNr").value+');' //argument here is a string but function.toString() returns function's code
    }, (results) => {
        //Here we have just the innerHTML and not DOM structure
        console.log('Popup script:')
        console.log(results[0]);
    });
});
