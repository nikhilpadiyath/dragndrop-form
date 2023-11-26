'use client'
import { useState } from 'react'
import QuestionForm from './components/QuestionForm'
import { DndContext,
        DragOverlay,
        MouseSensor,
        TouchSensor,
        useSensor,
        useSensors,} from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { createPortal } from 'react-dom'
import QuestionOverview from './components/QuestionsOverview'
 

export default function Home() {

    const [formData, setFormData] = useState({
      name: '',
      email: '',
    })
    
    const [darkMode, setDarkMode] = useState(false)
    const [addDiv, setAddDiv] = useState([{divs:"", id:100}])
    const [activeDiv, setActiveDiv] = useState(null)
    const [showDiv, setShowDiv] = useState(false)
    const [qList, setQList] = useState([])
    const [hidePanel, setHidePanel] = useState(false)
    

    
    const {name,email} = formData;

    const sensors = useSensors( useSensor(MouseSensor,{
      // Require the mouse to move by 10 pixels before activating
      activationConstraint: {
        distance: 10,
      },}),
      useSensor(TouchSensor,{
        // Require the mouse to move by 10 pixels before activating
        activationConstraint: {
          delay: 250,
          tolerance: 5,
        },})
    )

    

  const options = [
    {label:"Text", value: 1},
    {label:"Checkbox", value: 2},
    {label:"Single-select", value: 3},
    {label:"Multiple-select",value: 4}
  ]


    //For warning in console
    const myId = 1000

    //For handling name and email fields
    function handleText(e){
      const value = e.target.value
      setFormData({
        ...formData,
        [e.target.name]: value
      })
    }

     //Get Question
  const updateQuestionList = ({query, optionTags, dropDown}) => {
    let newArray = [...qList, {query, optionTags, dropDown}]
    setQList(newArray);   
    console.log('Question object',qList)
  }


    //To show the question panel
    function handleFirst(){
        setShowDiv(true)
        
        if(addDiv.length === 0){
          setShowDiv(false)
          setAddDiv([...addDiv, {divs:"", id:Math.floor(Math.random() * 100)}])  
        }
    }

  const handleDelete =(index) => {
    console.log(index)
    let currentId = addDiv[index].id
    console.log(currentId)
    const newList = addDiv.filter(item => item.id !== currentId)
   setAddDiv(newList)
   if(newList.length === 0){
    setShowDiv(false)
   }else{
    setShowDiv(true)
   }
  }


    //*.........Drag and Drop functions............*

     function handleDragStart(e){
      console.log(e)
      if(e.active.data.current?.type === "Question"){
        setActiveDiv(e.active.data.current.column)
        return
      }
    }

    function handleDragEnd(e){
      if(e.active.id === e.over?.id) return

      if(e.active.data.current?.sortable.containerId !== e.over?.data.current?.sortable.containerId) return

      setAddDiv((items) => {
        const oldIdx = e.active.data.current.sortable.index
        const newIdx = e.over?.data.current?.sortable.index
        console.log('Index:', oldIdx, newIdx)
        return arrayMove(items, oldIdx, newIdx)
        
    })
    
    }

  return (

    <DndContext
          onDragEnd = { handleDragEnd }
          onDragStart={handleDragStart}
          sensors={sensors}
          id={myId}
          >
    <main className= {darkMode ? "dark" : ""}>
    <div className={hidePanel ? "hidden" : "flex min-h-screen flex-col items-center p-10 bg-slate-300  text-black dark:text-white dark:bg-slate-900"}>
       <div className="flex flex-col items-center">
          <button type="button" className="bg-slate-800 p-2 rounded-xl mb-6 sm:mb-3 mt-3 sm:mt-1 sm:text-sm sm:h-8  text-white" onClick={()=> setDarkMode(!darkMode)}>Dark/Light Mode</button>
          <h1 className="text-4xl sm:text-3xl pb-6 sm:pb-3 font-bold text-green-700">Samskara</h1>
          <h1 className="text-2xl sm:text-xl pb-6 sm:pb-3 font-bold dark:text-white ">General Queries</h1>
        <div className="flex">
        <div className="p-2">
        <label htmlFor="name" className="sm:text-sm">Admin Name:  </label>
        <input className="rounded-lg w-full p-2 sm:h-8 sm:text-sm text-slate-700 dark:text-slate-200 font-semibold"  
               type="text" 
               name="name"  
               placeholder="Enter your name"
               value={name}
               onChange={handleText}
               required
               />
        </div>
        <div className="p-2 w-500">
        <label htmlFor="email" className="sm:text-sm">Admin Email:  </label>
        <input className="rounded-lg w-full p-2 sm:h-8 sm:text-sm text-slate-700 dark:text-slate-200 font-semibold" 
               type="email" 
               name="email"  
               placeholder="Enter your email"
               value={email}
               onChange={handleText}
               required
               />
        </div>
        </div>
       </div>

            <div className="w-5/6 flex flex-col items-center">
      <p className="p-2 m-2 text-lg text-center sm:text-sm">Feel free to add some additional questions to our participants!!!</p>
      
      <button onClick={handleFirst} className={showDiv ? "hidden" : "bg-slate-800 text-white sm:text-sm h-1/4 sm:h-8 w-1/3 sm:w-1/2 rounded-xl"}>Add your questions</button>

      <SortableContext items={addDiv} strategy={verticalListSortingStrategy}>
      {showDiv && (
      <div className="min-h-full  w-full">
      {addDiv.map((singleDiv, index)=> 
       ( 
       
       <QuestionForm key={addDiv[index].id}  
                     index={index} 
                     addDiv={addDiv}
                     qList={qList}
                     setAddDiv={setAddDiv}
                     options= {options}
                     handleDelete={handleDelete}
                     setHidePanel ={setHidePanel}
                     updateQuestionList = {(query) => updateQuestionList(query)}
                     updateValue = {(value) => updateValue(value)}
       />
      
       )
       )}
       </div>
       )}
       </SortableContext> 
       </div>
      
   
      </div>
      <div className={hidePanel ? "": "hidden"}>
        <QuestionOverview name={name} 
                          email={email} 
                          addDiv={addDiv}
                          darkMode={darkMode} 
                          qList = {qList}
                          hidePanel={hidePanel}
                          setHidePanel= {setHidePanel}
                          />
      </div>
      </main>
     {/*} {createPortal(
        <DragOverlay>
          {activeDiv && (
            <QuestionForm />
          )}
        </DragOverlay>,
        document.body
          )}*/}
      </DndContext>
    
  )
}
