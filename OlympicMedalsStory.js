const width = 500;
const height = 500;

const svg = d3.select('body').append('svg').attr('width', width).attr('height', height);

const g = svg.append('g');

var data1 = [{x: 50, y: 50, width:145, height:50, text:'Gold', tx: 40, ty: 40},
			 {x: 200, y: 50, width:145, height:50, text:'Silver', tx: 110, ty: 40},
			 {x: 350, y: 50, width:145, height:50, text:'Bronze', tx: 180, ty: 40}];


g.selectAll('rect')
	.data(data1)
	.enter()
	.append('rect')
	.attr('x', function(d){return d.x })
	.attr('y', function(d){return d.y}) 
	.attr('width', function(d){return d.width})
	.attr('height', function(d){return d.height})
	.style('stroke', 'black')
	.style('fill', 'white')
	
g.selectAll('text')
	.data(data1)
	.enter()
	.append('text')
	.attr('x', function(d){return d.tx })
	.attr('y', function(d){return d.ty}) 
	.text(function(d){return d.text})
	.attr('height', function(d){return d.height})
	.attr("text-anchor", "start")
	.style('stroke', 'black')
	.style('fill', 'black')
	.attr("transform", "scale(2)")


/* 	
const gold = g.append('rect')
  .attr('x', 50)
  .attr('y', 50)
  .attr('width', 145)
  .attr('height', 50)
  .style('stroke', 'black')
  .style('fill', 'white')
  

  
g.append('text')
	.attr('x', 40)
	.attr('y', 40)
	.attr("text-anchor", "start")
	.style('stroke', 'black')
	.style('fill', 'black')
	.attr("transform", "scale(2)")
	.text('Gold');
  
g.append('rect')
  .attr('x', 200)
  .attr('y', 50)
  .attr('width', 145)
  .attr('height', 50)
  .style('stroke', 'black')
  .style('fill', 'white')

g.append('text')
	.attr('x', 110)
	.attr('y', 40)
	.style('stroke', 'black')
	.style('fill', 'black')
	.attr("transform", "scale(2)")
	.text('Silver');
  
g.append('rect')
  .attr('x', 350)
  .attr('y', 50)
  .attr('width', 145)
  .attr('height', 50)
  .style('stroke', 'black')
  .style('fill', 'white')

g.append('text')
	.attr('x', 180)
	.attr('y', 40)
	.style('stroke', 'black')
	.style('fill', 'black')
	.attr("transform", "scale(2)")
	.text('Bronze');
	

			
*/