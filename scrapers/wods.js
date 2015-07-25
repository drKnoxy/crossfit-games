console.clear();

var data = [];
var wods = [];

// Get the names of the wods
$('#lbhead .workout-header').each(function(id, wod){
	var name = $(wod).text().trim();
	wods.push({name: name});
});

// And now get all the athletes and their performances
$('#lbtable tr').not('#lbhead').each(function(rowId, row){
    var $row = $(row);
    var athlete = {};

    // Gather their athlete data
    var athleteHref = $row.find('.name a').attr('href');
	var athleteId = athleteHref.match(/(\d+)/g)[0];
	athleteId = parseInt(athleteId, 10);
	var athleteName = $row.find('.name a').text().trim();

    // Apply their athlete data
    athlete.id = athleteId;
    athlete.name = athleteName;
    athlete.href = athleteHref;
    //athlete.total_points = 
    //athlete.rank = 
    

    // Now gather wod data
    athlete.wods = [];
    $row.find('.score-cell').each(function(eventId, cell){
        // defaults
        var thisWod = {
            points: 0,
            score: false,
            rank: 99
        };

        var $cell = $(cell);
        var cellText = $cell.text().trim();

        // wod not complete, exit
        if ( cellText == '--' ) {
            return false;
        }

        if ( cellText !== 'CUT' && cellText !== 'WD' ) {
			var rank = cellText.match(/^(\d+)/g)[0];
			thisWod.rank = parseInt(rank, 10);
        }

        var points = cellText.match(/(\d+) pts/g);

        // we have data, use it
        if( points !== null ) {
                            
            // Other score data
            thisWod.points = parseInt( points[0], 10 );
            var ptId = cellText.indexOf( thisWod.points );
            var ptLength = points[0].length;
            var ptOffset = ptId + ptLength;
            thisWod.score = cellText.slice( ptOffset ).trim();

            // Determine how this wod was scored, 
            // but only run this once per event
            if( rowId === 0 ) {
                var type;
                if( -1 !== thisWod.score.indexOf(':') ) {
                    type = 'for_time';
                } else if( -1 !== thisWod.score.indexOf('lb') ) {
                    type = 'for_weight';
                } else if ( -1 !== thisWod.score.indexOf('pt') ) {
                    type = 'for_points';
                }
                wods[eventId]['type'] = type;
            }
        }

        // Add that wod results to the athlete
        athlete.wods.push(thisWod);

    });

    // Record that data
    data.push(athlete);
});


// Hello
console.log('data:', data);
console.log('wods:', wods);
