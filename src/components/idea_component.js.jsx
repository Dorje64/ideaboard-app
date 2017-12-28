import React from 'react';
import {Row,Col, Card, CardHeader, CardText, CardBody, CardFooter} from 'reactstrap';
import DateTimeHelper from '../helpers/date_time_helper.js'

const IdeaComponent = ({idea, enableEdit, deleteIdea}) =>{
    let dateTime = new DateTimeHelper(idea.created_at);

    return(
      <Card className="card-pull-down">
        <CardHeader className="card-header-fixed">
            <Row>
              <Col md={9} tag="h6" >
                {idea.title}
              </Col>
              <Col md={3} >
                <Row>
                    <span className="col-md-6 fa fa-pencil" aria-hidden="true" onClick= {() => enableEdit(idea.id)} />
                    <span className="col-md-6 fa fa-trash" aria-hidden="true" onClick= {() => deleteIdea(idea.id)} />
                </Row>
              </Col>
            </Row>
        </CardHeader>
          <CardBody className="card-body-fixed-height">
            <CardText>{idea.body}</CardText>
          </CardBody>
        <CardFooter className="text-muted">{dateTime.timeAgo()}</CardFooter>
      </Card>
    )
}
export default IdeaComponent
