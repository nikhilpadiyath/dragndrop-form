
import Link from 'next/link'


const page = ({searchParams}) => {

  

  const {name, email, qList, darkMode} = searchParams
  

return (

    <div className= {darkMode ? "dark" : ""}>
    <div className="bg-white  text-slate-800 dark:bg-slate-900 dark:text-slate-200 min-h-screen roboto flex flex-col flex-wrap m-4 p-4 font-semibold">
      <h1 className="text-4xl pb-4 text-center">Questions Overview</h1>
      <p>Event Head: {name}</p>
      <p>Contact me at {email}</p>
      <div className="m-4">
      <h1 className="text-3xl my-2">Questions</h1>
      <p>Name</p>
      <input className= "w-1/2 border-2 border-slate-200 rounded text-slate-800"type="text" name="participant"></input>
      <p>What is your age group?</p>
      <div className="flex">
      <input type="radio" name="age-group" />
      <label htmlFor="18-35" className="m-4">18-35</label>
      <input type="radio" name="age-group"  />
      <label htmlFor="36-50" className="m-4">36-50</label>
      <input type="radio" name="age-group" />
      <label htmlFor="50+" className="m-4">50+</label>
      </div>
      <ul>
        {qList.map(item => (
          <>
        <li key={item}>{item}</li>
         <input className= "w-3/4 my-2 border-2 border-slate-200 rounded text-slate-800"type="text" name="answer"></input>
         </>
        ))}
      </ul>
      
      </div>
      <Link className="mt-8 underline text-blue-900 dark:text-purple-700" href={{
      pathname: "/",
      }}>Back to Create Questions</Link>

    </div>
    </div>
  )
}

export default page