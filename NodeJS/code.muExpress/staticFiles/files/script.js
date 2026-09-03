const num = prompt("Enter the number");

if(num > 10){
    alert(`The number ${num} is more then 10`);
}

else if(num == 10){
    alert(`The number ${num} is equal to 10`);
}
else if(num <= 0){ 
    alert(`The number ${num} must be greater than 0`);
}
else if(num < 10){
    alert("The number is " + num);
}
else if(isNaN(num)){
    alert(`The symbol ${num} is not a number`);
}