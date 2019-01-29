# Final report Eefje Roelfsema (10993673)

## Description of data visualization

My website shows the budget deficit of the Europian Union to the user. On my homepage it is
shown via a EU-map (with colours and a tooltip), and via a historical line graph.
If you want more information on the spendings that led to the budget deficit you can click
on a country in the EU-map. A modal then appears which shows a piechart that shows
the percentage of the total spendings spend to a single sector. Also a barchart which
shows the percentage of the GDP that is spend to the different sectors.

## Technical design

In my website there are 4 data visualizations.
- Map of the EU: the map first drawn is of the year 1995, all the countries are coloured
by their budget deficit that year. There is a slider below the map, where you can change the
year and update the map according to that year. In the legend, added next to the map
it is clear which colour correspondends with which budget deficit percentage.

- Multiple linechart: in this visualization I show the historical budget deficits of the countries.
The first linechart drawn is with all the countries together. Via a button next to the title you can
select a certain country and only the line of that country is drawed. The axis move together with
the range of the country values. It is also possible to draw all the lines together again.

- Piechart: in this visualization it is shown which percentage of the total spendings is spent to
a specific sector. The visualizatoin appears when the user clicks on a country in the worldmap.
According to the year and the country the user selects, the piechart is made with that information.
In the middle of the piechart the year and country are shown, when you hover over the charts, the
percentage and the sector are shown.

- Barchart: in this visualization it is shown which percentage of the GDP of that country that year is
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
why I chose to make all the lines grey, and when you hoover over them red. This way it is possible to see how a line goes,
but I don't use the colors. Above I also stated that it is possible to see how a line is going on it's own, by using the
button. When I made the linechart I also wanted to add circles where the datapoints where. I added this to my
linechart. I changed the color of all the lines to grey and I did the same to the circles. But when you hoover over
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
