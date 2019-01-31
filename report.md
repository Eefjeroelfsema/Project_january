# Final report Eefje Roelfsema (10993673)

## Description of data visualization

My website shows the budget deficit of the Europian Union to the user. On my homepage it is
shown via a EU-map (with colours and a tooltip), and via a historical line graph.
If you want more information on the spendings that led to the budget deficit you can click
on a country in the EU-map. A modal then appears which shows a piechart that shows
the percentage of the total spendings spend to a single sector. Also a barchart which
shows the percentage of the GDP that is spend to the different sectors.

## Technical design

For each of my data visualizations I made a new javascriptfile. There are four visualizations in my
website: a map, multiple linechart, piechart and a barchart. On my homepage the map and linechart visualization
are visible. The information on these visualizations are budget deficit related.
When you click on a country in the map, a modal appears with the spendings information. Here are the
piechart and the barchart function.

- map.js:
Code: In this file my Europian Map is made and updated. In the beginning the svg is made and the information
for the map is added. Then the map is drawed via the function map. Via
makeText is the year in the leftcorner added and updated. In this javascript there is also the code for the slider.
When the slider is moved the function updateMap is called, which changes the colour of the countries to
the colours according to the budget deficit that year. There is in the map also a tooltip.
The map function is also in contact with the barchart,
piechart and the modal. If you click on a country, the modal appears and the barchart and piechart are updated
with the country and year information, because these functions are called in the map javascript file.

Functionality: The map first drawn is of the year 1995, all the countries are coloured
by their budget deficit that year. There is a slider below the map, where you can change the
year and update the map according to that year. In the legend, added next to the map
it is clear which colour correspondends with which budget deficit percentage. You can also hover with
your mouse over the countries, then a tooltip appears which shows you the name of the country and the budget deficit
in the year you're slider is.

- linechart.js
Code: In this file I make and update the linechart. First is the svg made for the linechart. In a
dictionary I put the values of every country in a list. Then the function countryline is called.
In this function I make one line for the country it is called for. Therefore I call this function
23 times, for each country in my dataset. So in the beginning a multiple linechart is made with 23 lines.
The function axis makes the axis. If you hover over a line in the linegraph, the line turns red
and the function fullnameCountry is called to display the fullname of the country in the righttop.
If the button is pushed in the top for a specific country, all the lines are removed and
only the line of that one country is drawed (calling the countryline function once with that info).
The yscale is updated via with the data and then the axis are updated as well. If you click on the
all countries option, all the lines are drawed again as in the beginning.

Funcionality: In this visualization I show the historical budget deficits of the countries.
The first linechart drawn is with all the countries together. Via a button next to the title you can
select a certain country and only the line of that country is drawed. The axis move together with
the range of the country values. It is also possible to draw all the lines together again.

- piechart.js
Code: The piechart is shown in the modal, when clicked on a country. Therefore the main function piechart is a
global function (pieChartFunction), which can be called from in the map.js. Before anything is called, the svg,
the width height and radius are determined above. The piechart.js file calls itself in the beginning,
to make the fist piechart. The piechart function calls the firstPiechart function.
When a country is clicked on in the map, the mapjavascript calls the piechartFunction,
which calls the updatepiechartfunction. The pieChartFunction contains
the new country and year, and with that information the piechart is updated. The function arcTween
makes sure the update goes smoothly.

Functionality: In this visualization it is shown which percentage of the total spendings is spent to
a specific sector. The visualization appears when the user clicks on a country in the worldmap.
According to the year and the country the user selects, the piechart is made with that information.
In the middle of the piechart the year and country are shown, when you hover over the charts, the
percentage and the sector are shown.

