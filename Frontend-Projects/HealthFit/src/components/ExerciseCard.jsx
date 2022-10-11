import { Link } from "react-router-dom"

const ExerciseCard = ({ exercise }) => {
  if (!exercise) return

  const { id, name, target, bodyPart, gifUrl } = exercise

  return (
    <Link to={`/exercise/${id}`} className="exercise-card">
      <img src={gifUrl} alt={name} loading="lazy" />

      <div className="flex flex-row pt-3">
        <button className="px-3 py-1 ml-5  text-white bg-pink-600 text-sm  rounded-3xl capitalize dark:bg-orange-500">
          {bodyPart}
        </button>
        <button className="px-3 py-1 ml-5  text-white bg-yellow-500 text-sm  rounded-3xl capitalize dark:bg-green-600">
          {target}
        </button>
      </div>

      <h3 className="text-2xl pb-3 ml-5 mt-3 text-slate-900 font-semibold capitalize dark:text-gray-100">{name}</h3>
    </Link>
  )
}

export default ExerciseCard
