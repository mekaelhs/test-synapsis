import { useState, useEffect } from "react";
import { Button, Form, Grid, Loader} from "semantic-ui-react";
import { useRouter } from "next/router";

const CreateTask = () => {
  const [newTask, setNewTask] = useState({
    title: "",
    // description: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: 0,
    address: ""
  });

  const { title, description, email, firstName, lastName, phone, address } = newTask;
  const { push, query } = useRouter();
  const [ isSubmit, setIsSubmit ] = useState(false);
  const [ errors, setErrors ] = useState({});

  const getTask = async () => {
    const response = await fetch(`http://localhost:3000/api/tasks/${query.id}`);
    const data = await response.json();
    setNewTask({ 
      title: data.title, 
      // description: data.description, 
      email: data.email, 
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      address: data.address,
    })
  }

  useEffect(() => {
    if (query.id) getTask();
  }, [query.id]);

  const validate = () => {
    let errors = {};
    if (!title) {
      errors.title = "Title is Required"
    }
    // if (!description) {
    //   errors.description = "Description is Required"
    // }
    if (!email) {
      errors.email = "Email is Required"
    }
    if (!firstName) {
      errors.firstName = "First Name is Required"
    }
    if (!lastName) {
      errors.lastName = "Last Name is Required"
    }
    if (!phone) {
      errors.phone = "Phone is Required"
    }
    if (!address) {
      errors.address = "Address is Required"
    }
    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = validate();

    if (Object.keys(errors).length) return setErrors(errors);
    setIsSubmit(true);
    if (query.id) {
      await updateTask();
    } else {
      await createTask();
    }
    await push("/");
  };

  const updateTask = async () => {
    try {
      await fetch(`http://localhost:3000/api/tasks/${query.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newTask)
      });
    } catch (error) {
      console.log(error);
    }
    console.log(newTask);
  }

  const createTask = async () => {
    try {
      await fetch(" http://localhost:3000/api/tasks ", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newTask),
      })
    } catch (error) {
      console.log(error);
    }
    console.log(newTask);
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setNewTask({...newTask, [name]: value})
  };

  return (
    <Grid 
      centered 
      verticalAlign="middle" 
      columns="3" 
      style={{height: "80vh"}}
    >
      <Grid.Row>
        <Grid.Column textAlign="center">
          <div>
            <h1>{query.id ? "Update Data" : "Create Data"} </h1>
            <div>
              {isSubmit ? (<Loader active inline="centered" />) : (
                <Form onSubmit={handleSubmit}>
                  <Form.Input 
                    error={
                      errors.title ? {content : "Please enter a title" } : null
                    }
                    label="Title" 
                    placeholder="Enter Title" 
                    name="title" 
                    onChange={handleChange}
                    value={title}
                    maxLength="10"
                    minLength="1"
                    autoFocus
                  />
                    <Form.Input
                      error={
                        errors.firstName ? {content : "Please enter a first name" } : null
                      } 
                      label="First Name" 
                      placeholder="Enter First Name" 
                      name="firstName" 
                      onChange={handleChange}
                      value={firstName}
                      maxLength="10"
                      minLength="1"
                      autoFocus
                    />
                    <Form.Input
                      error={
                        errors.lastName ? {content : "Please enter a last name" } : null
                      } 
                      label="Last Name" 
                      placeholder="Enter Last Name" 
                      name="lastName" 
                      onChange={handleChange}
                      value={lastName}
                      maxLength="10"
                      minLength="1"
                      autoFocus
                    />
                    <Form.Input 
                      error={
                        errors.email ? {content : "Please enter an email" } : null
                      }
                      label="Email" 
                      placeholder="Enter email" 
                      name="email" 
                      onChange={handleChange}
                      value={email}
                      autoFocus
                    />
                  <Form.Input 
                    error={
                      errors.phone ? {content : "Please enter phone number" } : null
                    }
                    label="Phone" 
                    placeholder="Enter Phone" 
                    name="phone" 
                    onChange={handleChange}
                    value={phone}
                    maxLength="15"
                    minLength="7"
                    autoFocus
                  />
                  <Form.TextArea 
                    error={
                      errors.address ? {content : "Please enter address" } : null
                    }
                    label="Address" 
                    placeholder="Enter Address" 
                    name="address" 
                    onChange={handleChange}
                    value={address}
                    autoFocus
                  />
                  {/* <Form.TextArea 
                    error={
                      errors.description ? {content : "Please enter description" } : null
                    }
                    label="Description" 
                    placeholder="Enter Description" 
                    name="description" 
                    onChange={handleChange}
                    value={description}
                    autoFocus
                  /> */}
                  <Button type="submit" primary>
                    {query.id ? "Update" : "Submit"}
                  </Button>
                </Form>
              )}
            </div>
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default CreateTask;