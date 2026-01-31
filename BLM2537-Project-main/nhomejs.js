console.log("nhomejs.js loaded");

//popup controls

//var Profiles = ['DefaultProfile', 'profile1', 'profile2', 'profile3'];
var Profiles = JSON.parse(localStorage.getItem("proofiles"));
if(!Profiles){
    //Profiles = ["'DefaultProfile'"];
    var today = Date.now();
    Profiles = [
        {'name': "DefaultProfile", 'lastupdate': today},
    ];
    localStorage.setItem("proofiles", JSON.stringify(Profiles));
}
console.log("Initialized Profiles:", Profiles);
function generateTable(data) {
            console.log("Generating table with data:", data);
            var table = document.getElementById("expenseTable");
            table.innerHTML = "";
            for (var i = 0; i < data.length; i++) {
                var row = `<tr>
                                <td>${data[i].date}</td>
                                <td>${data[i].name}</td>
                                <td>${data[i].description}</td>
                                <td>${data[i].category}</td>
                                <td>${data[i].amount}</td>
                                <td class="delete-cell">
                                    <button onclick="opendeletepopup(${data[i].id})" class="delete-button-selector" class="delete-button">
                                        <img src="resources/trashblack.png" alt="trash" class="trash-icon">
                                    </button>
                                    <button class="edit-button-selector" class="edit-button" data-expense-id="${data[i].id}">
                                        <img src="resources/editpen.png" alt="gear" class="edit-icon" data-expense-id="${data[i].id}">
                                    </button>
                                </td>
                           </tr>`;
                table.innerHTML += row;
            }
            
        }
