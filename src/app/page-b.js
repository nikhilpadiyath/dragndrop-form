'use client'
import { DndContext } from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"
import { useState } from "react"
import DivList from "./components/DivList"


const Homeb = () => {
    const [divList, setDivList] = useState(
        [{
            divs:"", 
            id: Math.floor(Math.random() * 100),
            title: "",
        }]
        ) 

    const {id,title} = divList

    //For creating new question fields
    function handleClick(index){ 
        setDivList([...divList, 
                    {divs:"", 
                    id: Math.floor(Math.random() * 100),
                    title:`Question # ${index+1}`,
                    }])
                    console.log(divList)
      }

    const handleDragEnd =(e) => {
        if (e.active.id === e.over?.id) return

        if(e.active.data.current?.sortable.containerId !== e.over?.data.current?.sortable.containerId) return

        const containerName = e.active.data.current?.sortable.containerId

        setDivList((divList) => {
            const temp = {...divList}
            const oldIdx = temp[containerName].indexOf(e.active.id.toString())
            const newIdx = temp[containerName].indexOf(e.over.id.toString())
            temp[containerName] = arrayMove(temp[containerName], oldIdx, newIdx)
            return temp
        })
    }

    return(
        <DndContext onDragEnd={handleDragEnd}>
            <main>
                <h1>Samskara</h1>
                <section>
                {divList.map((singleDiv, index)=> 
                    ( 
                        
                        <DivList key={title} title={title} divList={divList} handleClick={handleClick}/>
                    )
                )}
                </section>

            </main>
        </DndContext>
    )    
}

export default Homeb