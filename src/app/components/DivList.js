import { SortableContext } from "@dnd-kit/sortable"
import DivItem from '../components/DivItem'

const DivList = (props) => {
    const {handleClick, id, divList} = props
  return (
    <div>
        <h1>{props.title}</h1>
        <SortableContext id={id} items={divList}>
            
                {props.divList.map((div) => (
                    <DivItem key={id} handleClick={handleClick} />
                ))}
           
        </SortableContext>
    </div>
  )
}

export default DivList