function generateProtfilesTable(data) {
    console.log("Generating profiles table with data:", data);
    var table = document.getElementById("ProfilesTablebody");
            table.innerHTML = "";
            for (var i = 0; i < data.length; i++) {
                let date = new Date(Number(data[i].lastupdate));

                
                let formatted = date.toLocaleString('en-GB');
                var row = `<tr>
                                <td>${i+1}</td>
                                <td>${data[i].name}</td>
                                <td>${formatted}</td>
                                <td class="delete-cell">
                                    <button class="delete-profile-button" data-profile-id="${data[i].lastupdate}">
                                        Delete
                                    </button>
                                </td>
                           </tr>`;
                table.innerHTML += row;
            }
}
function generateProfiles(aoo) {
    console.log("Generating profiles from:", aoo);
    let sProfiles = JSON.parse(localStorage.getItem("selectedProfiles"));
    if(!sProfiles){
        sProfiles = [];
    }
    let data = aoo.map(item => item.name);
    console.log("All Profiles from data:", data);
    console.log("Selected Profiles from storage:", sProfiles);
    var profileList = document.getElementById("profiles-menu");
    profileList.innerHTML = "";
    var profilepopupList = document.getElementById("profiles-popup");
    profilepopupList.innerHTML = "";
    for (var i = 0; i < data.length; i++) {
        var profileItem = ` <div class="profile-item">
                            <input type="checkbox" class="profilecheckbox" id="${data[i]}" name="${data[i]}">
                            <label for="${data[i]}">${data[i]}</label><br>
                            </div>`;
        profileList.innerHTML += profileItem;
        var profileOption = `<option value="${data[i]}">${data[i]}</option>`;
        profilepopupList.innerHTML += profileOption;
    }
    for (var i = 0; i < data.length; i++) {
        var checkbox = document.getElementById(sProfiles[i]);
        checkbox.checked = true;
    }
    console.log("Profiles generated:", data);
}
function getprofilestobeshown(){
    const checkboxes = document.querySelectorAll('#profiles-menu input[type="checkbox"]');
    var selectedProfiles = [];
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            selectedProfiles.push(checkbox.id);
        }
    });
    return selectedProfiles;
}
function getallitemstobeshown(data){
    var allitemstobeshown = [];
    for (var i = 0; i < data.length; i++) {
        items = JSON.parse(localStorage.getItem(data[i]));
        if(!items){
            items = [];
        }
        allitemstobeshown.push(...items);
    }
    console.log("All items to be shown:", allitemstobeshown);
    return allitemstobeshown;
}
function getprofilebyid(id){
    var items = getallitemstobeshown(getprofilestobeshown());
    for (var i = 0; i < items.length; i++) {
        if(items[i].id == id){
            return items[i].profile;
        }
}
    return null;
}
function getitembyid(id){
    var items = getallitemstobeshown(getprofilestobeshown());
    for (var i = 0; i < items.length; i++) {
        if(items[i].id == id){
            return items[i];
        }
}
    return null;
}
function deleteprofilebyid(id){
    var ProfileList = JSON.parse(localStorage.getItem("proofiles"));
    if(!ProfileList){
        ProfileList = [];
    }
    var profilee = ProfileList.find(profile => profile.lastupdate == id);
    localStorage.removeItem(profilee.name);
    ProfileList = ProfileList.filter(profile => profile.lastupdate != id);
    
    
    localStorage.setItem("proofiles", JSON.stringify(ProfileList));
    console.log("Deleted profile id:", id);
}
function deleteexpensebyid(id){
    var profile = getprofilebyid(id);
    if(!profile){
        console.log("Profile not found for expense id:", id);
        return;
    }
    var items = JSON.parse(localStorage.getItem(profile));
    if(!items){
        items = [];
    }
    items = items.filter(item => item.id != id);
    localStorage.setItem(profile, JSON.stringify(items));
    console.log("Deleted expense id:", id, "from profile:", profile);
}
function openaddprofilepopup(){
    document.querySelector(".addprofilepopupcontainer").style.display = "flex";
    document.getElementById("add-profile-add-button").addEventListener("click", function() {
                if(Profiles.length >= 10){
                    alert("Maximum number of profiles reached (10). Cannot add more profiles.");
                    return;
                }
                else{
                    const inputprofilename = document.getElementById("profilename");
                    let today = Date.now();
                    Profiles.push({'name': inputprofilename.value, 'lastupdate': today});
                    localStorage.setItem("proofiles", JSON.stringify(Profiles));
                    generateProfiles(Profiles);
                }
            document.querySelector(".addprofilepopupcontainer").style.display = "none";
            
            inputprofilename.value = "";
                                });
    document.getElementById("add-profile-cancel-button").addEventListener("click", function() {
            document.querySelector(".addprofilepopupcontainer").style.display = "none";
            const inputprofilename = document.getElementById("profilename");
            inputprofilename.value = "";
                                });

}/*
function openaddexpensepopup(){
    document.querySelector(".popup-container").style.display = "flex";
   
        const inputname = document.getElementById("name");
        const inputamount = document.getElementById("amount");
        const inputdate = document.getElementById("date");
        const inputcategory = document.getElementById("category");
        const inputdescription = document.getElementById("description");
        const inputprofile = document.getElementById("profiles-popup");
        document.getElementById("expenseForm").addEventListener("submit", function(event) {
            event.preventDefault();
            const name = inputname.value;
            const amount = parseFloat(inputamount.value);
            const date = inputdate.value;
            const category = inputcategory.value;
            const description = inputdescription.value;
            const profile = inputprofile.value;
            const newExpense = {
                date: date,
                name: name,
                description: description,
                category: category,
                amount: amount,
                profile: profile,
                id: Date.now()};
            //get profile data, append the new expense then save
            arrofobj = JSON.parse(localStorage.getItem(profile));
            if (arrofobj == null) {
                arrofobj = [];
            }
            arrofobj.push(newExpense);
            localStorage.setItem(profile, JSON.stringify(arrofobj));
            //update profile lastupdate to now
            for(let i=0; i<Profiles.length; i++){
                if(Profiles[i].name === profile){
                    let today = Date.now();
                    Profiles[i].lastupdate = today;
                    localStorage.setItem("proofiles", JSON.stringify(Profiles));
                    break;
                }
            }
            //close window and clear inputs and generate table with new data
            document.querySelector(".popup-container").style.display = "none";
            inputname.value = "";
            inputamount.value = "";
            inputdate.value = "";
            inputcategory.value = "";
            inputdescription.value = "";
            generateTable(getallitemstobeshown(getprofilestobeshown()));
    });
        //cancel button
        document.getElementById("popup-cancel-button").addEventListener("click", function() {
            document.querySelector(".popup-container").style.display = "none";
            inputname.value = "";
            inputamount.value = "";
            inputdate.value = "";
            inputcategory.value = "";
            inputdescription.value = "";
                                });
            
            }*/   
