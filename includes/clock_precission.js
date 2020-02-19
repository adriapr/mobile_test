function arrayMax(array) {
  return array.reduce(function(a, b) {
    return Math.max(a, b);
  });
}

function arrayMin(array) {
  return array.reduce(function(a, b) {
    return Math.min(a, b);
  });
}

function std(values){
  var avg = average(values);
  
  var squareDiffs = values.map(function(value){
    var diff = value - avg;
    var sqrDiff = diff * diff;
    return sqrDiff;
  });
  
  var avgSquareDiff = average(squareDiffs);

  var stdDev = Math.sqrt(avgSquareDiff);
  return stdDev;
}

function average(data){
  var sum = data.reduce(function(sum, value){
    return sum + value;
  }, 0);

  var avg = sum / data.length;
  return avg;
}


function assess_clock_performance() {

  var time_deltas = [];
  var old = -1; 
  var t; var delta;

  var startTime = window.performance.now();
  while (( window.performance.now() - startTime) < 100) {
    var t = window.performance.now();
    // var t = Date.now();

    if (old > 0 && t > old) {
      delta = t - old
        time_deltas.push( delta ); 
    }
      old = t; 
  }

  var delta_sum = time_deltas.reduce(function(sum, value){
    return sum + value;
  }, 0);  


  var data = {}
  data.mean = average(time_deltas)
  data.std = std(time_deltas)
  data.min = arrayMin(time_deltas)
  data.max = arrayMax(time_deltas)
  data.sum = delta_sum
  data.length = time_deltas.length

  data.string = 'Clock delta precission // mean: ' + data.mean.toFixed(2) +
                                ' // std: ' + data.std.toFixed(2) + 
                                ' // range: [' + data.min.toFixed(2) + ', ' + data.max.toFixed(2) + ']'
                                ' // sum: ' + delta_sum.toFixed(1) + 
                                ' // length: ' + data.length

  // data.deltas = time_deltas # in edge, you get 20k deltas in 100ms, so do not store them

  // console.log( time_deltas )
  // console.log('mean: ' + average(time_deltas) + ' std: ' + std(time_deltas)); 

    // document.getElementById("clock_precission").innerHTML = 'Clock delta precission // mean: ' + data.mean.toFixed(2) +
    //                            ' // std: ' + data.std.toFixed(2) + 
    //                            ' // range: [' + data.min.toFixed(2) + ', ' + data.max.toFixed(2) + ']'
    //                            ' // sum: ' + delta_sum.toFixed(1) + 
    //                            ' // length: ' + data.length + 
    //                            '<br>'

  return data
}