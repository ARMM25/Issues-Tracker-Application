
//event handler for the form once the issue is submitted
document.getElementById("issueInputForm").addEventListener('submit', saveIssue);

function saveIssue(e){
    var issueDesc = document.getElementById('issueDescInput').value;
    var issueSeverity = document.getElementById('issueSeverityInput').value;
    var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    var issueId = chance.guid(); //identifier for the issue-use chance library to create global unit identifier.
    var issueStatus = 'Open';

    //create a new issue object
    var issue = {
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    }

    //check if something exists in local storage first
    if (localStorage.getItem('issues') == null){ //this is the object where we will store all our issues
        var issues = []; //initialize empty array
        issues.push(issue); //we push the object defined above (new issue object)
        localStorage.setItem('issues', JSON.stringify(issues)) // this is the local issues array created by JSON
    } else {
        var issues = JSON.parse(localStorage.getItem('issues')); //this retreives whatever is local storage
        issues.push(issue); //extend array and one more element is inserted in array
        localStorage.setItem('issues', JSON.stringify(issues)); //
    }  
        //now reset the input elements
        document.getElementById('issueInputForm').reset(); //reference to the form element and reset() initializes and values are removed

        fetchIssues();//list output is regenerated and new element is included in list ouput

        e.preventDefault(); //prevents from submitting
    
    }


    function setStatusClosed(id){
        var issues = JSON.parse(localStorage.getItem('issues')); //retrieves from local storage

        for (var i = 0; i<issues.length; i++){
            if (issues[i].id == id){//iterates over all the array items
            issues[i].status="Closed";
            }
        }
        localStorage.setItem('issues'.JSON.stringify(issues));

        fetchIssues();
    }

    function deleteIssue(id){
        var issues = JSON.parse(localStorage.getItem('issues')); //retrieves from local storage

        for (var i = 0; i<issues.length; i++){
            if (issues[i].id == id){ //iterates over all the array items
            issues.splice(i, 1);
            }
        }
        localStorage.setItem('issues'.JSON.stringify(issues));

        fetchIssues();
    }


function fetchIssues(){
    var issues = JSON.parse(localStorage.getItem('issues'));
    var issuesList=document.getElementById('issuesList');

    issuesList.innerHTML = ""; 

    //generation of a dynamic list 
    for (var i = 0; i < issues.length; i++){
        var id = issues[i].id; 
        var desc = issues[i].description;
        var severity = issues[i].severity;
        var assignedTo = issues[i].assignedTo;
        var status= issues[i].status;

        //output
        issuesList.innerHTML += '<div class="well">'+
                                '<h6>Issue ID: ' + id + '</h6>' +
                                '<p><span class="label label-info">' + status + '</span></p>' +
                                '<h3>' + desc + '</h3>'+
                                '<p><span class="glyphicon glyphicon-time"></span>' + severity + '</p>' +
                                '<p><span class="glyphicon glyphicon-user"></span>' + assignedTo + '</p>' +
                                '<a href="#" onclick="setStatusClosed(\''+id+'\')" class ="btn btn-warning">Close</a>'+
                                '<a href="#" onclick="deleteIssue(\''+id+'\'))" class ="btn btn-danger">Delete</a>' +
                                '</div';
                            }

}
