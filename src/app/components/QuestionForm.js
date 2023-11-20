'use client'
import {CSS} from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'
import { useState } from 'react'
const QuestionForm = ({index, addDiv,handleClick, options, handleSelect, showOptions, handleDelete}) => {

  const [question, setQuestion] = useState({query:""})
  const [qList, setQList] = useState([])
  const [showText, setShowText] = useState(true)

  
   const { attributes, 
            listeners, 
            setNodeRef,
            isDragging, 
            transform, 
            transition 
          } = useSortable({id: addDiv[index].id,
                           data: {
                            type: "Question"
                           }})

    const style = { transform: CSS.Transform.toString(transform),
                    transition
                  }

    if(isDragging){
      return <div ref={setNodeRef} 
                  style={style}
                  className="w-5/6 h-3/4 p-4 m-2 bg-slate-300 touch-none opacity-60 border-2 border-rose-700 rounded-xl text-sm dark:text-slate-800"
                  ></div>
    }

  
 //For handling text in question fields
    function handleQuestion(e){
      setQuestion({query: e.target.value})     
}

let {query} = question
 //Get Question
 const getQuestion = (e) => {
  if(e.key === "Enter"){
  qList.push({query})
 console.log("Question List:", qList)
  setShowText(false)
  } 
   }


   return (
    <div ref= {setNodeRef} 
        style= {style}
        {...attributes}
        {...listeners} 
        className="w-5/6"
    >
      
      
    <div 
         className="w-full p-4 m-2 bg-slate-300 hover:bg-slate-400 hover:border-2 hover:border-rose-600 rounded-xl text-sm dark:text-slate-800 touch-none"
         >
        <div className="sm:flex sm:flex-col"> 
        <div className="flex flex-row justify-end hover:text-red-600 hover:text-bold">
        <button type="button" onClick={() => handleDelete(index)}>x</button>
        </div>
        <label htmlFor="question" className="font-serif">Question:  </label>
        <input className="rounded-lg w-1/2 mt-2 sm:w-4/5 p-2"  
               type="text" 
               name="question"  
               placeholder= {`Question ${index+1}`}
               value={question.query}
               onChange={handleQuestion}
               onKeyDown={getQuestion}
               ></input>
               {showText && (
               <p className="text-xs italic pt-2 text-red-600">**Press Enter to lock your question**</p>)}
          </div>
          <div className="flex space-around mt-4 sm:flex-col">
        <label className="mt-3 font-serif" htmlFor="data-type">Answer Type:  </label>
        <select className="h-8 sm:w-20 p-2 m-2" name="data-type" id="data-type" onChange={handleSelect}>
            {options.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
    
            ))}
        </select>
        {showOptions && (
        <div>
          <h3 className="font-serif">Options: </h3>
          <input className="rounded sm:w-3/4" type='text' name='options'/>
        </div>
        )}
                   
        {addDiv.length-1 === index &&
        (<button type='button' 
                  className="bg-slate-800 m-5 w-40 rounded-lg text-white text-sm sm:text-center hover:border-2 hover:border-rose-600" 
                  onClick={handleClick}
         >Add Questions</button>)}
        </div>
        </div>
        </div>
  )
}

export default QuestionForm