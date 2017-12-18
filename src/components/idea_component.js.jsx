import React from 'react'

const IdeaComponent = ({idea, enableEdit}) =>
              <div className="tile" key={idea.id} >
                <h4>{idea.title}</h4>
                <p>{idea.body}</p>
                <button onClick= {()=> {enableEdit(idea.id)} } > Edit </button>
              </div>

export default IdeaComponent
