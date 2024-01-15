function push()
{
    let car = ['Ford', 'Mustang', 2022, 'blue'];

    let [brand, model, year, color] = car;

    console.log('Brand:', brand);
    console.log('Model:', model);
    console.log('Year:', year);
    console.log('Color:', color);


}

/*1-2 kérdés: A váltózónévnek nem feltétlenül kell megegyezni a tömb elemeinek nevével és beszédesnek hogy érthetőbb és 
átláthatóbb legyen a program. A sorrend számít mert a változók amelyik indexű pozíciót 
foglalják el az eredeti tömb ugyanazú indexű értékét fogják felvenni.*/


function pushh()
{
    let book = 
    {
        title: 'JavaScript: The Good Parts',
        author: 'Douglas Crockford',
        publicationYear: 2008,
        language: 'English'
    };
      
    let { title: bookTitle, author: bookAuthor, publicationYear, language} = book;
      
    console.log('Book Title:', bookTitle);
    console.log('Book Author:', bookAuthor);
    console.log('Publication Year:', publicationYear);
    console.log('Book Language:', language);
      
}

//Ugyanaz mint az előzöben, csak a sorrend mindegy.

function pushpush()
{
    function printStudentInfo(student) {
        const { name, age, grade, subjects } = student;
      
        console.log('Student Name:', name);
        console.log('Student Age:', age);
        console.log('Student Grade:', grade);
        console.log('Student Subjects:', subjects.join(', '));
      }
      
      let student = {
        name: 'John Doe',
        age: 20,
        grade: 'B',
        subjects: ['Math', 'English', 'History']
      };
      
      printStudentInfo(student);
      
}