import Icon from "../assets/icons/gym.png"

import { useExercisesData } from "../contexts/ExercisesDataContext"

const BodyPartComp = ({ item }) => {
  const { bodyPart, setBodyPart, setCurrentPage } = useExercisesData()

  return (
    <button
      className={`flex flex-col items-center justify-center transition hover:scale-105 bg-gray-100 rounded-b-lg w-[270px] h-[280px] gap-y-12 shadow-lg border-solid border-indigo-700 dark:border-indigo-500 dark:bg-gray-900 ${
        bodyPart === item ? "border-t-4" : ""
      }`}
      value={item}
      onClick={() => {
        setBodyPart(item)
        setCurrentPage(1)
        window.scrollTo({ top: 1700, behavior: "smooth" })
      }}
    >
      <img src={Icon} alt="dumbell" className="w-10 h-10" />
      <span className="text-xl capitalize font-semibold text-slate-900 dark:text-white">{item}</span>
    </button>
  )
}

export default BodyPartComp