- barchart.js
Code: The barchart is also shown in the modal, when clicked on a country. Therefore the main function barchart is also a
global function (barChartFunction), which can be called from in the map.js. The barchart.js file calls itself in the beginning,
to make the fist barchart. The barchart function calls the firstBarchart and the makeAxis function. The makeText
function adds the total percentage of GDP spend information in the top of the histogram.
When a country is clicked on in the map, the mapjavascript calls the barChartFunction,
which calls the updateBarchart fucntion. The barChartFunction contains
the new country and year, and with that information the barchart is updated. The function makeText
is called as well, which updates the total spendingsinformation on top. The makeAxis function is not called again,
because the axis are for every update the same, so they can stay the same. 

Functionality: In this visualization it is shown which percentage of the GDP of that country that year is
spent to a specific sector. The visualizatoin appears next to the piechart when the user clicks on a country in the worldmap.
According to the year and the country the user selects, the barchart is made with that information.

## Choices made

- Slider:
In my design document I had stated that I wanted an interactive element, but I hadn't decided what it was gonna be yet.
I chose to add an slider (instead of a button to chose the year), because it is easy to use and it
is easier to see the changes over the years (by the changing colours). I'm satisfied with this choice.

- Button to choose countries in the linechart
In my design document I added 2 pictures of multiple linecharts. The first 1 where all the country lines
are a bit messy (not easy to see how each line goes). The second where you can select a line with your mouse
and it becomes clear how it goes. I also added this to my multiple linechart, in the first homepage all the lines
are drawn and when you select a line with the mouse it becomes red, and it is easier to see which path it is following.
But it was unclear which country you select the line of. Therefore I added a button where you can select a single country,
and see only that historical line. The axis are moving with the new range of that line. This way it is easier to see the
path of a single country.  

- Styling of lines (multiple linechart)
Making the linechart I first decided that I wanted every country to get it's own linecolor. I did
implemented this, but it was really ugly and messy. It also did not made the linechart more readibly, that's
why I chose to make all the lines grey, and when you hover over them red. This way it is possible to see how a line goes,
but I don't use the colors. Above I also stated that it is possible to see how a line is going on it's own, by using the
button. When I made the linechart I also wanted to add circles where the datapoints where. I added this to my
linechart. I changed the color of all the lines to grey and I did the same to the circles. But when you hover over
the lines they became red, and the corresponding circles stayed grey. Because I couldn't fix this, and I really did not
like it. I removed the circles.

- Modal
In my proposal and design document I wanted to make a specific html-page, where you can click on an country
in the worldmap and it displays extra information. I implemented this, but it wasn't user friendly. Because everytime
you clicked on a country you were sent to a new page, that was irritating. Therefore I found a solution: the modal.
In the modal I show my extra information, this pops up in stead of directing to a different page, and it is easy to click away.

- Specific information
As said in 'modal' above, I made a modal to display the extra information. In my design document I wasn't clear
which extra information I wanted to display. I chose to add government spendings to this. Because, governments become
a budget deficit by spending more than they recevie. So looking at the spendings you get a better insight in how the deficit
became what it is. I displayed the spendings in 2 ways: the percentage of the total spendings to each sector (piechart) and the
percentage of the GDP spent to a sector (barchart). At first I thought that the percentage of the GDP was a number
in millions, but I found out later that it was what it is. Maybe showing these 2 visualisations of spendings
is a bit double, but after I found out that the barchart data was in percentages in stead of millions I didn't want to
remove it. I have thought of calculating the millions myself by multiplying the percentage of GDP by the GDP. But I couldn't
find accurate data about the GDP, every site said something different. Therefore I did not do that.

- Colours
The purpose of these visualizations was to show the user if the countries of the EU follow the EU rules. The rule
is that the budget deficit, must not come lower than 3%. So lower than 3% means that a country is not doing it good,
I gave that a red color (lightred - red, how bad it's going). If the budget deficit is between -3% and 0%,
a country is following the rules of the EU, but their still spending more money than that they receive, therefore
I gave that the colour orange (orange (-3%) - light orange (0%)). When a country has a positive budget deficit, it means that
they spend less money than they receive and their holding on to the rules of the EU. I gave these countries
a green colour.  
The colours in my piechart are just so you see the difference between sectors, the color of the sectors in the barchart
are the same as the colour in the piechart.
