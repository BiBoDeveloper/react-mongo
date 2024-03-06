import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios';


export default class createStudentComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      name: '',
      email: '',
      rollno: ''
    }
  }

  onChangeStudentName = (e) => {
    this.setState({ name: e.target.value })
  };

  onChangeStudentEmail = (e) => {
    this.setState({ email: e.target.value })
  };

  onChangeStudentRollno = (e) => {
    this.setState({ rollno: e.target.value })
  };

  onSubmit = (e) => {
    e.preventDefault();

    const studentObject = {
      name : this.state.name,
      email : this.state.email,
      rollno : this.state.rollno,
    };

    axios.post('http://localhost:4000/students/create-student', studentObject)
    .then(res => {
       console.log(res.data)
       window.location.href = '/StudentList';
    })
    .catch(error => {
      console.log(error);
    })

    this.setState({
      name: '',
      email: '',
      rollno: ''
    });

  };
  render() {
    return (
      <div className="form-wrapper mt-5">
          <h1>Create Student</h1>
          <Form onSubmit={this.onSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={this.state.name} onChange={this.onChangeStudentName} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={this.state.email} onChange={this.onChangeStudentEmail} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Roll</Form.Label>
              <Form.Control type="text" value={this.state.rollno} onChange={this.onChangeStudentRollno}/>
            </Form.Group>

            <Button className="mt-3" variant="success" size="lg" block="block" type="submit">
                Create Student
            </Button>
          </Form>
      </div>
    )
  }
}
