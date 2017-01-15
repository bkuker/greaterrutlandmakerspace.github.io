document.addEventListener("DOMContentLoaded", function() {
	less.pageLoadFinished.then(function(){
		var dLayers = d3.select("#layers");
		var dSvg = d3.select("#diagram > svg");
		var svg = dSvg.node();
	
		svg.setAttribute("viewBox", boxToString(growBox(svg.getBBox(), 0.025)));
	
		dSvg.selectAll("g").filter(function() {
			return this.getAttribute("inkscape:groupmode") == "layer";
		}).each(function() {
			var layerG = this;
			var label = layerG.getAttribute("inkscape:label");
			if ( label == "Building" || label == "Walls" )
				return;
			
			var id = layerG.getAttribute("id");
			var li = dLayers.append("li");
			var checkbox = li.append("input").attr('type','checkbox').attr('id','layer-check-'+id);
			li.append("label").attr('for','layer-check-'+id).text(label);
			checkbox.on("change", function(d){
				console.log(checkbox.property("checked"));
				layerG.style.display = checkbox.property("checked")?'inline':'none';
				svg.setAttribute("viewBox", boxToString(growBox(svg.getBBox(), 0.025)));
			});
			checkbox.property("checked", layerG.style.display == "inline");
		});
	});
});

// Util stuff
function growBox(bb, frac) {
	var m = Math.min(frac * bb.width, frac * bb.height);
	return {
		x : (bb.x - m),
		y : (bb.y - m),
		width : (bb.width + 2 * m),
		height : (bb.height + 2 * m)
	};
}

function boxToString(bb) {
	return bb.x + " " + bb.y + " " + bb.width + " " + bb.height;
}