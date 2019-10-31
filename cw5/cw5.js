//"use strict";
//const RDR2 = new FileReader();
//RDR2.onload = function() { display(RDR2) };
function fileSelect(t) { 
//target t is the file selection HTMLInputElement
    let a = t.files; //display(t);
    if (a.length == 0) return;
    display(RDR2);
    if (a.length == 1) {
        let f = a[0]; display(f);
        MENU.displayFile(f)
    } else {
        display(a);
        let s = "";
        for (let f of a) 
            s += f.name+" "+f.size+" bytes "+NL;
        MENU.displayText(s)
    }
}

class cw5 extends Menu {
  constructor() {
    super();
    this.Course = new Course("mat","13.00","cuma","a103");
    this.Student = new Student("152","atahan","3");
    this.Point = new point("1","2");
    this.Point3D = new Point3D("1","2","4")  }
  isTextFile(f) {
    console.assert(f instanceof File);
    return f.type.startsWith("text") || f.name.endsWith(".md")
         || f.name.endsWith(".js") || f.name.endsWith(".java");
  }
  displayFile(f) {
    console.assert(f instanceof File); let M = this;
    console.log(f.name+" "+f.size+" bytes "+f.type);
    if (f.type.startsWith("image")) {
        RDR2.onload = function(evt) {
            M.displayImage(RDR2.result)
        };
        RDR2.readAsDataURL(f);
    } else if (this.isTextFile(f)) {
        RDR2.onload = function(evt) {
            M.displayText(RDR2.result)
        };
        RDR2.readAsText(f);
    } else {
        this.displayText("Unknown")
    }
  }
  displayText(txt) {
    disp1.innerText = txt; disp2.src = ""; 
    return disp1
  }
  displayImage(url) {
    disp1.innerText = ""; disp2.src = url; 
    return disp2
  }
}
class Course {
    constructor(code, time, date, rooms) {
        this.code = code;
        this.time = time;
        this.date = date;
        this.rooms = rooms;
    }

    toString () {
        return this.code + ' ';
    }
}
class Student {
    constructor (id, name, gpa, courses=[]) {
        this.id = id;
        this.name = name;
        this.gpa = gpa;
        this.courses = courses;
    }
    toString () {
        return this.id + ' ';
    }
}

class point {
    constructor(x,y) {
        this.x=x;
        this.y=y;
    }

    toString () {
        return this.x + ' '+ this.y;
    }
}
class Point3D extends point {
    constructor (x,y,z) {
        super();

        this.x = x;
        this.y = y;
        this.z = z;
    }
    toString () {
        return this.x + ' '+ this.y + ' '+ this.z;
    }
}

