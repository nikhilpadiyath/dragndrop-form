
function QuestionOverview({name, email,darkMode,qList, hidePanel, setHidePanel}) {


return (

    <div className= {darkMode ? "dark" : ""}>
    <div className="bg-white  text-slate-800 dark:bg-slate-900 dark:text-slate-200 min-h-screen roboto flex flex-col flex-wrap m-4 p-4 font-semibold">
      <h1 className="text-4xl pb-4 text-center">Questions Overview</h1>
      <p>Event conducted by: {name}</p>
      <p>For more details contact at {email}</p>
      <div className="m-4">
      <h1 className="text-3xl my-2">Questions</h1>
      <label htmlFor="participantName">Name:</label>
      <input className= "w-1/2 border-2 border-slate-200 rounded text-slate-800 ml-2 mb-4"type="text" name="participant" disabled></input>
      <p className="w-3/4  text-slate-300 dark:text-slate-950 bg-slate-800 border-2 border:slate-900 dark:border-slate-200 rounded-3xl p-4">What is your age group?</p>
      <div className="flex">
      <input type="radio" name="age-group" />
      <label htmlFor="18-35" className="m-4">18-35</label>
      <input type="radio" name="age-group"  />
      <label htmlFor="36-50" className="m-4">36-50</label>
      <input type="radio" name="age-group" />
      <label htmlFor="50+" className="m-4">50+</label>
      </div>

     {/*} <ul>
        {qList.map((item,index) => (
          <>
        <li className=" w-3/4 bg-slate-800 border-2 border:slate-900 dark:border-slate-200 rounded-3xl p-4" 
            key={index}>{item.query}</li>
         <input className= "w-3/4 mt-4 mb-8 border-2 border-slate-200 rounded text-slate-800" 
                type="text" 
                name="answer" 
                disabled></input>
         </>
        ))}
        </ul>*/}
      <ul>
        {qList.map((item,index) => (
          <>
        <li className=" w-3/4 text-slate-300 dark:text-slate-950 bg-slate-800 border-2 border:slate-900 dark:border-slate-200 rounded-3xl p-4" 
            key={item.query}>{item.query}</li>
         {item.optionTags.map((tag,tagIndex) => (
          <>
         <input className= "my-4" type="checkbox" name="answer" key={tag}></input>
         <label htmlFor="options" className="m-4">{tag}</label>
         </>))}
         </>
        ))}
         </ul>

      </div>
      <div>
        <button type="button" 
                onClick={()=>setHidePanel(!hidePanel)}
                className="bg-slate-800 rounded-xl h-10 sm:h-6 w-full mt-4 sm:mt-2 text-bold text-white text-sm sm:text-center hover:border-2 hover:ring-slate-600"
                >Back to Create Questions
                </button>
      </div>

    </div>
    </div>
  )
}

export default QuestionOverview