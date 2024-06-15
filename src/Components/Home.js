import React, { useState, useEffect } from 'react';

const Home = () => {
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState({
    id: null,
    name: '',
    surname: '',
    mobile: '',
    email: '',
    age: '',
    education: ''
  });


  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
    setStudents(storedStudents);
  }, []);

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!student.name || !student.surname || !student.mobile || !student.email || !student.age || !student.education) {
      alert('Please fill in all fields');
      return;
    }

    if (isEditing) {
      updateStudent(student.id, student);
    } else {
      addStudent({ ...student, id: Date.now() });
    }

    resetForm();
  };

  const resetForm = () => {
    setStudent({
      id: null,
      name: '',
      surname: '',
      mobile: '',
      email: '',
      age: '',
      education: ''
    });
    setIsEditing(false);
  };

  const addStudent = (newStudent) => {
    setStudents([...students, newStudent]);
  };

  const deleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  const updateStudent = (id, updatedStudent) => {
    setStudents(students.map((student) => (student.id === id ? updatedStudent : student)));
  };

  const handleEdit = (student) => {
    setIsEditing(true);
    setStudent(student);
  };

  return (
    <div className='todo-section'>
      <h1>Add Student </h1>
      <form onSubmit={handleSubmit}>

        <div className="input_group">
          <div className="input_box">
            <div className="name">Name</div>
            <input type="text" name="name" value={student.name} onChange={handleChange}  placeholder="Name"required/>
          </div>
          <div className="input_box">
            <div className="name">Surname</div>
            <input type="text" name="surname" value={student.surname} onChange={handleChange} placeholder="Surname" require />
          </div>
          <div className="input_box">
          <div className="name">Education</div>
          <input type="text" name="education" value={student.education} onChange={handleChange} placeholder="Education" require />
        </div>
        </div>
      
      <div className="input_group">
        <div className="input_box">
          <div className="name">Mobile</div>
          <input type="text" name="mobile" value={student.mobile} onChange={handleChange} placeholder="Mobile" required
        />
        </div>
        <div className="input_box">
          <div className="name">Email</div>
          <input type="email" name="email" value={student.email} onChange={handleChange} placeholder="Email" require />
        </div>
        <div className="input_box">
          <div className="name">Age</div>
          <input type="number" name="age" value={student.age} onChange={handleChange} placeholder="Age" require />
        </div>
      </div>

        <button type="submit" className='submit_btn'>{isEditing ? 'Update Student' : 'Add Student'}</button>
      </form>
      <h1>Student List</h1>
      <div className='student'>
        {students.map((student) => (
          <div className='card' key={student.id}>
              <div className="name">Name : {student.name} {student.surname}</div>
               <div className="edu">Education : {student.education}</div>
               <div className="age">Age : {student.age}</div>
               <div className="number">Number : {student.mobile}</div>
               <div className="email">Email : {student.email} </div>
            <button className='edit' onClick={() => handleEdit(student)}>Edit</button>
            <button className='delete' onClick={() => deleteStudent(student.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
