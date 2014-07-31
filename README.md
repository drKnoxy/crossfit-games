crossfit-games
==============

The CrossFit Games (tm) don't put out an API for their data
so I thought I'd build a scraper in js to pull data from their [leader board page](http://games.crossfit.com/scores/leaderboard.php).

The leader board is in an iFrame on their homepage with the following query parameters, so I'm sure they do something, I just haven't spent the time to figure out what.

```
stage=5
sort=0
division=101
region=0
numberperpage=60
page=0
competition=2
frontpage=0
expanded=0
full=1
year=14
showtoggles=0
hidedropdowns=0
showathleteac=1
athletename=
```
