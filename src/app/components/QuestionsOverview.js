
function QuestionOverview({name, email,darkMode,qList, hidePanel, setHidePanel}) {


return (

    <div className= {darkMode ? "dark" : ""}>
    <div className="bg-white  text-slate-800 dark:bg-slate-900 dark:text-slate-200 min-h-screen roboto flex flex-col flex-wrap m-4 p-4 font-semibold">
      <h1 className="text-4xl sm:text-3xl pb-4 text-center">Questions Overview</h1>
      <p className="sm:text-sm">Event conducted by: {name}</p>
      <p className="sm:text-sm">For more details contact at {email}</p>
      <div className="m-4">
      <h1 className="text-3xl sm:text-2xl my-2">Questions</h1>
      <label className="sm:text-sm" htmlFor="participantName">Name:</label>
      <input className= "w-1/2 sm:w-3/4 border-2 sm:h-6 border-slate-200 rounded text-slate-800 ml-2 mb-4"type="text" name="participant" disabled></input>
      <div className="border-2 border-slate-200 rounded p-2">
      <p className="w-3/4 sm:text-sm sm:h-8 sm:p-2 mt-2 text-slate-300 bg-slate-700 border-2 border:slate-900 dark:border-slate-200 rounded-3xl p-4">What is your age group?</p>
      <div className="flex sm:text-sm">
      <input type="radio" name="age-group" />
      <label htmlFor="18-35" className="m-4">18-35</label>
      <input type="radio" name="age-group"  />
      <label htmlFor="36-50" className="m-4">36-50</label>
      <input type="radio" name="age-group" />
      <label htmlFor="50+" className="m-4">50+</label>
      </div>
      </div>

    {qList.optionTags === null ?

      (<ul>
        {qList.map((item,index) =>  (
          <>
          <div className="border-2 border-slate-200 rounded p-2">
        <li className=" w-3/4 sm:text-sm sm:h-8 sm:p-2 mt-2 text-slate-300 bg-slate-700 border-2 border:slate-900 dark:border-slate-200 rounded-3xl p-4" 
            key={index}>{item.query}</li>
         <input className= "w-3/4 mt-4 mb-8 border-2 border-slate-200 rounded text-slate-800" 
                type="text" 
                name="answer" 
                placeholder="Your answer here"
                ></input>
         </div>
         </>
        ))}
        </ul>) :
      (<ul>
        {qList.map((item,index) => (
          <>
          <div className="border-2 border-slate-200 rounded p-2">
        <li className=" w-3/4 sm:text-sm sm:h-8 sm:p-2 mt-2 text-slate-300 bg-slate-700 border-2 border:slate-900 dark:border-slate-200 rounded-3xl p-4" 
            key={index}>{item.query}</li>
         {item.optionTags?.map((tag,tagIndex) => (
          <>
         <input className= "my-4 sm:text-sm" type="checkbox" name="answer" key={tagIndex}></input>
         <label htmlFor="options" className="m-4 sm:text-sm">{tag}</label>
         </>))}
         </div>
         </>
        ))}
         </ul>
      )}

      </div>
         
      <div>
        <button type="button" 
                onClick={()=>setHidePanel(!hidePanel)}
                className="bg-slate-800 rounded-xl h-10 sm:h-6 w-1/4 mt-4 sm:mt-2 text-bold text-white text-sm sm:text-center hover:border-2 hover:ring-slate-600"
                >Back to Create Questions
                </button>
      </div>

    </div>
    </div>
  )
}

export default QuestionOverview