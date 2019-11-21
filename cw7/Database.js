
arr=[]
const stuMap = new Map();
const crsMap = new Map();
const url = "https://maeyler.github.io/JS/data/";
class Student{
	constructor(id,name,gpa,courses){
		this.id=id;
		this.name=name;
		this.gpa=gpa;
		this.courses=[];
	}
toString() { 
        return this.id +" " +this.name + "  "+this.gpa + this.courses ;
    }

}


class Course{
	constructor(name,time,date,rooms){
		this.name=name;
		this.time=time;
		this.date=date;
		this.rooms=[];

	}
	toString() { 
        return this.name +" " +this.time +" " + this.date ;
    }
}

function parseStudent(line) {
    let b = line.split("\t");
    let id = b[0], name = b[1], gpa = b[2];
      let list = [];
    let yeni = new Student(id,name,gpa);
  
    for (let i=3; i<b.length; i++) {
        yeni.courses.push(b[i]);
    }
    return yeni;
}

function parseCourse(line) {
    let b = line.split("\t");
    let name = b[0]+b[1],time=b[2], date = b[3];
      let list = [];
    let yeni = new Course(name,time,date,list);
  
    for (let i=3; i<b.length; i++) {
        yeni.rooms.push(b[i]);
    }
    return yeni;
}




function  report(msg, id, list) {
    out.innerHTML += "<br>"; msg += " ";
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


class Database{
	constructor(stu,crse){
		this.stu =stu;
		this.crse = crse;
        this.stuMap =stuMap;
        this.crsMap = crsMap;
	}
	 
	 readStdData(file) {
    console.log("readData "+file);
    fetch(url+file)
        .then(r => r.text(),report)
        .then(this.addStudents,report);

}
     readCrsData(file) {
    console.log("readData "+file);
    fetch(url+file)
        .then(r => r.text(),report)
        .then(this.addCourse,report);

}


 findBest() {
    
    var iterator1 = stuMap.values();
    let b = iterator1.next().value;
   
    for (let std of iterator1) 
        if (std.gpa > b.gpa) b = std;
    report("Best: "+b.name, b.id);
}


  addStudents(txt) {
    let msg = txt.length+" chars, ";
    let a = txt.split("\n");
    msg += a.length+" lines, ";
    for (let s of a) {     
      //let std = new Student(std=>parseStudent(s)).toString();
     
    
    let std = parseStudent(s);
    stuMap.set(std.id,std);
    arr.push(std.id)
     
    //console.log(std.id+" "+std);
    }
    let aa=report(msg + stuMap.size+" students");
    console.log("student eklendi");

}
  addCourse(txt) {
    let msg = txt.length+" chars, ";
    let a = txt.split("\n");
    msg += a.length+" lines, ";
    for (let s of a) {     
      //let std = new Student(std=>parseStudent(s)).toString();
      let crs = parseCourse(s);
      crsMap.set(crs.name,crs);
    //console.log(crs.name+" "+crs);
    }
    let aa=report(msg + crsMap.size+" course");
    console.log("course eklendi");

}

 
 showStd(id) {      
let list =[]; 
//report(stuMap.get(id));
//let b = iterator1.next().value;
    for (let [key,value] of stuMap) {        
        if (key == id) {
            let a=value;
            list.push(a.name+a.courses);
        }

        }
  report(list);
}


studentsIn(code) {
    var list =[];
    code = code.toUpperCase();
    //var iterator1 = stuMap.values();
    //let b = iterator1.next().value;
    for (let [key,value] of stuMap) {
        let a = value.courses
        for(let ders of a){
            if(code == ders){
                list.push(value.id+" "+ value.name)
            }
        }

        }

         report(code+": ",list.length+" students \n");     
     report(list);        
}

 randomStd() {
  let items = Array.from(stuMap.keys());
  let value = Array.from(stuMap.keys());
    let x =items[Math.floor(Math.random() * items.length)];  
    console.log(x);

    report("Random  :" + stuMap.get(x));
   // let b = stuMap.get(ab);
//report("Random: "+stuMap.get(i));


    //return keys[Math.floor(Math.random()*keys.length)];
//let items = Array.from(stuMap);
//return items[Math.floor(Math.random() * items.length)];
    return x;
}
 AboveGpa(value) {      
var iterator1 = stuMap.values();
    let b = iterator1.next().value;
   var sayac =0;
    for (let std of iterator1) 
        if (std.gpa >=value ) 
           sayac = sayac +1; 
    report("Adet: "+sayac);
 
}
 givenRoom(cod) { 
 cod = cod.toUpperCase();
var adet=0;
for (let [key,value] of crsMap) {        
      let a = value.rooms
      for(let ders of a){
        if(cod == ders){
            adet=adet+1;
        }

      }

        }
 report("adet :"+adet);
}




}