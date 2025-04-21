// Define Objects 
const student = {
    fullName: "Abhijeet Shashikant Purohit",
    age: 42,
    isWorking: true,
    hobbies: ["Reading", "Travelling", "Coding"]
};

let text = document.getElementById("demo").innerHTML = "The student Full Name is " +  student.fullName + ". <br>" + "Student age is " + student.age + ". <br>" + "Student is working: " + student.isWorking + ". <br>" + "Student hobbies are: " + student.hobbies + ".";

const product = {
    name: "Laptop",
    rating: 4.5,
    price: 50000,
    offer: 10
};

console.log(product); 