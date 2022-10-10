import { useExercisesData } from "../contexts/ExercisesDataContext"

const Pagination = () => {
  const { searchedExercises, currentPage, setCurrentPage, exercisesPerPage } = useExercisesData()

  const totalNumberOfPages = Math.ceil(searchedExercises.length / exercisesPerPage)

  const numberOfPages = []
  for (let i = 1; i <= totalNumberOfPages; i++) {
    numberOfPages.push(i)
  }

  const paginate = (e) => setCurrentPage(Number(e.target.value))
  const paginatePrevious = () => setCurrentPage((prev) => prev - 1)
  const paginateNext = () => setCurrentPage((prev) => prev + 1)

  if (totalNumberOfPages <= 0) return

  return (
    <nav className="flex w-full justify-center mx-auto">
      <div className="inline-flex -space-x-px rounded-lg">
        {/* Previous */}
        {currentPage > 1 && (
          <>
            <button className="pagination-navigation rounded-l-lg" onClick={paginatePrevious}>
              Previous
            </button>
          </>
        )}

        {/* Numbers */}
        {numberOfPages?.map((number) => {
          if (
            number === currentPage - 3 ||
            number === currentPage - 2 ||
            number === currentPage - 1 ||
            number === currentPage ||
            number === currentPage + 1 ||
            number === currentPage + 2 ||
            number === currentPage + 3
          ) {
            return (
              <button
                key={number}
                className={`pagination-btn ${number === currentPage && "active"}`}
                value={number}
                onClick={paginate}
              >
                {number}
              </button>
            )
          }
        })}
        {/* Next */}
        {currentPage < totalNumberOfPages && (
          <>
            <button className="pagination-navigation rounded-r-lg" onClick={paginateNext}>
              Next
            </button>
          </>
        )}
      </div>
    </nav>
  )
}

export default Pagination
