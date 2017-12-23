import React from 'react'
import {Col, Card, CardHeader, CardText, CardBody, CardSubtitle, Button, CardTitle, CardFooter} from 'reactstrap'

const IdeaComponent = ({idea, enableEdit, deleteIdea}) =>
      <Card body color="info" className="card-pull-down">
        <CardHeader tag="h3"> Featured</CardHeader>
          <CardBody>
            <CardTitle>Special Title Treatment</CardTitle>
            <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
            <Button color="primary">Go somewhere</Button>
          </CardBody>
        <CardFooter className="text-muted">Footer</CardFooter>
      </Card>

export default IdeaComponent
