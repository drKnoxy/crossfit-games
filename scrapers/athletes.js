var athletes = [];
$('#lbtable .name a').each(function(i,el){
	var href = $(el).attr('href');
	var id = href.match(/(\d+)/g)[0];
	id = parseInt(id, 10);
	var name = $(el).text().trim();

	athletes.push({name: name, href: href, id: id});
});

console.clear();
console.log( JSON.stringify(athletes) );
