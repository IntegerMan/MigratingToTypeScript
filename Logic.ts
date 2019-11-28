class TestCase {
    constructor(testCaseName: string, id: number) {
        this.name = testCaseName;
        this.isPassing = true;
        this.id = id;
    }

    public name: string;
    public isPassing: boolean;
    public id: number;
}

function addTestCase() {
    const textBox = <HTMLInputElement>document.getElementById('txtTestName');
    const testCaseName = textBox.value;

    if (testCaseName) {
        testManager.addTestCase(testCaseName);

        textBox.value = '';
    } else {
        alert('You must enter a test case name');
    }
}

class TestManagerApp {
    public testCases: TestCase[] = [];
    public nextTestCaseId: number = 2;

    constructor() {
        this.testCases = TestManagerApp.buildInitialData();
    }

    private static buildInitialData(): TestCase[] {
        return [{
            name: 'The app should not crash on startup',
            isPassing: true,
            id: 1
        }];
    }

    public findTestCaseById(id: number) {
        for (const testCase of this.testCases) {
            if (testCase.id === id) return testCase;
        }

        return null;
    }

    public deleteTestCase(testCase: TestCase) {
        const index = this.testCases.indexOf(testCase);
        this.testCases.splice(index, 1);
    }

    addTestCase(testCaseName: string) {
        const testCase = new TestCase(testCaseName, this.nextTestCaseId++);
        this.testCases.push(testCase);

        updateTestCases(this);
    }
}

const testManager: TestManagerApp = new TestManagerApp();

function updateTestCases(app: TestManagerApp) {
    // Clear the existing items
    const list = <HTMLElement>document.getElementById('listTestCases');
    list.innerHTML = '';

    for (const testcase of app.testCases) {
        addTestCaseToUI(testcase);
    }

    // Show or hide the empty items list
    if (app.testCases.length > 0) {
        hideAddItemsPrompt();
    } else {
        showAddItemsPrompt();
    }
}

function addTestCaseToUI(testCase: TestCase) {
    const list = <HTMLElement>document.getElementById('listTestCases');

    const child = document.createElement('div');
    child.className = 'list-group-item';

    const header = document.createElement('h3');
    header.innerText = testCase.name;
    header.className = testCase.isPassing ? 'text-success' : 'text-danger';
    child.appendChild(header);

    const buttons = document.createElement('div');
    buttons.className = 'btn-group';
    buttons.innerHTML = `<button class='btn btn-success' onclick='passTestCase(${testCase.id});'>Pass</button>
                         <button class='btn btn-danger' onclick='failTestCase(${testCase.id});'>Fail</button>
                         <button class='btn btn-outline-danger ml-2' onclick='deleteTestCase(${testCase.id});'>Delete</button>`;
    child.appendChild(buttons);

    list.appendChild(child);
}

// eslint-disable-next-line no-unused-vars
function passTestCase(id: number) {
    const testcase = testManager.findTestCaseById(id);
    if (testcase) {
        testcase.isPassing = true;
    }
    updateTestCases(testManager);
}

// eslint-disable-next-line no-unused-vars
function failTestCase(id: number) {
    const testcase = testManager.findTestCaseById(id);
    if (testcase) {
        testcase.isPassing = false;
    }
    updateTestCases(testManager);
}

// eslint-disable-next-line no-unused-vars
function deleteTestCase(id: number) {
    const testcase = testManager.findTestCaseById(id);
    if (testcase) {
        testManager.deleteTestCase(testcase);
    }
    updateTestCases(testManager);
}

function hideAddItemsPrompt() {
    const label = <HTMLElement> document.getElementById('lblNoTestCases');
    label.className = 'invisible';
}

function showAddItemsPrompt() {
    const label = <HTMLElement>document.getElementById('lblNoTestCases');
    label.className = 'text-muted';
}

document.addEventListener("DOMContentLoaded", function()
{
    const addButton = <HTMLElement>document.getElementById("button-add");
        addButton.onclick = addTestCase;
            updateTestCases(testManager);
});
