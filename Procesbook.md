# Procesbook Eefje Roelfsema (10993673)

## Day 3
Today I made the page for the specific information and I added the same style to it as the
homepage (via bootstrap). I did this because it makes it look better. See picture below

![schermafbeelding 2019-01-09 om 16 12 54](https://user-images.githubusercontent.com/43995505/50908177-79baa300-1429-11e9-8d07-b13466b8cfcf.png)

I also divided my homepage in 2 columns, I decided to go for 2 columns because I can now
display the worldmap and the interactive chart set next to each other.

I formatted my csv data into a json file, via my converter (I adjusted the converter
I made in previous projects to fit on my current data).

Lastly I added the worldmap to my homepage (worldmap-page), and I puzzled a bit
such that now only Europe is displayed as I wanted. I added colours, but not the right ones.
Tomorrow I want to figure out which colours I'm going to use. I also added an interactive feature,
namely the tip.

![schermafbeelding 2019-01-09 om 16 12 45](https://user-images.githubusercontent.com/43995505/50908176-79baa300-1429-11e9-990d-02015c022907.png)


## Day 4
Today I added the multiple linechart (see picture).
Because I had a few bugs and I had to wait a long time before Tim came to help me, this
is the only thing I could make today.

![schermafbeelding 2019-01-10 om 15 11 17](https://user-images.githubusercontent.com/43995505/50974510-ab943e00-14eb-11e9-82be-56713cef5222.png)

Today I also added a legend to show which colour corresponds to which budget deficit precentage,
it is now below in my page. I want to put it next to my map, but I couldn't figure out today how
I could do that. I will work on that another day.

Improvents tomorrow: I want to add circles to the lines, where the points are displayed.
And with this an interactive feature that you can see the points (see picture for the circles).
I want to make a button where you can chose to display only 1 country, or a few countries at the same time. I also
want to make the axis for the linechart. Improvements for next week: I want to make a legend for my worldmap and I want to add figures to my specific info page per coutnry.

![schermafbeelding 2019-01-10 om 15 23 49](https://user-images.githubusercontent.com/43995505/50974591-e0a09080-14eb-11e9-8b51-0ea34a30313f.png)


## Day 5
Today I added the circles and made axis for the multiple linegraph (see picture).

![schermafbeelding 2019-01-11 om 15 19 03](https://user-images.githubusercontent.com/43995505/51039638-eb275c80-15b5-11e9-8550-7c5919af5e06.png)

I deleted the countries in my worldmap which are not in the Europian Union. And I coloured the countries
according to their budget deficit (see picture)

![schermafbeelding 2019-01-11 om 15 18 56](https://user-images.githubusercontent.com/43995505/51039636-ea8ec600-15b5-11e9-875b-d77ccff5c05d.png)

Next week I want to add the slider to the world map, such that you can slide over the years and the colours of the
world-map change (according to their budget deficit that year). I want to make the lines in the line graph the same
colour and if you touch the lines with the mouse, it gives you a different colour. Because it is really messy with all
these colours right now. This way you can see specifically how that line is going, without the mess.

Today I also decided what I want for my specific country information page: I want to make a pie chart, which shows which
percentage of the government spendings is spent to a specific sector. I want to add the government spendings also
to that page.

## Day 6 (monday 2nd week)
Kim gave me a tip in the meeting we had (on friday), that it might be more explaining if I showed where the money
in a certain year is spend to (specifically if there is a huge deficit). This information will
be on the specific information page in my website. I found on the website of the OECD
10 sectors where the government spends her money to and it is in percentages of the total spendings.

Today I formatted the data (csv) I found into a json file, and I made a barchart of the data.
After I made the histogram, I saw that the data was in percentages and that was not what I wanted.
I want to show the total amount of money spend to a sector instead of the percentages.
I can solve this because I also have data of the total amount of money spend by the government in each year,
so with this information and with the percentages I can calculate the total amound of money spend to a sector.
I will do this tomorrow, and add the information to the histogram (instead of the percentage information).
I want to display the percentage information in a piechart, I want to make a start with this wednesday.

In the picture below you can see the histogram I made with the percentage info.

![schermafbeelding 2019-01-15 om 10 45 19](https://user-images.githubusercontent.com/43995505/51172161-efec5900-18b2-11e9-97c3-7fee76cf885b.png)

## Day 7
Today I found the right data for in my histogram and I made a beginning with the piechart.
Something goes wrong in my piechart, but I don't know what, so I'm going to ask that tomorrow.

I added axis to my histogram, but it is not working good enough.
My margins are not working good correct.  I will ask that tomorrow as well. Picture of my histogram below:

![schermafbeelding 2019-01-15 om 15 31 12](https://user-images.githubusercontent.com/43995505/51186872-e7a81400-18da-11e9-9491-832bde49bc51.png)

I adjusted my linechart, so that it is not looking very messy anymore. All the lines are
grey and if you put your mouse on the lines, they will turn red, till you move your mouse
somewhere else. When your mouse is on the lines, the corresponding circles are not turning red
unfortunetly. Picture of my linechart below:

![schermafbeelding 2019-01-15 om 15 31 36](https://user-images.githubusercontent.com/43995505/51186851-d9f28e80-18da-11e9-8590-47341d7899fa.png)

Today my group came together as well, and we made an style guide.

## Day 8
Today I finished my piechart, it's not interactive yet but it works. See picture below.

![schermafbeelding 2019-01-16 om 15 21 41](https://user-images.githubusercontent.com/43995505/51255097-d7f40280-19a2-11e9-8791-0c0aad879777.png)

I want to make change the year of the specific country (which page you're on), that the piechart and the
barchart change together. I will work on that tomorrow.

I also added a slider to my EU-map, which updates it directly. Picture of my homepage below.

![schermafbeelding 2019-01-16 om 15 21 50](https://user-images.githubusercontent.com/43995505/51255134-e7734b80-19a2-11e9-9e5c-239a4ab18f6d.png)

Tomorrow I want to make my legend prettier, and in the svg of my map (not below the page as it is now).
I also want to make a start with the interactivity between the pages. I also want to make a button, that
you can choose of which countries you want to see their historical budget deficits.


## Day 9
Today I fixed the margins of my barchart, it looks good now.

![schermafbeelding 2019-01-17 om 15 51 19](https://user-images.githubusercontent.com/43995505/51327294-4c957280-1a71-11e9-9e07-e4a8e3161f66.png)

I added a button in my linechart, where you can choose the country of which you want to see the line.
The other lines dissapear and the chosen line appears.

![schermafbeelding 2019-01-17 om 15 51 11](https://user-images.githubusercontent.com/43995505/51327293-4c957280-1a71-11e9-93d3-b77a74240b5b.png)

Tommorow I want to make a slider, for my barchart and piechart and I want to let the html interact with
each other.

## Day 10
Today I made an interaction between my wordlmap and the specific information page, but it is not
as user friendly as I wanted it to be.
So I changed my plan: When you click on a country, a modal appears
with the spendings info (which was originally on the specific info page). I will make a start with this
next week.


## Day 11 (monday 3th week)
Today I managed to add an modal to my page. I you click on a country my barchart and piechart
visualizations appear (see picture below), I want to make them interactive with the worldmap tomorrow. Because today
I struggled with calling functions from other javascripts, and I couldn't find it on the internet.

![schermafbeelding 2019-01-22 om 14 35 29](https://user-images.githubusercontent.com/43995505/51539261-db303800-1e53-11e9-8a9d-64fdae1b5cd1.png)

I deleted the specific information page, because the modal took over that function.

Today I also updated my axis in my linechart (see picture). The axes move
to the lowest and highest percentage of the historical data of that country. I also deleted
the circles on the lines. When your mouse is on the line, that line becomes red, but I couldn't fix it to
get the corresponding circles red. That looked really ugly and therefore I deleted them.

![schermafbeelding 2019-01-22 om 14 35 39](https://user-images.githubusercontent.com/43995505/51539313-f4d17f80-1e53-11e9-9fc8-b83bcf104e08.png)


## Day 12
Today I made my histogram interactive, if you click on the country in the worldmap,
the modal appears and the histogram is updated to the year and country you click on!

Today I also worked on making my piechart interactive, but it is dificult due to the modal.

I added my legend in the svg of the EU-map, instead of below in the page. I did this earlier, but for
some unkonwn reasons it had disapeared again.

![schermafbeelding 2019-01-22 om 17 12 06](https://user-images.githubusercontent.com/43995505/51548568-e04bb200-1e68-11e9-8e70-2f550d015b90.png)

## Day 13
Today I changed the short names of the spending sectors to the full names, stated by the OECD. Because in the Barchart the
x-axis labels were overlapping, I rotated these axis labels. The hight of the svg is not high enough,
so I have to make that prettier. See picture below.

![schermafbeelding 2019-01-27 om 17 05 28](https://user-images.githubusercontent.com/43995505/51803874-2aaea380-225a-11e9-8317-66baf64371ce.png)

In my piechart I made a hoover, such that when you hover over the charts in the piecharts, they become bigger.
In the middle of the piechart I added the title Aut (Austria) and the year. I also added the
percentage of the sector you hoover over in the middle. See picture below.

![schermafbeelding 2019-01-27 om 17 05 48](https://user-images.githubusercontent.com/43995505/51803863-fe932280-2259-11e9-9e33-8270a2794d1a.png)

The piechart is not interactive yet, it is always the same. I want to make it interactive, that if you change the year/
cick on a country, the piechart in the modal is updated to that country. When my piechart is updated,
I will also work on changing the name and the year in the middle of the chart.

## Day 14
Hackaton

## Day 15
Today I updated my piechart, if you click on the country the piechart updates according to the year
in the slider.

## Day 16 (monday 4th week)
Today I made some small changes, that made my page better. First of all I fixed the x-axis in my barchart.
The labels are easier to read because I rotated them 40 degrees, and adjusted the marginbottom.

I changed the colors of my piechart. I added better titles to my data visualisations.
In the middle of the piechart I changed the country tickers to full names. I added the year below in smaller
letters. The year and country are also updated when the piechart is.If you hoover over the charts you can still see the sector and it's percentage.

I made the slider below the map
the same width and length. Now it looks like it belongs to each other.

In my script I added comments.

## Day 17
Today I made the final report.
