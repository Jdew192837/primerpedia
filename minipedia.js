// Add firstChild property to Javascript's Object prototype
// https://gist.github.com/4240760
// alternative: http://stackoverflow.com/a/2769741/266309
Object.defineProperty( Object.prototype, 'firstChild', {
    get: function () {
        return this[Object.keys(this)[0]];
    }
});

function onFormSubmit(){
	// API request to load non-random page:
	// http://en.wikipedia.org/w/api.php?action=parse&page=Concise_Wikipedia&section=0&prop=text&format=txtfm&disablepp
    $.ajax({
		// first section of a random article. API query devised by http://stackoverflow.com/q/13517901/266309
		url: 'http://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&rvparse=&rvsection=0&generator=random&grnnamespace=0&format=json',
		data: {
		    format: 'json'
		},
		dataType: 'jsonp',
		success: function(jsonObject) {
			article = jsonObject.query.pages.firstChild;
			url = "http://en.wikipedia.org/wiki/" + encodeURIComponent(article.title);
			link = "<a href='" + url + "'>" + article.title + "</a>";
			$("#content").html("<h2>" + link + "</h2>");
			$("#content").append( article.revisions[0].firstChild );
		}
	});
}
