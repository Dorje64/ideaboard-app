import React from 'react'
import {Row,Col, Card, CardHeader, CardText, CardBody, CardFooter} from 'reactstrap'

const IdeaComponent = ({idea, enableEdit, deleteIdea}) =>
      <Card className="card-pull-down">
        <CardHeader className="card-header-fixed">
            <Row>
              <Col md={8} tag="h6" >
                {idea.title}
              </Col>
              <Col md={4} >
                    <span className="fa fa-trash" aria-hidden="true" onClick= {() => enableEdit(idea.id) } >Edt</span>
                                           |
                    <span className="fa fa-pencil-o" aria-hidden="true" onClick= {() => deleteIdea(idea.id)}>Dlt</span>
              </Col>
            </Row>
        </CardHeader>
          <CardBody className="card-body-fixed-height">
            <CardText>{idea.body}</CardText>
          </CardBody>
        <CardFooter className="text-muted">{idea.created_at}</CardFooter>
      </Card>

export default IdeaComponent
