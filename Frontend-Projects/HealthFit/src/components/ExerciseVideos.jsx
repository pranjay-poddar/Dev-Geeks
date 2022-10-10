import React from "react"
import ReactPlayer from "react-player"
import CardLoader from "./CardLoader"

const ExerciseVideos = ({ exerciseVideos, name }) => {
  return (
    <section className="font-body">
      <div className="mt-5 md:mt-32 p-5">
        <h3 className="ml-5 text-3xl font-bold mb-9 text-center lg:text-start dark:text-gray-100">
          Watch <span className="text-indigo-700 capitalize dark:text-indigo-500">{name}</span> Exercise
        </h3>

        <div className="flex flex-wrap justify-center gap-5 items-center md:flex-row">
          {exerciseVideos.length ? (
            exerciseVideos?.slice(0, exerciseVideos.length).map(({ video }, index) => (
              <a
                key={index}
                href={`https://www.youtube.com/watch?v=${video.videoId}`}
                className="flex flex-col gap-6 md:w-[320px] w-[387px]"
                target="_blank"
                rel="norereferrer"
              >
                <img
                  src={video.thumbnails[0].url}
                  alt={video.title}
                  className="w-full max-h-48 md:max-h-44 object-cover object-center rounded-lg"
                />
                <div>
                  <h5 className="text-xl font-semibold dark:text-gray-100">
                    {video.title.length > 40 ? `${video.title.substr(0, 60)}...` : video.title}
                  </h5>
                  <h5 className="text-sm text-slate-600 font-semibold dark:text-gray-400">{video.channelName}</h5>
                </div>
              </a>
            ))
          ) : (
            <CardLoader quantity={3} />
          )}
        </div>
      </div>
    </section>
  )
}

export default ExerciseVideos
