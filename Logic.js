"use strict";
var TestCase = /** @class */ (function () {
    function TestCase(testCaseName, id) {
        this.name = testCaseName;
        this.isPassing = true;
        this.id = id;
    }
    return TestCase;
}());
function addTestCase() {
    var textBox = document.getElementById('txtTestName');
    var testCaseName = textBox.value;
    if (testCaseName) {
        testManager.addTestCase(testCaseName);
        textBox.value = '';
    }
    else {
        alert('You must enter a test case name');
    }
}
var TestManagerApp = /** @class */ (function () {
    function TestManagerApp() {
        this.testCases = [];
        this.nextTestCaseId = 2;
        this.testCases = TestManagerApp.buildInitialData();
    }
    TestManagerApp.buildInitialData = function () {
        return [{
                name: 'The app should not crash on startup',
                isPassing: true,
                id: 1
            }];
    };
    TestManagerApp.prototype.findTestCaseById = function (id) {
        for (var _i = 0, _a = this.testCases; _i < _a.length; _i++) {
            var testCase = _a[_i];
            if (testCase.id === id)
                return testCase;
        }
        return null;
    };
    TestManagerApp.prototype.deleteTestCase = function (testCase) {
        var index = this.testCases.indexOf(testCase);
        this.testCases.splice(index, 1);
    };
    TestManagerApp.prototype.addTestCase = function (testCaseName) {
        var testCase = new TestCase(testCaseName, this.nextTestCaseId++);
        this.testCases.push(testCase);
        updateTestCases(this);
    };
    return TestManagerApp;
}());
var testManager = new TestManagerApp();
function updateTestCases(app) {
    // Clear the existing items
    var list = document.getElementById('listTestCases');
    list.innerHTML = '';
    for (var _i = 0, _a = app.testCases; _i < _a.length; _i++) {
        var testcase = _a[_i];
        addTestCaseToUI(testcase);
    }
    // Show or hide the empty items list
    if (app.testCases.length > 0) {
        hideAddItemsPrompt();
    }
    else {
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
    buttons.innerHTML = "<button class='btn btn-success' onclick='passTestCase(" + testCase.id + ");'>Pass</button>\n                         <button class='btn btn-danger' onclick='failTestCase(" + testCase.id + ");'>Fail</button>\n                         <button class='btn btn-outline-danger ml-2' onclick='deleteTestCase(" + testCase.id + ");'>Delete</button>";
    child.appendChild(buttons);
    list.appendChild(child);
}
// eslint-disable-next-line no-unused-vars
function passTestCase(id) {
    var testcase = testManager.findTestCaseById(id);
    if (testcase) {
        testcase.isPassing = true;
    }
    updateTestCases(testManager);
}
// eslint-disable-next-line no-unused-vars
function failTestCase(id) {
    var testcase = testManager.findTestCaseById(id);
    if (testcase) {
        testcase.isPassing = false;
    }
    updateTestCases(testManager);
}
// eslint-disable-next-line no-unused-vars
function deleteTestCase(id) {
    var testcase = testManager.findTestCaseById(id);
    if (testcase) {
        testManager.deleteTestCase(testcase);
    }
    updateTestCases(testManager);
}
function hideAddItemsPrompt() {
    var label = document.getElementById('lblNoTestCases');
    label.className = 'invisible';
}
function showAddItemsPrompt() {
    var label = document.getElementById('lblNoTestCases');
    label.className = 'text-muted';
}
document.addEventListener("DOMContentLoaded", function () {
    var addButton = document.getElementById("button-add");
    addButton.onclick = addTestCase;
    updateTestCases(testManager);
});
