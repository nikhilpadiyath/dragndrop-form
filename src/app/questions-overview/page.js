import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

const questionsOverview = ({ searchParams }) => {

  const {name, email, qList} = searchParams


return (

    <div className="bg-white  text-slate-800 dark:bg-slate-900 dark:text-white min-h-screen roboto flex flex-col flex-wrap m-4 p-4 font-semibold">
      <h1 className="text-4xl pb-4">Questions Overview</h1>
      <p>Event Coordinator: {name}</p>
      <p>Contact me at {email}</p>
      <div>
      <h1 className="text-3xl my-2">Questions</h1>
      <p>Name</p>
      <input className= "w-1/2 border-2 border-slate-200 rounded"type="text" name="participant" value=""></input>
      <p>What is your age group?</p>
      <div className="flex">
      <input type="radio" name="age-group"  value="18-35" />
      <label htmlFor="18-35" className="m-4">18-35</label>
      <input type="radio" name="age-group"  value="36-50"  />
      <label htmlFor="36-50" className="m-4">36-50</label>
      <input type="radio" name="age-group"  value="50+"  />
      <label htmlFor="50+" className="m-4">50+</label>
      </div>
      <ul>
        {qList.map(item => (<li key={item}>{item}</li>))}
      </ul>
      </div>

    </div>
  )
}

export default questionsOverview