function opendeletepopup(id){
    document.querySelector(".delete-popup-container").style.display = "flex";
                document.getElementById("delete-confirm-button").addEventListener("click", function() {
                    document.querySelector(".delete-popup-container").style.display = "none";
                    deleteexpensebyid(id);
                                });                
                document.getElementById("delete-cancel-button").addEventListener("click", function() {
                    document.querySelector(".delete-popup-container").style.display = "none";
                });
                generateTable(getallitemstobeshown(getprofilestobeshown()));
                console.log("generate table after delete called");
}
function createsheet(data){
            console.log("button clicked!");
            var cleanData = data.map(function(item) {
            var { id, ...rest } = item;
            return rest;
            });
            var ws = XLSX.utils.json_to_sheet(cleanData);
            var wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
            XLSX.writeFile(wb, "Expenses.xlsx");
            console.log("Exported Profiles Data:", cleanData);
}
function downloadPDF() {
        const originalTable = document.querySelector(".overview-table");
  const clone = originalTable.cloneNode(true);

  // ✅ remove last column (header + each row)
  clone.querySelectorAll("thead tr").forEach(tr => tr.lastElementChild?.remove());
  clone.querySelectorAll("tbody tr").forEach(tr => tr.lastElementChild?.remove());

  // ✅ wrap clone (this wrapper is what we export)
  const wrapper = document.createElement("div");
  wrapper.style.width = "100%";
  wrapper.style.padding = "0";     // fill sides more
  wrapper.style.margin = "0";
  wrapper.style.background = "#fff"; // avoids dark backgrounds in pdf sometimes

  // ✅ inject PDF-only CSS (ONLY affects the clone)
  const style = document.createElement("style");
  style.textContent = `
    table{
      width: 100% !important;
      border-collapse: collapse !important;
      table-layout: fixed !important;  /* prevents overlap */
      font-size: 12px;
    }
    th, td{
      padding: 8px 10px;
      vertical-align: top;
      white-space: normal !important;      /* allow wrap */
      overflow-wrap: anywhere !important;  /* break long words */
      word-break: break-word !important;
    }

    /* Optional: force column widths (tweak if you want) */
    th:nth-child(1), td:nth-child(1){ width: 16%; } /* Date */
    th:nth-child(2), td:nth-child(2){ width: 18%; } /* Name */
    th:nth-child(3), td:nth-child(3){ width: 32%; } /* Description */
    th:nth-child(4), td:nth-child(4){ width: 18%; } /* Category */
    th:nth-child(5), td:nth-child(5){ width: 16%; } /* Amount */

    /* ✅ prevent row splitting across pages */
    tr { break-inside: avoid !important; page-break-inside: avoid !important; }
    thead { display: table-header-group; } /* keeps header on each page */
    tbody { display: table-row-group; }

    .charts {
    margin-top: 16px;
  }

  .charts-row-2 {
    display: flex;
    gap: 12px;
    align-items: stretch;
  }

  .chart-block {
    break-inside: avoid !important;
    page-break-inside: avoid !important;
    margin-top: 12px;
    padding: 10px;
  }

  .chart-half { flex: 1; }
  .chart-full { width: 100%; }

  .chart-title {
    margin: 0 0 8px 0;
    font-size: 14px;
    font-weight: 700;
  }

  canvas { display: block; max-width: 100%; }
  `;
  

const charts = document.createElement("div");
charts.className = "charts";
        

        
// --- Row 1: Pie + Horizontal bar next to each other ---
const row1 = document.createElement("div");
row1.className = "charts-row-2";

// Pie block
const pieBlock = document.createElement("div");
pieBlock.className = "chart-block chart-half";
pieBlock.innerHTML = `<div class="chart-title">Category Pie</div>`;
const pieCanvas = document.createElement("canvas");
pieCanvas.width = 520;
pieCanvas.height = 320;
pieBlock.appendChild(pieCanvas);

// Horizontal bar block
const hbarBlock = document.createElement("div");
hbarBlock.className = "chart-block chart-half";
hbarBlock.innerHTML = `<div class="chart-title">Category Horizontal Bar</div>`;
const hbarCanvas = document.createElement("canvas");
hbarCanvas.width = 520;
hbarCanvas.height = 320;
hbarBlock.appendChild(hbarCanvas);

row1.appendChild(pieBlock);
row1.appendChild(hbarBlock);

// --- Row 2: Line chart full width ---
const lineBlock = document.createElement("div");
lineBlock.className = "chart-block chart-full";
lineBlock.innerHTML = `<div class="chart-title">Trend Line</div>`;
const lineCanvas = document.createElement("canvas");
lineCanvas.width = 1100;
lineCanvas.height = 360;
lineBlock.appendChild(lineCanvas);

// --- Row 3: Bar chart full width ---
const barBlock = document.createElement("div");
barBlock.className = "chart-block chart-full";
barBlock.innerHTML = `<div class="chart-title">Monthly Bar</div>`;
const barCanvas = document.createElement("canvas");
barCanvas.width = 1100;
barCanvas.height = 360;
barBlock.appendChild(barCanvas);

// Assemble
charts.appendChild(row1);
charts.appendChild(lineBlock);
charts.appendChild(barBlock);


allitems = getallitemstobeshown(getprofilestobeshown());
        console.log("All items for analysis:", allitems);
        const [keysofcategory, vofcategory] = reduceByCategory(allitems);
        console.log("koc", keysofcategory);
        console.log("voc", vofcategory);
        createpieChart(keysofcategory, vofcategory, pieCanvas.getContext("2d"));
        createhorizontalBarChart(keysofcategory, vofcategory, hbarCanvas.getContext("2d"));    
        const [keysofdate, vofdate] = reduceByDate(allitems);
        console.log("kosd", keysofdate);
        console.log("vod", vofdate);
        var expensesbyweekday = getvaluesforweekdays(keysofdate, vofdate);
        createweeklyBarChart(expensesbyweekday, barCanvas.getContext("2d"));
        createlineChart(keysofdate, vofdate, lineCanvas.getContext("2d"));  


const firstday = keysofdate[0];
        const lastday = keysofdate[keysofdate.length - 1];
        daysbetween = getDaysBetween(firstday, lastday)+1;
        let totalExpenses = 0;
        let highestExpense = 0;
        let lowestExpense = Infinity;

        allitems.forEach(expense => {
            const amount = parseFloat(expense.amount);
            totalExpenses += amount;
            if (amount > highestExpense) {
                highestExpense = amount;
            }
            if (amount < lowestExpense) {
                lowestExpense = amount;
            }
        });
        const averageperday = totalExpenses / daysbetween;
        console.log("Total Expenses:", totalExpenses);
        console.log("Highest Expense:", highestExpense);
        console.log("Lowest Expense:", lowestExpense);
        console.log("Average per Day:", averageperday.toFixed(2));


const header = document.createElement("div");
header.className = "pdf-header";
header.innerHTML = `
  <h2>Expense Report</h2>
  <p>Generated on: ${new Date().toLocaleDateString()}</p>
`;
const summary = document.createElement("div");
summary.className = "pdf-summary";
summary.innerHTML = `
  
    <p>Lowest Expense: ${lowestExpense.toLocaleString()}</p>
    <p>Highest Expense: ${highestExpense.toLocaleString()}</p>
    <p>Average per Day: ${(averageperday.toFixed(2)).toLocaleString()}</p>
    <h3>Total Expenses: ${totalExpenses.toLocaleString()}</h3>
`;


  wrapper.appendChild(style);
    wrapper.appendChild(header);
  wrapper.appendChild(clone);
wrapper.appendChild(charts);
wrapper.appendChild(summary);

  const opt = {
    margin: [6, 6, 6, 6], // small margins -> more width used
    filename: "expenses.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    pagebreak: { mode: ["css", "legacy"] } // respects break-inside: avoid
  };

  html2pdf().set(opt).from(wrapper).save();
        }
//analyze functions
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
      },
        responsive: false,
      animation: false,
      plugins: { legend: { position: "right" } }
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
            responsive: false,
            aspectRatio: 1.1,
            animation: false
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
            },
            responsive: false,
            animation: false
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
            },
            responsive: false,
            animation: false
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
    console.log("Keys of category:", keysofcategory);
    vofcategory = Object.values(sortedByCategory);
    console.log("Values of category:", vofcategory);
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
    console.log("Sorted Keys of category:", keysofcategory);
    return [keysofcategory, vofcategory];
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
return [keysofdate, vofdate];
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