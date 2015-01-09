function textFilter( filters, documentText, filterSymbol ){

    this.filterSymbol = filterSymbol || "*****";
    this.documentText = documentText;
    this.filter = this.createFilters( filters );
    this.filteredText = this.parseText();
};

textFilter.prototype.filterInput = function( input ){

    return input.replace( /[\|\\&;\$%@<>\(\)\+\[\]{}]/g, "" );
}

textFilter.prototype.createFilters = function( input ){

    input = this.filterInput(input);
    var pattern = /"([^"]*)"|'([^']*)'|[^\s,]+/g,
        output = [],
        m;

    while ( ( m = pattern.exec( input ) ) !== null )
    {
        output.push( m[1] || m[2] || m[0] );
    }

    return output;
};

textFilter.prototype.parseText = function(){

    var pattern = new RegExp(this.filter.join("|"), "g");
    return this.documentText.replace( pattern, this.filterSymbol );
};

