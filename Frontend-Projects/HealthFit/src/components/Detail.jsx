import BodyPartImage from "../assets/icons/body-part.png"
import TargetImage from "../assets/icons/target.png"
import EquipmentImage from "../assets/icons/equipment.png"

const Detail = ({ exerciseDetail }) => {
  const { name, target, equipment, gifUrl, bodyPart } = exerciseDetail

  const extraDetails = [
    {
      icon: BodyPartImage,
      name: bodyPart,
    },
    {
      icon: TargetImage,
      name: target,
    },
    {
      icon: EquipmentImage,
      name: equipment,
    },
  ]

  return (
    <section className="font-body">
      <div className="flex gap-16 flex-col md:flex-row p-5 items-center justify-center">
        <img src={gifUrl} alt={name} loading="lazy" className="w-10/12 rounded-2xl" />

        <div className="flex flex-col gap-5 lg:gap-9 dark:text-gray-100">
          <h3 className="text-3xl md:text-5xl font-bold capitalize">{name}</h3>
          <p className="text-lg dark:text-gray-200">
            Exercises keep you strong. {name} is one of the best exercise to target your {target}. It will help you to
            improve your mood and gain energy.
          </p>

          {extraDetails?.map(({ icon, name }, i) => (
            <div key={i} className="flex flex-row gap-6 items-center">
              <button className="bg-gray-200 dark:bg-slate-900 rounded-full w-[100px] h-[100px] flex items-center justify-center">
                <img src={icon} alt={name} className="w-12 h-12" />
              </button>
              <p className="text-xl capitalize">{name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Detail
