// This is the variable that we'll pump all of the data into
var wods = [];

// Get the names of the wods
$('#lbhead .workout-header').each(function(id, wod){
	var name = $(wod).text().trim();
	wods.push({name: name, scores: []});
});

// Get the scores for the wods
$('#lbtable tr').not('#lbhead').each(function(rowId, row){
	var $row = $(row);
    
    // Get the athlete's id
	var href = $row.find('.name a').attr('href');
	var athleteId = href.match(/(\d+)/g)[0];
	athleteId = parseInt( athleteId, 10 );

	$row.find('.score-cell').each(function(eventId, cell){
		var $cell = $(cell);

		var scoreData = {};
// 		scoreData.raw = $cell.html().trim();
		scoreData.athleteId = athleteId;

		var cellText = $cell.text().trim();
//         scoreData.cellText = cellText;

		if ( cellText !== 'CUT' && cellText !== 'WD' ) {
			var rank = cellText.match(/^(\d+)/g)[0];
            scoreData.rank = parseInt(rank, 10);
            
            // Get their points
			var points = cellText.match(/(\d+) pts/g);
            
            if( points !== null ) {
                
                
                // Other score data
                scoreData.points = parseInt( points[0], 10 );
                var ptId = cellText.indexOf( scoreData.points );
                var ptLength = points[0].length;
                var ptOffset = ptId + ptLength;
                scoreData.score = cellText.slice( ptOffset ).trim();
                
                // Determine how this wod was scored, 
                // but only run this once per event
                if( rowId === 0 ) {
                    var type;
                    if( -1 !== scoreData.score.indexOf(':') ) {
                        type = 'for_time';
                    } else if( -1 !== scoreData.score.indexOf('lb') ) {
                        type = 'for_weight';
                    } else if ( -1 !== scoreData.score.indexOf('pt') ) {
                        type = 'for_points';
                    }
                    wods[eventId]['type'] = type;
                }
                
            } else {
                scoreData.points = 0;
                scoreData.score = false;
            }
        }

		wods[eventId]['scores'].push( scoreData );
	});

});
console.clear();
console.log(JSON.stringify(wods));
