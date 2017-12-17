import React from 'react'

const IdeaComponent = ({idea, enableEdit}) =>
              <div className="tile" key={idea.id} >
                <h4>{idea.title}</h4>
                <p>{idea.body}</p>
                <p onClick= {enableEdit(idea.id)}> Edit </p>
              </div>

export default IdeaComponent
