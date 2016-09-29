window.onload = main;

function main() {
    document.getElementById("weighted").onclick = weightResult;
    document.getElementById("mean").onclick = meanResult;
    for (var i = 1; i < 5; i++) {
        document.getElementById("grade"+i+"a").onkeyup = fixForI(i);
        document.getElementById("grade"+i+"b").onkeyup = fixForI(i);
    }
}

// needed to save the value of i for when onkeyup occurs
function fixForI(i) { 
    return function() { percentUpdate(i); };
}

// updates the percentage associated with the changing grade
function percentUpdate(row) {
    var percentTextBox = document.getElementById("percent"+row);
    var percentValue = 
        document.getElementById("grade"+row+"a").value /
        document.getElementById("grade"+row+"b").value * 100;
    if (!isNaN(percentValue)) {
        percentValue = Math.round(percentValue*100)/100;
        percentTextBox.innerText = percentValue;
        if (percentValue !== Infinity) {
            percentTextBox.innerText += "%";
        }
    }
    else {
        percentTextBox.innerText = "";
    }
}

// Calculates and displays the weighted average of the grades
// Simply ignores non-numerical grades, but will error in case
//  of invalid weight with valid grade
// Blank weights default to 0
function weightResult() {
    var textLocation = document.getElementById("results");
    var totalVal = 0;
    var totalWeight = 0;
    for (var row = 1; row < 5; row++) {
        var percentVal = 
            document.getElementById("grade"+row+"a").value /
            document.getElementById("grade"+row+"b").value;
        var weightVal = Number(document.getElementById("weight"+row).value);
        if (!isNaN(percentVal)) {
            if (isNaN(weightVal)) {
                textLocation.innerText = "Invalid weight for activity "+row;
                totalWeight = NaN;
                break;
            }
            totalVal += percentVal*weightVal;
            totalWeight += weightVal;
            // alert(totalWeight);
        }
    }
    if (!isNaN(totalWeight)) {
        totalVal /= totalWeight;
        if (isNaN(totalVal)) {
            totalVal = 0;
        }
        textLocation.innerText = Math.round(totalVal*1000)/10 + "/100";
    }
}

// calculates and displays the unweighted average of the grades
// simply ignores non-numerical grades
function meanResult() {
    var textLocation = document.getElementById("results");
    var totalVal = 0;
    var totalGrades = 0;
    for (var row = 1; row < 5; row++) {
        var percentVal = 
            document.getElementById("grade"+row+"a").value /
            document.getElementById("grade"+row+"b").value;
        if (!isNaN(percentVal)) {
            totalVal += percentVal;
            totalGrades++;
        }
    }
    totalVal /= totalGrades;
    if (isNaN(totalVal)) {
        totalVal = 0;
    }
    textLocation.innerText = Math.round(totalVal*1000)/10 + "/100";
}