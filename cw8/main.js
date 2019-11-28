class Course {
    constructor(coursename,examtime,examdate,room){
    this.coursename=coursename
    this.examtime=examtime
    this.examdate=examdate
    this.room=room
    }
    toString () {
        return this.coursename + " " + this.examdate
    }
    }
    class Student {
    constructor(id,name,gpa,courses){
    this.id=id
    this.name=name
    this.gpa=gpa
    this.courses= courses
    }
    toString () {
        return this.id +" "+ this.name
    }
    }
    class Database {
        constructor(){
            this.urlS = document.getElementById("linktxt").value;
            //this.Courses = new Map();
            this.Students = new Map();
            this.readStudents();
        }
    readStudents() {
        console.log("readStudents "+this.urlS);
        fetch(this.urlS)
        .then(r => r.text())
        .then(r => this.addStudent(r))
        .then(r => this.printTable())
    }


    addStudent(txt){
       let msg = txt.length+" chars, ";
       let a = txt.split("\n");
       msg += a.length+" lines ";
       for (let s of a) {
         let student = this.parseStudent(s);
         this.Students.set(student.id,student);
       }
       this.report(msg);
    }
    parseStudent(line){
        let s = line.split("\t");
        let courses = [];
        for (let i=3; i<s.length; i++)
        courses.push(s[i]);
        const student = new Student(s[0],s[1],s[2],courses)
        return student
    }
    printTable(){
        var counter=1;

        var html="<tr><th></th><th>Name</th><th>Diam</th><th>Mass</th><th>Radius</th><th>Period</th></tr>";
        let stu=db.Students;
        for(let a of stu){
            let b=Array.from(a);
                for (var i = 1; i < 2; i++) {
                    if(b[i].name!=undefined){
                    let c=b[i].courses;
                    html+="<tr>";
                    html+="<th>"+counter+"</th>"
                    html+="<td>"+b[i].id+"</td>";
                    html+="<td>"+b[i].name+"</td>";
                    html+="<td>"+b[i].gpa+"</td>";
                    html+="<td>"+b[i].courses[0]+"</td>";
                    html+="<td>"+b[i].courses[1]+"</td>";
                    html+="</tr>";
        counter++;
                    }
            }
        tablo.innerHTML = html;
        }
    }
    report(msg, id, list) {
        out.innerHTML += "<br> Fetched: "+this.urlS+"<br>"; msg += " ";
        out.appendChild(document.createTextNode(msg));
        let n1;
        if (id) {
            n1 = document.createElement("span");
            n1.appendChild(document.createTextNode(id));
            n1.classList.add("link");
            out.appendChild(n1); msg += id;
            //n1.addEventListener("click", doClick);
        }
        if (list) {
            let n2 = document.createElement("span");
            n2.appendChild(document.createTextNode(""));
            n2.innerHTML += list.join("<br>");
            n2.classList.add("course");
            if (n1) n1.appendChild(n2);
        }
        console.log(msg);
    }
    doClick(evt) {
        //console.log(evt);
        let t = evt.target;
        //document.elementFromPoint(evt.clientX, evt.clientY);
        let s = t.innerText;
        if (/^\d+$/.test(s)) this.showStudent(s); //s contains digits
        else if (t = t.firstElementChild) {
            t.style.visibility = "";
            let hide = function () {
                t.style.visibility = "hidden";
            };
            setTimeout(hide, 500);
        }
    }
    }
    function copyF() {
      var copyText = document.getElementById("example");
      copyText.select();
      document.execCommand("copy");
      alert("Copied the text: " + copyText.value);
    }
    if(window.innerWidth<window.innerHeight){
        alert("please flip your device horizontal")
        setTimeout("location.reload(true);",8000)
                        }
