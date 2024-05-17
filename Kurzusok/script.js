const coursesUrl = "https://vvri.pythonanywhere.com/api/courses";
    const studentsUrl = "https://vvri.pythonanywhere.com/api/students";
    const coursesContainer = document.getElementById('courses');
    const addCourseForm = document.getElementById('addCourseForm');
    const assignStudentForm = document.getElementById('assignStudentForm');
    const courseSelect = document.getElementById('courseSelect');

    // Függvény az űrlap kezeléséhez
    async function handleFormSubmit(event) {
      event.preventDefault();
      
      const courseName = document.getElementById('courseName').value;

      try{
        const response = await fetch(coursesUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: courseName
        })
      })
      const data = await response.json())
        // Frissítjük a kurzusokat az új kurzussal
        fetchCourses();
        // Ürítjük az űrlapot
        addCourseForm.reset();
      )}
      catch(error){
        console.error('Error adding course:', error);
      }
    }
    

    // Függvény a kurzusok lekérdezéséhez és megjelenítéséhez
    async function fetchCourses() {
      fetch(coursesUrl)
        .then(response => response.json())
        .then(data => {
          // Frissítjük a kurzusok listáját az űrlaphoz
          updateCourseSelect(data);
          coursesContainer.innerHTML = '';
          data.forEach(course => {
            const courseDiv = document.createElement('div');
            courseDiv.classList.add('course');
            courseDiv.innerHTML = `
              <h2>${course.name}</h2>
              <p><strong>Course ID:</strong> ${course.id}</p>
              <p><strong>Students:</strong></p>
              <ul>
                ${course.students.map(student => `<li>${student.name} (ID: ${student.id})</li>`).join('')}
              </ul>
            `;
            coursesContainer.appendChild(courseDiv);
          });
        })
        .catch(error => {
          console.error('Error fetching courses:', error);
        });
    }

    // Függvény a kurzusok frissítéséhez a kiválasztó listában
    function updateCourseSelect(courses) {
      courseSelect.innerHTML = '';
      courses.forEach(course => {
        const option = document.createElement('option');
        option.text = course.name;
        option.value = course.id;
        courseSelect.add(option);
      });
    }

    // Függvény az új diák hozzárendeléséhez egy kurzushoz
    function assignStudent(event) {
      event.preventDefault();
      
      const courseId = courseSelect.value;
      const studentName = document.getElementById('studentName').value;

      fetch(studentsUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: studentName,
          course_id: courseId
        })
      })
      .then(response => response.json())
      .then(data => {
        // Frissítjük a kurzusokat az új diákkal
        fetchCourses();
        // Ürítjük az űrlapot
        assignStudentForm.reset();
      })
      .catch(error => {
        console.error('Error assigning student:', error);
      });
    }


    // Függvény a diák törléséhez név alapján
    function deleteStudentByName(event) {
      event.preventDefault();
      const deleteStudentName = document.getElementById('deleteStudentName').value;
    
      // Keresés a diákok között a megadott név alapján
      fetch(studentsUrl)
        .then(response => response.json())
        .then(data => {
          const studentToDelete = data.find(student => student.name === deleteStudentName);
          if (!studentToDelete) {
            console.error('A megadott névvel nem található diák.');
            return;
          }
        
          fetch(`${studentsUrl}/${studentToDelete.id}`, {
            method: 'DELETE'
          })
          .then(response => {
            if (response.ok) {
              // Sikeres törlés esetén frissítjük a kurzusokat
              fetchCourses();
              document.getElementById('deleteStudentByNameForm').reset();
            } else {
              throw new Error('Hiba történt a diák törlése közben.');
            }
          })
          .catch(error => {
            console.error('Hiba történt:', error);
          });
        })
        .catch(error => {
          console.error('Hiba történt a diákok lekérése közben:', error);
        });
    }

    // Űrlap eseménykezelője a diák törléséhez név alapján
    const deleteStudentByNameForm = document.getElementById('deleteStudentForm');
    deleteStudentByNameForm.addEventListener('submit', deleteStudentByName);



    // Űrlap eseménykezelője
    addCourseForm.addEventListener('submit', handleFormSubmit);
    assignStudentForm.addEventListener('submit', assignStudent);

    // Kurzusok lekérdezése és megjelenítése az oldal betöltésekor
    fetchCourses();
