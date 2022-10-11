import { useExercisesData } from "../contexts/ExercisesDataContext"
import CardLoader from "./CardLoader"
import ExerciseCard from "./ExerciseCard"
import Pagination from "./Pagination"

const Exercises = () => {
  const { searchedExercises, currentPage, exercisesPerPage } = useExercisesData()

  const indexOfLastExercise = currentPage * exercisesPerPage
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage
  const currentExercises = searchedExercises.slice(indexOfFirstExercise, indexOfLastExercise)

  return (
    <div className="mt-12 p-5 lg:mt-28">
      <h3 className="text-3xl mb-12 font-semibold dark:text-gray-100">Showing Results</h3>

      <div className="flex flex-row flex-wrap justify-center gap-12">
        {searchedExercises.length ? (
          currentExercises?.map((exercise) => <ExerciseCard key={exercise.id} exercise={exercise} />)
        ) : (
          <CardLoader quantity={3} />
        )}
      </div>

      <div className="pagination mt-24 flex items-center">{searchedExercises.length > 10 && <Pagination />}</div>
    </div>
  )
}

export default Exercises
