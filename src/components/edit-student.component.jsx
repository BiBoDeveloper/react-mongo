// import React, { Component } from 'react'
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
// import axios from 'axios'

// export default class editStudentComponent extends Component {

//   constructor(props) {
//       super(props);

//       this.state = {
//         name: '',
//         email: '',
//         rollno: ''
//       };
//   }

//   componentDidMount() {
//     console.log('Student ID:', this.props);
//     const studentId = this.props.match.params.id;

//     axios.get(`https://localhost:4000/students/edit-student/${studentId}`)
//     .then(res => {
//       console.log('Data from server:', res.data);
//       this.setState({
//         name: res.data.name,
//         email: res.data.email,
//         rollno: res.data.rollno
//       });
//     })
//     .catch(err => {
//       console.log('Error Get Data', err);
//     });
//   }

//   onChangeStudentName = (e) => {
//     this.setState({ name: e.target.value })
//   };

//   onChangeStudentEmail = (e) => {
//     this.setState({ email: e.target.value })
//   };

//   onChangeStudentRollno = (e) => {
//     this.setState({ rollno: e.target.value })
//   };

//   onSubmit = (e) => {
//     e.preventDefault();

//     const updatedStudent  = {
//       name : this.state.name,
//       email : this.state.email,
//       rollno : this.state.rollno,
//     };

//     axios.put('http://localhost:4000/students/update-student', updatedStudent)
//     .then(res => {
//        console.log(res.data);
//        console.log('Student Successfully Updated');
//     })
//     .catch(error => {
//       console.log(error);
//     });

//     //Redirect to student list
//     this.props.history.push('/student-list')
//   };



//   render() {
//     return (
//       <div className="form-wrapper mt-5">
//           <h1>Update Student</h1>
//           <Form onSubmit={this.onSubmit}>
//             <Form.Group>
//               <Form.Label>Name</Form.Label>
//               <Form.Control type="text" value={this.state.name} onChange={this.onChangeStudentName} />
//             </Form.Group>
//             <Form.Group>
//               <Form.Label>Email</Form.Label>
//               <Form.Control type="email" value={this.state.email} onChange={this.onChangeStudentEmail} />
//             </Form.Group>
//             <Form.Group>
//               <Form.Label>Roll</Form.Label>
//               <Form.Control type="text" value={this.state.rollno} onChange={this.onChangeStudentRollno}/>
//             </Form.Group>

//             <Button className="mt-3" variant="success" size="lg" block="block" type="submit">
//                 Update Student
//             </Button>
//           </Form>
//       </div>
//     )
//   }
// }


import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditStudentComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: '',
    email: '',
    rollno: '',
  });

  useEffect(() => {
    axios.get(`http://localhost:4000/students/edit-student/${id}`)
      .then(res => {
        setStudent({
          name: res.data.name,
          email: res.data.email,
          rollno: res.data.rollno,
        });
      })
      .catch(err => {
        console.log('Error fetching data:', err);
      });
  }, [id]);

  const onChangeStudentName = e => {
    setStudent({ ...student, name: e.target.value });
  };

  const onChangeStudentEmail = e => {
    setStudent({ ...student, email: e.target.value });
  };

  const onChangeStudentRollno = e => {
    setStudent({ ...student, rollno: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();

    const updatedStudent = {
      name: student.name,
      email: student.email,
      rollno: student.rollno,
    };

    console.log('Update Student::',updatedStudent);

    axios.put(`http://localhost:4000/students/update-student/${id}`, updatedStudent)
      .then(res => {
        console.log('Student Successfully Updated:', res.data);
        // Redirect to student list or handle as needed
        navigate('/StudentList');
      })
      .catch(error => {
        console.log('Error updating student:', error);
      });
  };

  return (
    <div className="form-wrapper mt-5">
      <h1>Update Student</h1>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={student.name} onChange={onChangeStudentName} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={student.email} onChange={onChangeStudentEmail} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Roll</Form.Label>
          <Form.Control type="text" value={student.rollno} onChange={onChangeStudentRollno} />
        </Form.Group>

        <Button className="mt-3" variant="success" size="lg" block="block" type="submit">
          Update Student
        </Button>
      </Form>
    </div>
  );
};

export default EditStudentComponent;