const width = 1200;
const height = 900;
const svg = d3.select('body').append('svg').attr('width', width).attr('height', height);
const g = svg.append('g');

var data1 = [{x: 50, y: 50, width:145, height:50, text1:'All', tx: 40, ty: 40, type5: 'All'},
			 {x: 200, y: 50, width:145, height:50, text1:'Gold', tx: 110, ty: 40, type5: 'Gold'},
			 {x: 350, y: 50, width:145, height:50, text1:'Silver', tx: 180, ty: 40, type5: 'Silver'},
			 {x: 500, y: 50, width:145, height:50, text1:'Bronze', tx: 250, ty: 40, type5: 'Bronze'}];

drawSlides() 
readData(2020, "All")


function drawSlides() { 

	console.log(data1)
	g.selectAll('rect')
		.data(data1)
		.enter()
		.append('rect')
		.attr('id', function(d){return d.text1 })
		.attr('x', function(d){return d.x })
		.attr('y', function(d){return d.y}) 
		.attr('width', function(d){return d.width})
		.attr('height', function(d){
								return d.height;
							})
		.style('stroke', 'black')
		.style('fill', 'white')
		.on("click", function(d,i) {  
				console.log("mouse click drawSlides : " + this.id)
				return readData(2020,this.id);
			}
			);
	
	g.selectAll('text')
		.data(data1)
		.enter()
		.append('text')
		.attr('x', function(d){return d.tx })
		.attr('y', function(d){return d.ty}) 
		.text(function(d){return d.text1})
		.attr('height', function(d){return d.height})
		.attr("text-anchor", "start")
		.style('stroke', 'black')
		.style('fill', 'black')
		.attr("transform", "scale(2)")
}


async function readData(yr, type) { 
	const meds = await d3.csv("data/Summer_olympic_Medals.csv")
	//console.log("Async Read 2020 data function", meds.filter(meds=>meds.Year == 2020 && meds.All != 0))
	medalsYr = meds.filter(meds=>meds.Year == "2020")
	console.log("medalsYr", medalsYr)
	console.log("readData- type", type)
	console.log("readData- year", yr)
	drawChartAll(medalsYr, type)
	}

function drawChartAll(medalsYr, type) {
	
	console.log("medalsYrDrawChart", medalsYr)
	console.log("type = ", type);
	
	switch (type) { 
		case "All" :
			wMax = d3.extent(medalsYr, function(d) {return  parseInt(d.All)})
			break;
		case "Gold" :
			wMax = d3.extent(medalsYr, function(d) {return  parseInt(d.Gold)})
			break;
		case "Silver" :
			wMax = d3.extent(medalsYr, function(d) {return  parseInt(d.Silver)})
			break;
		case "Bronze" :
			wMax = d3.extent(medalsYr, function(d) {return  parseInt(d.Bronze)})
			break;

	}

	console.log("medalsYr.All", wMax)
	countries =  [...new Set(medalsYr.map(({Country_Name})=>Country_Name))]
	console.log("countries = ", countries.sort());

	var tooltip = d3.select("#tooltip");
	

	var ys=d3.scaleLinear()
		.domain(wMax)
		.range([350, 0])
		.interpolate(d3.interpolateRound);
		

	var xs=d3.scaleBand()
				.domain(countries.sort())
				.range([0, width])
    			.paddingInner([.2]);
	band = xs.bandwidth();

	d3.selectAll('#allbars').remove()

	switch (type) { 
		case "All" :
		  g.selectAll('rect')
				.data(medalsYr)
				.enter()
				.append('rect')
				.attr('id','allbars')
				.attr('x', function(d){return xs(d.Country_Name)})
				.attr('y', function(d){return 100 + ys(0)}) 
				.attr('width', function(d){return band})
				.attr('height', 0)
				.style('stroke', 'black')
				.style('fill', 'blue')
				.attr("transform", "translate(50,50)")
				.transition()
					.duration(650)
					.attr('y', function(d){return 100 + ys(parseInt(d.All))})
					.attr('height', function(d){return 350-ys(parseInt(d.All)) })
				;
			break;
		case "Gold" :
			g.selectAll('rect')
				.data(medalsYr)
				.enter()
				.append('rect')
				.attr('id','allbars')
				.attr('x', function(d){return xs(d.Country_Name)})
				.attr('y', function(d){return 100 + ys(0)}) 
				.attr('width', function(d){return band})
				.attr('height', function(d){return 0})
				.style('stroke', 'black')
				.style('fill', 'gold')
				.attr("transform", "translate(50,50)")
				.transition()
					.duration(850)
					.attr('y', function(d){return 100 + ys(parseInt(d.Gold))})
					.attr('height', function(d){return 350-ys(parseInt(d.Gold)) });
				break;
		case "Silver" :
			g.selectAll('rect')
				.data(medalsYr)
				.enter()
				.append('rect')
				.attr('id','allbars')
				.attr('x', function(d){return xs(d.Country_Name)})
				.attr('y', function(d){return 100 + ys(0)}) 
				.attr('width', function(d){return band})
				.attr('height', function(d){return 0 })
				.style('stroke', 'black')
				.style('fill', 'grey')
				.attr("transform", "translate(50,50)")
				.transition()
					.duration(650)
					.attr('y', function(d){return 100 + ys(parseInt(d.Silver))})
					.attr('height', function(d){return 350-ys(parseInt(d.Silver)) });
			break;
		case "Bronze" :
			g.selectAll('rect')
				.data(medalsYr)
				.enter()
				.append('rect')
				.attr('id','allbars')
				.attr('x', function(d){return xs(d.Country_Name)})
				.attr('y', function(d){return 100 + ys(0)}) 
				.attr('width', function(d){return band})
				.attr('height', function(d){return 0 })
				.style('stroke', 'black')
				.style('fill', 'orange')
				.attr("transform", "translate(50,50)")
				.transition()
					.duration(650)
					.attr('y', function(d){return 100 + ys(parseInt(d.Bronze))})
					.attr('height', function(d){return 350-ys(parseInt(d.Bronze)) });
			break;
	}


	d3.select('#yaxis').remove()
	yaxis = d3.axisLeft(ys).tickValues(null)

	d3.select("svg")
		.append("g")
		.attr('id', 'yaxis')
		.attr("transform", "translate(50,150)")
		.call(yaxis)
	
   
   d3.select("svg")
		.append("g")
		.attr("transform", "translate(50,500)")
		.call(d3.axisBottom(xs))
		.selectAll("text")
    		.attr("y", 0)
    		.attr("x", 9)
    		.attr("dy", ".35em")
    		.attr("transform", "rotate(90)")
    		.style("text-anchor", "start");
   
}
