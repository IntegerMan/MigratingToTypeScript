var testCases = [];
var nextTestCaseId = 2;

class TestCase {
    constructor(testCaseName, id) {
        this.name = testCaseName;
        this.isPassing = true;
        this.id = id;
    }
}

function buildInitialData() {
    return [{
        name: 'The app should not crash on startup',
        isPassing: true,
        id: '1'
    }];
}

function addTestCase() {
    const textBox = document.getElementById('txtTestName');
    const testCaseName = textBox.value;

    if (testCaseName) {
        const testCase = new TestCase(testCaseName, nextTestCaseId++);
        testCases.push(testCase);

        updateTestCases();

        textBox.value = '';
    } else {
        alert('You must enter a test case name');
    }
}

function updateTestCases() {
    // Clear the existing items
    var list = document.getElementById('listTestCases');
    list.innerHTML = '';

    for (testcase of this.testCases) {
        addTestCaseToUI(testcase);
    }

    // Show or hide the empty items list
    if (this.testCases.length > 0) {
        hideAddItemsPrompt();
    } else {
        showAddItemsPrompt();
    }
}

function addTestCaseToUI(testCase) {
    var list = document.getElementById('listTestCases');

    var child = document.createElement('div');
    child.className = 'list-group-item';

    var header = document.createElement('h3');
    header.innerText = testCase.name;
    header.className = testCase.isPassing ? 'text-success' : 'text-danger';
    child.appendChild(header);

    var buttons = document.createElement('div');
    buttons.className = 'btn-group';
    buttons.innerHTML = `<button class='btn btn-success' onclick='passTestCase(${testCase.id});'>Pass</button>
                         <button class='btn btn-danger' onclick='failTestCase(${testCase.id});'>Fail</button>
                         <button class='btn btn-outline-danger ml-2' onclick='deleteTestCase(${testCase.id});'>Delete</button>`;
    child.appendChild(buttons);

    list.appendChild(child);
}

function passTestCase(id) {
    const testcase = findTestCaseById(id);
    testcase.isPassing = true;
    updateTestCases();
}

function failTestCase(id) {
    const testCase = findTestCaseById(id);
    testcase.isPassing = false;
    updateTestCases();
}

function deleteTestCase(id) {
    const testcase = findTestCaseById(id);
    const index = this.testCases.indexOf(testcase);
    this.testCases.splice(index, 1);
    updateTestCases();
}

function hideAddItemsPrompt() {
    const label = document.getElementById('lblNoTestCases');
    label.className = 'invisible';
}

function showAddItemPrompt() {
    const label = document.getElementById('lblNoTestCases');
    label.className = 'text-muted';
}

function findTestCaseById(id) {
    for (testcase of this.testCases) {
        if (testcase.id === id) return testcase;
    }

    return null;
}

document.addEventListener("DOMContentLoaded", function() {
    testCases = buildInitialData();
    updateTestCases();
});
