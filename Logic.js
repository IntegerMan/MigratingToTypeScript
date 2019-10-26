var testCases = [];

class TestCase {
    constructor(testCaseName) {
        this.name = testCaseName;
        this.isPassing = true;
    }
}

function addTestCaseToUI(testCase) {
    var list = document.getElementById('listTestCases');
    var child = document.createElement('div');
    var text = document.createTextNode(testCase.name);
    child.appendChild(text);
    list.appendChild(child);
}

function addTestCase() {
    var textBox = document.getElementById('txtTestName');
    var testCaseName = textBox.value;

    if (testCaseName) {
        var testCase = new TestCase(testCaseName);
        testCases.push(testCase);

        addTestCaseToUI(testCase);

        hideAddItemsPrompt();

        textBox.value = '';
    } else {
        alert('You must enter a test case name');
    }
}

function hideAddItemsPrompt() {
    var label = document.getElementById('lblNoTestCases');
    label.className = 'hidden';
}
