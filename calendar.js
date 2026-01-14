const calendarElement = document.querySelector(".calendar");
const currentMonthElement = document.querySelector("#currentmonth");

const backBtn = document.querySelector("#back");
const forwardBtn = document.querySelector("#forward");

const locale = "sv-SE";
let currentMonth = Temporal.Now.plainDateISO().with({month:1});

update();

backBtn.addEventListener("click", () => {
    currentMonth = currentMonth.subtract({months:1});
    update();
})

forwardBtn.addEventListener("click", () => {
    currentMonth = currentMonth.add({months:1});
    update();
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

    for (let i = 0; i < dateDivs.length; i++) {
        const dateDiv = dateDivs[i];
        let assignments = document.createElement("div");
        assignments.className = "assignments";
        dateDiv.appendChild(assignments);
        // hittar alla uppgifter den dagen
        let assignment = document.createElement("p");
        assignment.textContent = "prov!";
        assignment.style.backgroundColor = "#90ff80";
        assignments.appendChild(assignment);

        let assignment2 = document.createElement("p");
        assignment2.textContent = "hur lång kan det här bli?";
        assignment2.style.backgroundColor = "#ff8080";
        assignments.appendChild(assignment2);
    }
}

function addAssignment(){

}