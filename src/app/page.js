'use client'
import { useState } from 'react'
import QuestionForm from './components/QuestionForm'
import { DndContext,
        MouseSensor,
        useSensor,
        useSensors,} from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

export default function Home() {

    const [formData, setFormData] = useState({
      name: '',
      email: '',
    })
    const [addDiv, setAddDiv] = useState([{divs:"", id:100}])

    const {name,email} = formData;

    const sensors = useSensors( useSensor(MouseSensor, {
      // Require the mouse to move by 10 pixels before activating
      activationConstraint: {
        distance: 10,
      },})
    )
    
  
    

    const questions= []

    const myId = 1000;

    //For handling name and email fields
    function handleText(e){
      const value = e.target.value
      setFormData({
        ...formData,
        [e.target.name]: value
      })
    }

    //For creating new question fields
    function handleClick(){ 
        setAddDiv([...addDiv, {divs:"", id:Math.floor(Math.random() * 100)}])
      }

    function handleDragStart(e){
      console.log("Started",e)
    }

    function handleDragEnd(e){
      if(e.active.id === e.over?.id) return

      if(e.active.data.current?.sortable.containerId !== e.over?.data.current?.sortable.containerId) return

      setAddDiv((items) => {
        const temp = {...addDiv}
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
          <h1 className="text-4xl pb-10 font-bold ml-8 text-green-700">Samskara</h1>
          <h1 className="text-2xl pb-10 font-bold ml-8">Create a new Event</h1>
        <div className="flex">
        <div className="p-2">
        <label htmlFor="name">Name:  </label>
        <input className="rounded-lg w-full"  
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
        <input className="rounded-lg w-full" 
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

            <div className=" w-full">
      <p className="p-2 m-2 font-semibold font-serif text-center">Feel free to add some additional questions to our participants!!!</p>
      
      <SortableContext items={addDiv} strategy={verticalListSortingStrategy}>
      <div className="min-h-full">
      {addDiv.map((singleDiv, index)=> 
       ( 
       
       <QuestionForm key={addDiv[index].id}  handleClick={handleClick} addDiv={addDiv} index={index} questions={questions} />
      
       )
       )}
       </div>
       </SortableContext> 
       </div>
      </div>
      </DndContext>
    
  )
}
