var testCases = [];

class TestCase {
    constructor(testCaseName) {
        this.name = testCaseName;
        this.isPassing = true;
    }
}

function addTestCase() {
    const textBox = document.getElementById('txtTestName');
    const testCaseName = textBox.value;

    if (testCaseName) {
        const testCase = new TestCase(testCaseName);
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
    buttons.innerHTML = "<button class='btn btn-success'>Pass</button><button class='btn btn-warning'>Fail</button><button class='btn btn-danger'>Delete</button>";
    child.appendChild(buttons);

    list.appendChild(child);
}

function hideAddItemsPrompt() {
    const label = document.getElementById('lblNoTestCases');
    label.className = 'hidden';
}

function showAddItemsPrompt() {
    const label = document.getElementById('lblNoTestCases');
    label.className = '';
}
