import React from 'react'
import { BiTimeFive} from 'react-icons/bi'

import logo1 from '../../Assets/logo3.png'

const Data = [
  {
    id:1,
    image:logo1,
    title: 'Web Developer',
    time:'Now',
    location: ' Canada',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quisquam, quisquam, quisquam, quisquam, quisquam, quisquam.',
    company: 'Novac Linus Co.'
  },
  {
    id:2,
    image:logo1,
    title:'UI Designer',
    time:'14 Hrs',
    location: 'Manchester',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quisquam, quisquam, quisquam, quisquam, quisquam, quisquam.',
    company: 'Liquid Accessments'
  },
  {
    id:3,
    image:logo1,
    title: 'SDE',
    time:'Now',
    location: 'Austria',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quisquam, quisquam, quisquam, quisquam, quisquam, quisquam.',
    company: 'Web Tech Agency'
  },
  {
    id:4,
    image:logo1,
    title: 'Web Developer',
    time:'Now',
    location: ' Canada',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quisquam, quisquam, quisquam, quisquam, quisquam, quisquam.',
    company: 'Novac Linus Co.'
  },
  {
    id:5,
    image:logo1,
    title:'UI Designer',
    time:'14 Hrs',
    location: 'Manchester',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quisquam, quisquam, quisquam, quisquam, quisquam, quisquam.',
    company: 'Liquid Accessments'
  },
  {
    id:6,
    image:logo1,
    title: 'SDE',
    time:'Now',
    location: 'Austria',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quisquam, quisquam, quisquam, quisquam, quisquam, quisquam.',
    company: 'Web Tech Agency'
  },
  {
    id:7,
    image:logo1,
    title: 'SDE',
    time:'Now',
    location: 'Austria',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quisquam, quisquam, quisquam, quisquam, quisquam, quisquam.',
    company: 'Web Tech Agency'
  },
  {
    id:8,
    image:logo1,
    title: 'SDE',
    time:'Now',
    location: 'Austria',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quisquam, quisquam, quisquam, quisquam, quisquam, quisquam.',
    company: 'Web Tech Agency'
  }
  
]

const jobs = () => {
  return (
  <div>
    <div className='jobContainer flex gap-10 justify-center flex-wrap items-center py-10'>
     
           {Data.map(({id, image, title, time,location, description,company}) => {
            return(
              <div key={id} className="group group/item singleJob w-[250px] p-[20px] bg-white rounded-[10px] hover:bg-blueColor shadow-lg shadow-greyIsh-400/700 hover:shadow-lg">

              <span className='flex justify-between items-center gap-4'>
                <h1 className='text-[16px] font-semibold text-textColor group-hover:text-white'>{title}</h1>
                <span className='flex items-center text-[#ccc] gap-1'>
                  <BiTimeFive/>{time}
                </span>
              </span>
              <h6 className='text-[#ccc]'>{location}</h6>
      
              <p className='text-[13px] text-[#959595] pt-[20px] border-t-[2px] mt-[20px] group-hover:text-white'>
                {description}
              </p>
      
              <div className="company flex items-center gap-2">
                <img src={image} alt="Company Logo" className='w-[20%]'  />
                <span className='text-[14px] py-[1rem] block group-hover:text-white'>{company}</span>
              </div>
      
              <button className='border-[2px] rounded-[10px] block p-[10px] w-full text-[14px] font-semibold text-textColor hover:bg-white group-hover/item:text-textColor '>Apply Now</button>
      
            </div>
            )

           }
           )};
    </div>
  </div>
  )
}

export default jobs