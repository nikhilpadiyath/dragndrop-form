import {CSS} from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'
import { useState } from 'react'
import OptionsPanel from './OptionsPanel'
 
const QuestionForm = ({index, addDiv,handleClick, options, handleDelete, updateQuestionList}) => {

  const [question, setQuestion] = useState({query:""})
  const [value,setValue] = useState('')
  const [showOptions, setShowOptions] = useState(false)

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

//Send each question to parent callback
let {query} = question
const getQuestion =()=> {
    updateQuestionList(query);
}

//For handling dropdown list
function handleSelect(e,index){
   setValue(e.target.value)
  
      if(e.target.value === '3' || e.target.value === '4' || e.target.value === '5'){
        setShowOptions(true)
      } else {
        setShowOptions(false)
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
         className="w-full p-4 border-2 border-slate-400 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 hover:border-2 hover:border-slate-600 hover:rounded-xl text-sm dark:text-white touch-none"
         >
        <div className="sm:flex sm:flex-col"> 
        <div className="flex flex-row justify-end dark:text-white hover:text-red-600 hover:text-bold">
        <button type="button" onClick={() => handleDelete(index)}>x</button>
        </div>
        <label htmlFor="question" className=" text-slate-700 font-semibold">Question:  </label>
        <input className="rounded-xl w-1/2 mt-2 sm:w-4/5 sm:text-xs p-2 font-bold border-2 border-slate-400 dark:bg-slate-600 dark:text-white focus:outline-none focus:ring focus:ring-slate-600"  
               type="text" 
               name="question"  
               placeholder= {`Question ${index+1}`}
               value={question.query}
               onChange={handleQuestion}
               
               ></input> 
               <button type="button" onClick={getQuestion} className="bg-slate-800 rounded-xl h-10 sm:h-6 w-20 ml-4 sm:mt-2 text-bold text-white text-sm sm:text-center hover:border-2 hover:ring-slate-600" >Save</button>
              </div>
          <div className="flex space-between mt-4 flex-col">
          <div>
        <label className="mt-3  text-slate-700  font-semibold" htmlFor="data-type">Answer Type:  </label>
        
        <select className="h-8 ml-2 mt-4 sm:w-50 text-xs border-2 border-slate-400 dark:border-2 dark:border-slate-400 dark:bg-slate-600 dark:text-white rounded-xl w-40 focus:outline-none focus:ring focus:ring-slate-600" name="data-type" id="data-type" onChange={handleSelect}>
            {options.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
    
            ))}
        </select>
        </div>
        {showOptions && (
        <OptionsPanel />
     
        )}
        </div>
        </div>  
        {addDiv.length-1 === index &&
        (
        <div className="flex justify-center w-full p-4  h-15 border-t-0 border-2 border-slate-400 dark:border-2 dark:border-slate-400 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 hover:border-2 hover:border-slate-600 hover:rounded-xl text-sm dark:text-white touch-none"
         >    
       <button type='button' 
                  className="bg-slate-800 rounded-xl h-10 w-40  text-bold text-white text-sm sm:text-center hover:border-2 hover:ring-slate-600" 
                  onClick={handleClick}
         >Add Questions</button>
        </div> )}
        </div>
  )
}

export default QuestionForm