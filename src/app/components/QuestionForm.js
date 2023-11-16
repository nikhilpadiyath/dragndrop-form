'use client'
import { useState } from 'react'
import {CSS} from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'

const QuestionForm = ({handleClick, addDiv, index, questions}) => {

    const [question, setQuestion] = useState('')

    const {id} = addDiv;

    const { attributes, 
            listeners, 
            setNodeRef, 
            transform, 
            transition 
          } = useSortable({id: addDiv[index].id,
                           data: {
                            type: "Question"
                           }})

    const style = { transform: CSS.Transform.toString(transform),
                    transition
                  }

    //For handling text in question fields
    function handleQuestion(e){
        setQuestion(e.target.value)
        questions.push(question)
     }

   return (
    <div ref= {setNodeRef} 
        style= {style}
        {...attributes}
        {...listeners} 
        className=" w-full"
    >
      
      
    <div 
         className="w-3/4 p-4 m-2 bg-slate-300 rounded-xl text-sm"
         >
          <p>{addDiv[index].id}</p>
        <div>
        <label htmlFor="question">Question:  </label>
        <input className="rounded-lg w-1/2"  
               type="text" 
               name="question"  
               placeholder="Enter your question"
               value={question}
               onChange={handleQuestion}
               ></input>
          </div>
          <div className="flex space-around mt-4">
        <label className="mt-3" htmlFor="data-type">Answer Type:  </label>
        <select className="h-8 p-2 m-2" name="data-type" id="data-type">
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="url">URL</option>
            <option value="single-select">Single Select</option>
            <option value="multiple-select">Multiple Select</option>
        </select>
        {addDiv.length-1 === index &&
        (<button className="bg-slate-800 m-5 w-40 rounded-lg text-white text-sm" onClick={handleClick}>Add Questions</button>)}
        </div>
        </div>
        </div>
  )
}

export default QuestionForm