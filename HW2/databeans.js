class Course {
    constructor(code, time, date, rooms) {
        this.code = code;
        this.time = time;
        this.date = date;
        this.rooms = rooms;
    }

    toString () {
        return this.code + '';
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
        return this.id + '';
    }
}

class Database {
    constructor () {
        this.courses = new Map();
        this.students = new Map();
        this.rooms = new Map();
        this.readCourses();
        this.readStudents();
    }

    readCourses () {
        var url = "https://maeyler.github.io/JS/data/Courses.txt"
        fetch(url)
        .then(res => res.text())
        .then(res => [
            this.addCourses(res)
        ])
    }

    readStudents () {
        var url = "https://maeyler.github.io/JS/data/Students.txt"
        fetch(url)
        .then(res => res.text())
        .then(res => [
            this.addStudents(res)
        ])
    }

    addCourses(txt) {
        let msg = 'Courses: ' + txt.length + ' chars, ';
        let a = txt.split('\n');
        msg += a.length + ' lines';
        console.log(msg);

        //create course object
        const courseList = [];
            a.forEach(item => {
            let courseText = item.split('\t');
            const course = new Course (courseText[0], courseText[1], courseText[2], courseText.slice(3));
            courseList.push(course);
        });

        //add to courses map
        for (const courseListItem of courseList) {
            if(courseListItem.code !== '' || undefined) {
                this.courses.set(courseListItem.code, courseListItem)
            }
        }

        //find all rooms
        this.findAllRooms()
    }

    addStudents (txt) {
        let msg = 'Students: ' + txt.length + ' chars, ';
        let a = txt.split('\n');
        msg += a.length + ' lines';
        console.log(msg);

        //create student object
        const studentList = [];
        a.forEach(item => {
            let word = item.split('\t');
            const student = new Student (word[0], word[1], word[2],word.slice(3));
            studentList.push(student);
        });

        //add to students map
        studentList.forEach(value => {
            this.students.set(value.id,value);
        });
        document.getElementById("out").innerHTML += this.toString()
    }

    findAllRooms () {
        this.courses.forEach(course => {
            course.rooms.forEach(room => {
                if(this.rooms.get(room) == undefined) {
                    this.rooms.set(room, 1)
                }else{
                    this.rooms.set(room, this.rooms.get(room)+1)
                }
            })
        })
    }

    randomStudent () {
        const keys = Array.from(this.students.values())
        return keys[Math.trunc(keys.length * Math.random())];
    }

    findBestStudent(){
        let keys = this.students.keys();
        let bestGPA = 0;
        let bestStudent;
        for (let i of keys){
            let student = this.students.get(i);
            if (student.gpa > bestGPA){
                bestGPA = student.gpa;
                bestStudent = student;
            }
        }
        return bestStudent;
    }
    findStudentById(id){
        return this.students.get(id);
    }

    randomCourse () {
        const keys = Array.from(this.courses.keys())
        return this.courses.get(keys[Math.trunc(keys.length * Math.random())])
    }

    randomRoom () {
        const keys = Array.from(this.rooms.keys())
        return keys[Math.trunc(keys.length * Math.random())]
    }

    numberOfGivenGPA (gpa) {
        const students = [];
        this.students.forEach( item => {if (item.gpa > gpa){students.push(item)} });
        return students;
    }

    coursesTakenByStudent (student) {
        return student.courses
    }

    examSchedule (student) {
        for (let course of student.courses) {
            console.log(course.date +'\t'+ course.time +'\t'+ course.rooms)
        }
    }

    studentListGivenCourse (course) {
        const studentList = []
        this.students.forEach(student => {
            student.courses.forEach(a => {
                a.code === course.code ? studentList.push(student) : null
            })
        })
        return studentList
    }

    courseListGivenRoom (roomCode) {
        const courseList = []
        this.courses.forEach(course => {
            course.rooms.includes(roomCode) ? courseList.push(course) : null
        })
        return courseList
    }

    courseCountGivenRoom (roomCode) {
        return this.courseListGivenRoom(roomCode).length
    }

    toString () {
        return 'Courses: ' + this.courses.size + ' , Students: ' + this.students.size
    }
}