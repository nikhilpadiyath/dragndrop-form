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

export default function Home() {

    const [formData, setFormData] = useState({
      name: '',
      email: '',
    })

    const [num,setNum] = useState(1)
    const [showOptions, setShowOptions] = useState(false)
    const [addDiv, setAddDiv] = useState([{divs:"", id:100, p: num, optionStatus: showOptions}])
    const [activeDiv, setActiveDiv] = useState(null)
    const [showDiv, setShowDiv] = useState(false)
    const [value,setValue] = useState('')

    
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
    {label:"Number", value: 2},
    {label:"Checkbox", value: 3},
    {label:"Single-select", value: 4},
    {label:"Multiple-select",value: 5}
  ]
  
  let qList = []
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
    const getQuestion = (data) => {
      qList.push(data)
      }

    //For handling dropdown list
   function handleSelect(e,index){
    setValue(e.target.value)

    if(e.target.value === '3' || e.target.value === '4' || e.target.value === '5'){
      setShowOptions(true)
    } else {
      setShowOptions(false)
    }
    console.log(addDiv)
  }

     //For creating new question fields
  function handleClick(){ 
    setNum(num+1)
   
    setAddDiv([...addDiv, {divs:"", id:Math.floor(Math.random() * 100),p: num+1, optionStatus:showOptions}])  
    }

    //To show the question panel
    function handleFirst(){
        setShowDiv(true)
    }

  const handleDelete =(index) => {
    console.log(index)
    let currentId = addDiv[index].id
    console.log(currentId)
    const newList = addDiv.filter(item => item.id !== currentId)
    //newList.splice(index,1)
    setAddDiv(newList)
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
    <div className="flex min-h-screen flex-col items-center p-10">
       <div className="flex flex-col items-center">
          <h1 className="text-4xl pb-6 font-bold text-green-700">Samskara</h1>
          <h1 className="text-2xl pb-6 font-bold ">Create a new Event</h1>
        <div className="flex">
        <div className="p-2">
        <label htmlFor="name">Name:  </label>
        <input className="rounded-lg w-full p-2"  
               type="text" 
               name="name"  
               placeholder="Enter your name"
               value={name}
               onChange={handleText}
               required
               />
        </div>
        <div className="p-2 w-500">
        <label htmlFor="email">Email:  </label>
        <input className="rounded-lg w-full p-2" 
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

            <div className=" w-full flex flex-col items-center">
      <p className="p-2 m-2 font-semibold font-serif text-center">Feel free to add some additional questions to our participants!!!</p>
      <button onClick={handleFirst} className={showDiv ? "hidden" : "bg-slate-800 text-white h-1/4 w-1/3 rounded-md"}>Add your questions</button>

      <SortableContext items={addDiv} strategy={verticalListSortingStrategy}>
      {showDiv && (
      <div className="min-h-full">
      {addDiv.map((singleDiv, index)=> 
       ( 
       
       <QuestionForm key={addDiv[index].id}  
                     index={index} 
                     addDiv={addDiv}
                     handleClick= {handleClick}
                     num= {num}
                     options= {options}
                     handleSelect = {handleSelect} 
                     value = {value}
                     getQuestion = {getQuestion}
                     showOptions = {showOptions}
                     handleDelete={handleDelete}
       />
      
       )
       )}
       </div>
       )}
       </SortableContext> 
       </div>
      </div>
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
