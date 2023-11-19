'use client'
import {CSS} from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'
import { useState } from 'react'
const QuestionForm = ({index, addDiv,handleClick, options, handleSelect, getQuestion, showOptions, handleDelete}) => {

  const [question, setQuestion] = useState("")
  
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
                  className="w-5/6 h-3/4 p-4 m-2 bg-slate-300 opacity-60 border-2 border-rose-500 rounded-xl text-sm dark:text-slate-800"
                  ></div>
    }

  
 //For handling text in question fields
    function handleQuestion(e){
      setQuestion(e.target.value) 
      checkNumber(question)
      }


   return (
    <div ref= {setNodeRef} 
        style= {style}
        {...attributes}
        {...listeners} 
        className="w-5/6"
    >
      
      
    <div 
         className="w-full p-4 m-2 bg-slate-300 hover:bg-slate-400 rounded-xl text-sm dark:text-slate-800"
         >
        <div className="sm:flex sm:flex-col"> 
        <div className="flex flex-row justify-end text-lg hover:text-red-600 hover:text-bold">
        <button type="button" onClick={() => handleDelete(index)}>X</button>
        </div>
        <label htmlFor="question" className="font-serif">Question:  </label>
        <input className="rounded-lg w-1/2 mt-2 sm:w-4/5"  
               type="text" 
               name="question"  
               placeholder= {`Question ${addDiv[index].p}`}
               value={question}
               onChange={handleQuestion}
               ></input>
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
                  className="bg-slate-800 m-5 w-40 rounded-lg text-white text-sm sm:text-center" 
                  onClick={function(event){
                                        handleClick();
                                        getQuestion();
                                      }}
         >Add Questions</button>)}
        </div>
        </div>
        </div>
  )
}

export default QuestionForm