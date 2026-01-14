const calendarContainer = document.querySelector(".calendar");
const currentMonthDisplay = document.querySelector("#currentmonth");

const backBtn = document.querySelector("#back");
const forwardBtn = document.querySelector("#forward");

const locale = "sv-SE";
let currentMonth = Temporal.Now.plainDateISO().with({month:1});

update();

backBtn.addEventListener("click", () => {
    currentMonth = currentMonth.subtract({months:1});
    update();
    console.log("Clicked! "+toString(currentMonth))
})

forwardBtn.addEventListener("click", () => {
    currentMonth = currentMonth.add({months:1});
    update();
})

function update(){
    updateCalendarDates(currentMonth);
    
    currentMonthDisplay.textContent = currentMonth.toLocaleString(locale, { year: "numeric", month: "long" });
}

function updateCalendarDates(selectedMonth){

    while (calendarContainer.firstChild){
        calendarContainer.removeChild(calendarContainer.firstChild);
    }

    const dateToday = Temporal.Now.plainDateISO();

    const firstDateInMonth = selectedMonth.with({day:1});
    const monthStartDayOfWeek = selectedMonth.with({day:1}).dayOfWeek;
    
    const calendarItemsLength = 6*7;
    for(i=0;i<calendarItemsLength;i++)
    {
        let calendarItemText = "";
        let disabled = false;
        //Temporal är 1-indexerat och jag hatar det.
        if((i+1)<monthStartDayOfWeek)
        {
            calendarItemText = firstDateInMonth.subtract({days:monthStartDayOfWeek-i-1}).day;
            disabled = true;
        }
        else if((i+1)<(selectedMonth.daysInMonth+monthStartDayOfWeek)){
            calendarItemText = firstDateInMonth.add({days:i-monthStartDayOfWeek+1}).day;
        }
        else
        {
            calendarItemText = firstDateInMonth.add({days:i-monthStartDayOfWeek+1}).day;
            disabled = true;
        }
        let itemDiv = document.createElement("div");
        itemDiv.className = disabled ? "disabled" : "";
        calendarContainer.appendChild(itemDiv);
        
        let calendarNumber = document.createElement("p");
        calendarNumber.textContent = calendarItemText;
        itemDiv.appendChild(calendarNumber)
        // let assignments = document.createElement("div");
        // assignments.className = "assignments";
        // itemDiv.appendChild(assignments);
    }
}
