// Hämta element
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
const logoutLink = document.getElementById("logout-link");

// Visa/dölj meny vid klick på hamburgerknappen
menuBtn.addEventListener("click", () => {
    menu.style.display = menu.style.display === "block" ? "none" : "block";
});

// Logga ut
logoutLink.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
});

// Valfritt: stäng menyn om man klickar utanför
document.addEventListener("click", (event) => {
    if (!menu.contains(event.target) && !menuBtn.contains(event.target)) {
        menu.style.display = "none";
    }
});
const calendarElement = document.querySelector(".calendar");
const currentMonthElement = document.querySelector("#currentmonth");

const backBtn = document.querySelector("#back");
const forwardBtn = document.querySelector("#forward");
const createBtn = document.querySelector("#create");



const locale = "sv-SE";
let currentMonth = Temporal.Now.plainDateISO();

function getRandomInt(min, max){
    return min + Math.floor(Math.random() * (max - min));
}
const assignments = [];

class assignment{
    constructor(name, color , description, date) {
        this.name = name;
        this.color = color
        this.description = description;
        this.date = date;
        assignments.push(this);
    }
}

for (let index = 0; index < 30; index++) {
    new assignment("Prov!", ["#ff8080","#90ff80","#ffdf80"][getRandomInt(0,3)],"lorem och ipsum",Temporal.Now.plainDateTimeISO().add({days:getRandomInt(-20,20)}))
}








update();

backBtn.addEventListener("click", () => {
    currentMonth = currentMonth.subtract({months:1});
    update();
})

forwardBtn.addEventListener("click", () => {
    currentMonth = currentMonth.add({months:1});
    update();
})

createBtn.addEventListener("click", () => {
    
})



function update(){
    updateCalendarDates(currentMonth);
    updateAssignments(currentMonth);
    currentMonthElement.textContent = currentMonth.toLocaleString(locale, { year: "numeric", month: "long" });
}

function updateCalendarDates(month){

    while (calendarElement.firstChild){
        calendarElement.removeChild(calendarElement.firstChild);
    }

    const dateToday = Temporal.Now.plainDateISO();
    
    const firstDayInMonth = month.with({day:1});
    const monthStartDayOfWeek = month.with({day:1}).dayOfWeek;
    
    const calendarLength = 42;
    for(i=0;i<calendarLength;i++)
    {
        let calendarDateText = "";
        let disabled = false;
        //Temporal är 1-indexerat och jag hatar det.
        if((i+1)<monthStartDayOfWeek)
        {
            calendarDateText = firstDayInMonth.subtract({days:monthStartDayOfWeek-i-1}).day;
            disabled = true;
        }
        else if((i+1)<(month.daysInMonth+monthStartDayOfWeek)){
            calendarDateText = firstDayInMonth.add({days:i-monthStartDayOfWeek+1}).day;
        }
        else
        {
            calendarDateText = firstDayInMonth.add({days:i-monthStartDayOfWeek+1}).day;
            disabled = true;
        }
        
        let dateDiv = document.createElement("div");
        dateDiv.className = disabled ? "date disabled" : "date";
        calendarElement.appendChild(dateDiv);
        
        let calendarNumber = document.createElement("p");
        calendarNumber.textContent = calendarDateText;
        dateDiv.appendChild(calendarNumber)

    }
}

function updateAssignments(month){
    const dateDivs = calendarElement.querySelectorAll("div");

    const firstDayInMonth = month.with({day:1});
    const monthStartDayOfWeek = month.with({day:1}).dayOfWeek;

    for (let i = 0; i < dateDivs.length; i++) {
        let currentDate;
        if((i+1)<monthStartDayOfWeek){
            currentDate = firstDayInMonth.subtract({days:monthStartDayOfWeek-i-1});
            disabled = true;
        }
        else{
            currentDate = firstDayInMonth.add({days:i-monthStartDayOfWeek+1});
        }
        console.log(currentDate.day)

        const dateDiv = dateDivs[i];
        let assignmentsDiv = document.createElement("div");
        assignmentsDiv.className = "assignments";
        dateDiv.appendChild(assignmentsDiv);
        // hittar alla uppgifter den dagen
        assignments.forEach(a => {
            if(Temporal.PlainDate.compare(a.date, currentDate) == 0){
                let assignmentP = document.createElement("p");
                assignmentP.textContent = a.name;
                assignmentP.style.backgroundColor = a.color;
                assignmentsDiv.appendChild(assignmentP);
            }
        });

        // if (i%13 == 4)
        // {
        //     let a = document.createElement("p");
        //     a.textContent = "prov!";
        //     a.style.backgroundColor = "#90ff80";
        //     assignments.appendChild(a);
        // }
        // if (i%5  == 2 && i%7 < 5)
        // {
        //     let assignment2 = document.createElement("p");
        //     assignment2.textContent = "Annat prov!";
        //     assignment2.style.backgroundColor = "#ff8080";
        //     assignments.appendChild(assignment2);        
        // }
    }
}