function filterText( filters, documentText ){
    this.filter = this.filterInput(filters);
    this.documentText = documentText;
    this.filteredText = this.parseText();
};

filterText.prototype.filterInput = function(input){
    return input.replace(/[\|\\&;\$%@<>\(\)\+\[\]{}]/g, "");
}

filterText.prototype.parseText = function(){
    var pattern = /"([^"]*)"|'([^']*)'|[^\s,]+/g,
        output = [],
        m;

    while ((m = pattern.exec(this.filter)) !== null)
    {
        output.push(m[1] || m[2] || m[0]);
    }
    
    return this.documentText.replace(new RegExp(output.join("|"), "g"), "XXXX");;
};

