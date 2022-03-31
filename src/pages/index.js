import { Button, Card, Container, Feed, Grid } from "semantic-ui-react";
import Link from "next/link";
import {useRouter} from "next/router";

export default function Home({ tasks = [] }) {
  const router = useRouter();

  if (tasks.length === 0) {
    return (
      <Grid centered verticalAlign="middle" columns="1" style={{height: "80vh"}}>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <h1>There are no data present. Please create a new one.</h1>
            <div>
              <Button primary onClick={() => router.push("/tasks/new")}>
                Create Data
              </Button>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
  return (
    <Container>
      <Card.Group itemsPerRow={3}>
        {tasks && tasks.map((task) => (
          <Card key={task._id}>
            <Card.Content>
              <Card.Header>
                <Link href={`/tasks/${task._id}`}>
                  <a>{task.title}</a>
                </Link>
              </Card.Header>
              <Card.Description>
              <p>First Name: {task.firstName}</p>
              <p>Last Name: {task.lastName}</p>
              <p>Email: {task.email}</p>
              <p>Phone: +62-{task.phone}</p>
              <p>Address: {task.address}</p>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <p style={{fontWeight: "1200"}}>ID: {task._id.slice(task._id.length - 5)}</p>
              <p style={{fontWeight: "1200"}}>Data Created: {task.createdAt.slice(0, 10)}</p>
              {/* <p>Created At: {task.createdAt}</p>
              <p>Updated At: {task.updatedAt}</p> */}
              <Button 
              size="mini" 
              color="blue"
              style={{width: "70px", textAlign: "center"}}
              onClick={() => router.push(`/tasks/${task._id}`)}
            > 
              View
            </Button>
            <Button 
              size="mini" 
              color="grey"
              style={{marginTop: "5px", width: "70px", textAlign: "center"}}
              onClick={() => router.push(`/tasks/${task._id}/edit`)}
            > 
              Edit
            </Button>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Container>
  )
}

export async function getServerSideProps() {
  const response = await fetch(" http://localhost:3000/api/tasks")
  const tasks = await response.json();

  return {
    props: {
      tasks,
    }
  }
}
