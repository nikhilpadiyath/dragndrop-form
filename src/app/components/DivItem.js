'use client'
import { useSortable} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useState } from 'react'

const DivItem = (props) => {

    const {divList, handleClick} = props

    const [question, setQuestion] = useState('')

    const questions = []

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({id: props.title})

    const handleQuestion = (e,id) => {
        setQuestion(e.target.value)
        questions.push(question)
    }

  return (
    <div 
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={{
            transform: CSS.Transform.toString(transform),
            transition
        }}
        >
             <div 
         className="w-3/4 p-4 m-2 bg-slate-300 rounded-xl text-sm border-5 border-solid border-cyan-300"
         >
        <form>
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
    
        <label htmlFor="data-type" className="mt-3" >Answer Type:  </label>
        <select className="h-8 p-2 m-2" name="data-type" id="data-type">
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="url">URL</option>
            <option value="single-select">Single Select</option>
            <option value="multiple-select">Multiple Select</option>
        </select>
       
        <button className="bg-slate-800 m-5 w-40 rounded-lg text-white text-sm" onClick={handleClick}>Add Questions</button>
        
        </div>
        </form>
        </div>
        </div>
  )
}

export default DivItem