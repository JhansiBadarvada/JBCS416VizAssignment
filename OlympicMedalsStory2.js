const width = 1000;
const height = 600;
const svg = d3.select('body').append('svg').attr('width', width).attr('height', height);
const g = svg.append('g');


var data1 = [{x: 50, y: 50, width:145, height:50, text1:'All', tx: 40, ty: 40, type5: 'Alltext'},
			 {x: 200, y: 50, width:145, height:50, text1:'Gold', tx: 110, ty: 40, type5: 'Goldtext'},
			 {x: 350, y: 50, width:145, height:50, text1:'Silver', tx: 180, ty: 40, type5: 'Silvertext'},
			 {x: 500, y: 50, width:145, height:50, text1:'Bronze', tx: 250, ty: 40, type5: 'Bronzetext'}];

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
				
				d3.select(this).style("fill", "#D3D3D3").style('stroke', 'black');
				(this.id != 'All') ? d3.select('#All').style("fill", "white").style('stroke', 'black'): console.log("All is not selected");
				(this.id != 'Gold') ? d3.select('#Gold').style("fill", "white").style('stroke', 'black'): console.log("All is not selected");
				(this.id != 'Silver') ? d3.select('#Silver').style("fill", "white").style('stroke', 'black'): console.log("All is not selected");
				(this.id != 'Bronze') ? d3.select('#Bronze').style("fill", "white").style('stroke', 'black'): console.log("All is not selected");
				return readData(2020,this.id);
			}
			)
			.on("mouseover", function(d) {
				
				//d3.select(this).style("fill", "grey").style('stroke', 'black');
				//return readData(2020,this.id);
			  })                  
			  .on("mouseout", function(d) {
				//d3.select(this).style("fill", "white").style('stroke', 'black');
			  });
	
	g.selectAll('text')
		.data(data1)
		.enter()
		.append('text')
		.attr('id', function(d){return d.type5 })
		.attr('x', function(d){return d.tx })
		.attr('y', function(d){return d.ty}) 
		.text(function(d){return d.text1})
		.attr('height', function(d){return d.height})
		.attr("text-anchor", "start")
		.style('stroke', 'grey')
		.style('fill', 'grey')
		.attr("transform", "scale(2)")
		.on("mouseover", function(d) {
				
			d3.select(this).style("fill", "black").style('stroke', 'black');
			//return readData(2020,this.id);
		  })                  
		  .on("mouseout", function(d) {
			d3.select(this).style("fill", "grey").style('stroke', 'grey');
		  })
		  .on("click", function(d,i) {  
			console.log("mouse click drawSlides text : " + this.id)
			
			switch (this.id) {
				case 'Alltext': 
					d3.select('#All').style("fill", "#D3D3D3").style('stroke', 'black');
					readData(2020,this.id);
					break;
				case 'Goldtext': 
					d3.select('#Gold').style("fill", "#D3D3D3").style('stroke', 'black');
					readData(2020,this.id);
					break;
				case 'Silvertext': 
					d3.select('#Silver').style("fill", "#D3D3D3").style('stroke', 'black');
					readData(2020,this.id);
					break;
				case 'Bronzetext': 
					d3.select('#Bronze').style("fill", "#D3D3D3").style('stroke', 'black');
					readData(2020,this.id);
					break;

			}
			(this.id != 'Alltext') ? d3.select('#All').style("fill", "white").style('stroke', 'black'): console.log("All is not selected");
			(this.id != 'Goldtext') ? d3.select('#Gold').style("fill", "white").style('stroke', 'black'): console.log("All is not selected");
			(this.id != 'Silvertext') ? d3.select('#Silver').style("fill", "white").style('stroke', 'black'): console.log("All is not selected");
			(this.id != 'Bronzetext') ? d3.select('#Bronze').style("fill", "white").style('stroke', 'black'): console.log("All is not selected");
			switch (this.id) {
				case 'Alltext': 
					d3.select('#All').style("fill", "#D3D3D3").style('stroke', 'black');
					return readData(2020,'All');
					break;
				case 'Goldtext': 
					d3.select('#Gold').style("fill", "#D3D3D3").style('stroke', 'black');
					return readData(2020,'Gold');
					break;
				case 'Silvertext': 
					d3.select('#Silver').style("fill", "#D3D3D3").style('stroke', 'black');
					return readData(2020,'Silver');
					break;
				case 'Bronzetext': 
					d3.select('#Bronze').style("fill", "#D3D3D3").style('stroke', 'black');
					return readData(2020,'Bronze');
					break;

			}
		}
		)
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

	// Define the div for the tooltip
	var div1 = d3.select("body").append("div")	
		.attr("class", "tooltip")				
		.style("opacity", 0);


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
				.on("mouseover", function(d) {	
					console.log("mouse over", this, "srcElement:", d.srcElement.__data__)
					div1.transition()		
						.duration(200)		
						.style("opacity", .9);		
					div1	.html("</br>" + "</br>" + "</br>"+"Country: " + d.srcElement.__data__.Country_Name + "</br>" + "Total Medals: " + d.srcElement.__data__.All 
										+ "</br>" + "Gold Medals: " + d.srcElement.__data__.Gold 
										+ "</br>" + "Silver Medals: " + d.srcElement.__data__.Silver 
										+ "</br>" + "Bronze Medals: " + d.srcElement.__data__.Bronze)	
						.style("left", d3.select(this).attr("x") + "px")		
						.style("top", d3.select(this).attr("y")  + "px")
						.style("color", 'blue');	
					})					
				.on("mouseout", function(d) {		
					div1.transition()		
						.duration(500)		
						.style("opacity", 0);	
				})
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
				.on("mouseover", function(d) {	
					console.log("mouse over", this, "srcElement:", d.srcElement.__data__.Gold)
					div1.transition()		
						.duration(200)		
						.style("opacity", .9);		
					div1	.html("</br>" + "</br>" + "</br>" + "</br>" + "</br>" + "</br>"+"Gold Medals: " + d.srcElement.__data__.Gold)	
						.style("left", d3.select(this).attr("x") + "px")		
						.style("top", (d3.select(this).attr("y"))  + "px")
						.style("color", 'gold');	
					})					
				.on("mouseout", function(d) {		
					div1.transition()		
						.duration(500)		
						.style("opacity", 0);	
				})
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
				.on("mouseover", function(d) {	
					console.log("mouse over", this, "srcElement:", d.srcElement.__data__.Silver)
					div1.transition()		
						.duration(200)		
						.style("opacity", .9);		
					div1	.html("</br>" + "</br>" + "</br>"+"</br>" + "</br>" + "</br>" + "Silver Medals: " + d.srcElement.__data__.Silver)	
						.style("left", d3.select(this).attr("x") + "px")		
						.style("top", (d3.select(this).attr("y"))  + "px")
						.style("color", 'silver');	
					})					
				.on("mouseout", function(d) {		
					div1.transition()		
						.duration(500)		
						.style("opacity", 0);	
				})
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
				.on("mouseover", function(d) {	
					console.log("mouse over", this, "srcElement:", d.srcElement.__data__.Bronze)
					div1.transition()		
						.duration(200)		
						.style("opacity", .9);		
					div1	.html("</br>" + "</br>" + "</br>"+"</br>" + "</br>" + "</br>" + "Bronze Medals: " + d.srcElement.__data__.Bronze)	
						.style("left", d3.select(this).attr("x") + "px")		
						.style("top", (d3.select(this).attr("y"))  + "px")
						.style("color", 'orange');	
					})					
				.on("mouseout", function(d) {		
					div1.transition()		
						.duration(500)		
						.style("opacity", 0);	
				})
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
