
function createpieChart(keysofcategory, vofcategory, ctx) {
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: keysofcategory,
      datasets: [{
        label: 'Total Amount',
        data: vofcategory,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
function createhorizontalBarChart(keysofcategory, vofcategory, ctx) {
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: keysofcategory.slice(0,5),
            datasets: [{
                data: vofcategory.slice(0,5),
                fill: false,
                backgroundColor: [
  'rgba(255, 99, 132)',
  'rgba(255, 159, 64)',
  '#FFCD56',   
  'rgba(75, 192, 192)',   
  'rgba(153, 102, 255)',  
],
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            indexAxis: 'y',
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            responsive: true,
            aspectRatio: 1.1
            
        }
    });
}
function createlineChart(keysofdate, vofdate, ctx) {
     new Chart(ctx, {
        type: 'line',
        data: {
            labels: keysofdate,
            datasets: [{
                data: vofdate,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            plugins:{
                colors:{
                    enabled: true,
                    forceOverride: true
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
function createweeklyBarChart(data, ctx) {
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            datasets: [{
                data: Object.values(expensesbyweekday),
                fill: false,
                backgroundColor: [
  'rgba(54, 162, 235)',   // blue (cool, calm)
  'rgba(75, 192, 192)',   // teal
  'rgba(153, 102, 255)',  // purple
  'rgba(201, 203, 207)',  // gray (neutral break)
  '#FFCD56',              // yellow
  'rgba(255, 159, 64)',   // orange
  'rgba(255, 99, 132)'    // red (warm, attention)
],
                 
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
           
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
function reduceByCategory(data){
    const sortedByCategory = data.reduce((acc, expense) => {
    const lower = expense.category.toLowerCase();
    const cleanCategory = lower.charAt(0).toUpperCase() + lower.slice(1);
    if (!acc[cleanCategory]) {
        acc[cleanCategory] = 0;
    }
    
    acc[cleanCategory] += parseFloat(expense.amount);
    return acc;
}, {});
    keysofcategory = Object.keys(sortedByCategory);
    vofcategory = Object.values(sortedByCategory);
    for (let i = 0; i < keysofcategory.length - 1; i++) {
        for (let j = i + 1; j < keysofcategory.length; j++) {
            if (vofcategory[i] < vofcategory[j]) {
                
                let tempKeyy = keysofcategory[i];
                keysofcategory[i] = keysofcategory[j];
                keysofcategory[j] = tempKeyy;
                
                let tempValuee = vofcategory[i];
                vofcategory[i] = vofcategory[j];
                vofcategory[j] = tempValuee;
            }
        }
    }
    return keysofcategory, vofcategory;
}
function reduceByDate(data){
    const sortedByDate = data.reduce((acc, expense) => {
            if (!acc[expense.date]) {
                acc[expense.date] = 0;
            }
            acc[expense.date] += parseFloat(expense.amount);
            return acc;
        }, {});
        console.log("date",sortedByDate);
        keysofdate = Object.keys(sortedByDate);
console.log(keysofdate);
vofdate = Object.values(sortedByDate);
console.log(vofdate);
for (let i = 0; i < keysofdate.length - 1; i++) {
    for (let j = i + 1; j < keysofdate.length; j++) {
        if (keysofdate[i] > keysofdate[j]) {
            
            let tempKey = keysofdate[i];
            keysofdate[i] = keysofdate[j];
            keysofdate[j] = tempKey;
           
            let tempValue = vofdate[i];
            vofdate[i] = vofdate[j];
            vofdate[j] = tempValue;
        }
    }
}
return keysofdate, vofdate;
}
function getvaluesforweekdays(keysofdate, vofdate){
    expensesbyweekday = {
    '0': 0,
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0,
    '6': 0
};
for (let i = 0; i < keysofdate.length; i++) {
    const date = new Date(keysofdate[i]);
    const weekday = date.getDay().toString();
    expensesbyweekday[weekday] += vofdate[i];
}
return expensesbyweekday;
}
function runCounterAnimation(targetId, endValue) {
    
    const options = {
        startVal: 0,           
        duration: 2,           
        separator: ',',        
        decimal: '.',          
        decimalPlaces: 2,     
        prefix: '$',           
    };

    const demo = new countUp.CountUp(targetId, endValue, options);
    if (!demo.error) {
        demo.start();
    } else {
        console.error(demo.error);
    }
}
function getDaysBetween(date1String, date2String) {
    
    const d1 = new Date(date1String);
    const d2 = new Date(date2String);
    const diffInMs = Math.abs(d2 - d1);
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

    return diffInDays;
}