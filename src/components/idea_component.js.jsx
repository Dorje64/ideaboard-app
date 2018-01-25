import React from 'react';
import {Row,Col, Card, CardHeader, CardText, CardBody, CardFooter} from 'reactstrap';
import DateTimeHelper from '../helpers/date_time_helper.js'

const IdeaComponent = ({idea, enableEdit, deleteIdea, shareGist}) =>{
    let dateTime = new DateTimeHelper(idea.created_at);

    return(
      <Card className="card-pull-down">
        <CardHeader className="card-header-fixed">
            <Row>
              <Col md={7} tag="h6" >
                {idea.title}
              </Col>
              <Col md={5} >
                <Row>
                    <span className="col-md-4 fa fa-pencil" aria-hidden="true" onClick= {() => enableEdit(idea.id)} />
                    <span className="col-md-4 fa fa-trash" aria-hidden="true" onClick= {() => deleteIdea(idea.id)} />
                    <span className="col-md-4 fa fa-share-alt" arie-hidden="true" onClick={() => shareGist(idea)} />
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
