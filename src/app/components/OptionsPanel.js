import { useState } from 'react'

const OptionsPanel = ({updateTagList}) => {

    const [optionInput, setOptionInput] = useState("")
    const [tags, setTags] = useState([])

    
//Handle the option input field
const handleOptions = (e) => {
    const optionValue = e.target.value
    setOptionInput(optionValue)
   }
   
   //Handle the tags
   const handleTags = (e) => {
     const { key } = e
     const trimmedInput = optionInput.trim()
   
     if((key === 'Enter' || key=== ',') && trimmedInput.length && !tags.includes(trimmedInput)){
       e.preventDefault()
       setTags(prev => [...prev, trimmedInput])
       getTagList()
       setOptionInput(' ')
     }
     
   }
   
   //Delete a tag
   const deleteTag = (index) => {
   setTags(prev=> prev.filter((tag, i) => i !== index))
    }

    const getTagList= () => {
      updateTagList(optionInput)
    }


  return (
    <div className="flex flex-wrap mt-4">
          
    <label htmlFor="options" className="mt-3  text-slate-700 font-semibold">Options:  </label>
    
    <input 
          className="rounded-xl w-4/5 mt-2 mx-2 font-bold sm:w-full sm:text-xs p-2 mb-4 border-2 border-slate-400 dark:bg-slate-600 dark:text-white focus:outline-none focus:ring focus:ring-slate-600" 
          type='text' 
          name='options' 
          placeholder='Press Enter/Comma for next option'
          onKeyDown={handleTags}
          onChange={handleOptions}/>
    {tags.map((tag,index) => <div key={tag} className="bg-slate-800 flex w-auto p-4 justify-around pt-0.5 h-6 rounded-xl ml-1 mt-2 text-white text-center sm:text-xs">{tag}
    <button className="pb-3 pl-3" onClick={()=> deleteTag(index)}>x</button>
    </div>)}
  </div>
  )
}

export default OptionsPanel