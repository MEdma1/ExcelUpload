(function() { 
	
	
	let template = document.createElement("template");
	
	
	template.innerHTML = `
	
	<head> 
        <title>Title of the document</title>
        <script src="https://unpkg.com/read-excel-file@4.x/bundle/read-excel-file.min.js"></script>
    </head> 
    
    
    <body> 
        <input type="file" id="input"> 
        <table id="tbl-data"></table> 

        <script> 
            var input = document.getElementById('input'); 
            input.addEventListener('change', function() { 
                readXlsxFile(input.files[0]).then(function(data) { 

                    var i=0; 
                    
                    
                    console.log(["ArrayData", data]);
                    console.log(["FileInfo", input.files[i]]);


                    data.map((row, index)=> { 
                        
                        if(i==0) { 
                            let table = document.getElementById('tbl-data'); 
                            generateTableHead(table, row); 
                        }

                        if(i>0) {
                            let table = document.getElementById('tbl-data'); 
                            generateTableRows(table, row); 
                        }

                        console.log(["index", i]);

                        i++;
                    }); 
                }); 
            });


            function generateTableHead(table, data) { 
                let thead = table.createTHead(); 
                let row = thead.insertRow(); 
                for(let key of data) { 
                    let th = document.createElement('th'); 
                    let text = document.createTextNode(key); 
                    th.appendChild(text); 
                    row.appendChild(th); 
                }
            }

            function generateTableRows(table, data) { 
                let newRow = table.insertRow(-1); 
                data.map((row, index)=> { 
                    let newCell = newRow.insertCell(); 
                    let newText = document.createTextNode(row); 
                    newCell.appendChild(newText); 
                });
            } 
        </script> 
    </body>
	
	
	`;




	class Excel extends HTMLElement {
		constructor() {
			super(); 
			let shadowRoot = this.attachShadow({mode: "open"});
			shadowRoot.appendChild(template.content.cloneNode(true));
			
			
		}
		
		
		
		
		connectedCallback() {
			console.log(["connectedCallback"])
		}
		
		disconnectedCallback() {
			console.log(["disconnectedCallback"])
		}
		
		onCustomWidgetBeforeUpdate(changedProperties) {
			console.log(["onCustomWidgetBeforeUpdate"])
		}

		onCustomWidgetAfterUpdate(changedProperties) {
			console.log(["onCustomWidgetAfterUpdate"])
		}
		
		
		
		
		
	}
	
	customElements.define("com-sac-excel", Excel);
})();
