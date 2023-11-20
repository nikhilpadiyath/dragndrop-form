'use client'
import {CSS} from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'
import { useState } from 'react'
import { Roboto } from 'next/font/google'
 
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

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
        className="w-7/8"
    >
      
      
    <div 
         className="w-full p-4 border-2 border-slate-400 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 hover:border-2 hover:border-rose-600 hover:rounded-xl text-sm dark:text-white touch-none"
         >
        <div className="sm:flex sm:flex-col"> 
        <div className="flex flex-row justify-end dark:text-white hover:text-red-600 hover:text-bold">
        <button type="button" onClick={() => handleDelete(index)}>x</button>
        </div>
        <label htmlFor="question" >Question:  </label>
        <input className="rounded w-1/2 mt-2 sm:w-4/5 p-2 border-2 border-slate-400 dark:bg-slate-600 dark:text-white focus:outline-none focus:ring focus:ring-slate-600"  
               type="text" 
               name="question"  
               placeholder= {`Question ${index+1}`}
               value={question.query}
               onChange={handleQuestion}
               onKeyDown={getQuestion}
               ></input> 
               {showText && (
               <p className="text-xs italic pt-2 dark: text-white">**Press Enter to lock your question**</p>)}
          </div>
          <div className="flex space-around mt-4 sm:flex-col">
        <label className="mt-3" htmlFor="data-type">Answer Type:  </label>
        <select className="h-8 ml-2 mt-4 sm:w-50 text-xs border-2 border-slate-400 dark:border-2 dark:border-slate-400 dark:bg-slate-600 dark:text-white rounded-xl w-40 focus:outline-none focus:ring focus:ring-slate-600" name="data-type" id="data-type" onChange={handleSelect}>
            {options.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
    
            ))}
        </select>
        {showOptions && (
        <div className="ml-6 sm:ml-0">
          <h3 className="mt-3">Options: </h3>
          <input className="rounded sm:w-7/8 border-2 border-slate-400 dark:border-2 dark:border-slate-300 dark:bg-slate-600 focus:outline-none focus:ring focus:ring-slate-600" type='text' name='options'/>
        </div>
        )}
        </div>
        </div>  
        {addDiv.length-1 === index &&
        (
        <div className="flex justify-center w-full p-4  h-15 dark:border-2 dark:border-slate-400 bg-slate-400 dark:bg-slate-800 hover:bg-slate-900 hover:border-2 hover:border-rose-600 hover:rounded-xl text-sm dark:text-white touch-none"
         >    
       <button type='button' 
                  className="bg-slate-600 rounded-xl h-10 w-40  text-bold text-white text-sm sm:text-center hover:border-2 hover:border-rose-600" 
                  onClick={handleClick}
         >Add Questions</button>
        </div> )}
        
        </div>
  )
}

export default QuestionForm