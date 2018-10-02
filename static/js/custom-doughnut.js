<script>
Chart.pluginService.register({
 beforeDraw: function (chart) {
   if (chart.config.options.elements.center) {
     //Get ctx from string
     var ctx = chart.chart.ctx;

     //Get options from the center object in options
     var centerConfig = chart.config.options.elements.center;
     var fontStyle = centerConfig.fontStyle || 'Arial';
     var txt = centerConfig.text;
     var color = centerConfig.color || '#000';
     var sidePadding = centerConfig.sidePadding || 100;
     var sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2)
     //Start with a base font of 30px
     ctx.font = "40px " + fontStyle;

     //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
     var stringWidth = ctx.measureText(txt).width;
     var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

     // Find out how much the font can grow in width.
     var widthRatio = elementWidth / stringWidth;
     var newFontSize = Math.floor(30 * widthRatio);
     var elementHeight = (chart.innerRadius * 2);

     // Pick a new font size so it will not be larger than the height of label.
     var fontSizeToUse = Math.min(newFontSize, elementHeight);

     //Set font settings to draw it correctly.
     ctx.textAlign = 'center';
     ctx.textBaseline = 'middle';
     var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
     var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
     ctx.font = fontSizeToUse+"px " + fontStyle;
     ctx.fillStyle = color;

     //Draw text in center
     ctx.fillText(txt, centerX, centerY);
   }
 }
});

  var config = {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [
          70,30
        ],
        backgroundColor: [
          "#F25900","#464343"
        ],
        borderColor: [
          "#F25900","#464343"
        ],
        label: 'Dataset 1'
      }],

    },
    options: {
      responsive: true,
      legend: {
        position: 'top',
      },
      elements: {
          center: {
          text: "0.8",
          color: '#F25900', //Default black
          fontStyle: 'Helvetica', //Default Arial
          sidePadding: 15 //Default 20 (as a percentage)
        }
      },
      cutoutPercentage : 80,
      animation: {
        animateScale: true,
        animateRotate: true
      }

    }
  };

  window.onload = function() {
    var i;
    var elems = document.getElementsByClassName('chart-area');
    for (i = 0;i < elems.length; i++){
      var ctx = elems[i].getContext('2d');
      window.myDoughnut = new Chart(ctx, config);
    }

  };





</script>
