import {
    mobile,
    backend,
    creator,
    web,
    javascript,
    typescript,
    html,
    css,
    reactjs,
    redux,
    tailwind,
    nodejs,
    mongodb,
    git,
    figma,
    docker,
    meta,
    starbucks,
    tesla,
    shopify,
    carrent,
    Soptify_Clone_Image,
    jobit,
    tripguide,
    threejs,
    Girlscriptlogo,
    WebDeveloper,
    To_Do_List_image,
    Space_invaders_image,
  } from "../assets";
  
  export const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "work",
      title: "Work",
    },
    {
      id: "contact",
      title: "Contact",
    },
  ];
  
  const services = [
    {
      title: "Web Developer",
      icon: web,
    },
    {
      title: "DSA",
      icon: mobile,
    },
    // {
    //   title: "Backend Developer",
    //   icon: backend,
    // },
    {
      title: "Gamer",
      icon: creator,
    },
  ];
  
  const technologies = [
    {
      name: "HTML 5",
      icon: html,
    },
    {
      name: "CSS 3",
      icon: css,
    },
    {
      name: "JavaScript",
      icon: javascript,
    },
    {
      name: "TypeScript",
      icon: typescript,
    },
    {
      name: "React JS",
      icon: reactjs,
    },
    {
      name: "Redux Toolkit",
      icon: redux,
    },
    {
      name: "Tailwind CSS",
      icon: tailwind,
    },
    // {
    //   name: "Node JS",
    //   icon: nodejs,
    // },
    // {
    //   name: "MongoDB",
    //   icon: mongodb,
    // },
    {
      name: "Three JS",
      icon: threejs,
    },
    {
      name: "git",
      icon: git,
    },
    {
      name: "figma",
      icon: figma,
    },
    // {
    //   name: "docker",
    //   icon: docker,
    // },
   
  ];
  
  const experiences = [
    {
      title: "GSSoC’23 Contributor",
      company_name: "GirlScript Summer of Code 2023",
      icon: Girlscriptlogo,
      iconBg: "#383E56",
      date: "May 2023 – Present",
      points: [
        "Leveraged the opportunity to enhance technical skills, gain practical experience, and contribute to the open-source community.",
        "Learnt Git, Git Bash, version control, finding the issues and fixed it.",
      ],
    },
    
    {
      title: "Web Developer Associate",
      company_name: "Next Tech Lab, Vijayawada , AP",
      icon: WebDeveloper,
      iconBg: "#383E56",
      date: "Jan 2023 - Present",
      points: [
        "Worked on various web development projects, collaborated with a team of like-minded individuals,and gained hands-on experience in different technologies.",
      ],
    },
  ];
  
  const testimonials = [
    {
      testimonial:
        "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
      name: "Sara Lee",
      designation: "CFO",
      company: "Acme Co",
      image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      testimonial:
        "I've never met a web developer who truly cares about their clients' success like Rick does.",
      name: "Chris Brown",
      designation: "COO",
      company: "DEF Corp",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      testimonial:
        "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
      name: "Lisa Wang",
      designation: "CTO",
      company: "456 Enterprises",
      image: "https://randomuser.me/api/portraits/women/6.jpg",
    },
  ];
  
  const projects = [
    {
      name: "Spotify Clone",
      description:
        "Developed a replica of the Spotify Discover page using React.js and the Spotify Web API.Implemented features like song play, pause, next song, previous song and playlists.",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        // {
        //   name: "mongodb",
        //   color: "green-text-gradient",
        // },
        {
          name: "tailwind",
          color: "pink-text-gradient",
        },
      ],
      image: Soptify_Clone_Image,
      source_code_link: "https://github.com/",
    },
    {
      name: "JavaScript Games",
      description:
        "Developed a collection of interactive JavaScript games, including a Memory Game, Whac a Rabbit and Space Inavaders using HTML, CSS and JavaScript.",
      tags: [
        {
          name: "html",
          color: "blue-text-gradient",
        },
        {
          name: "css",
          color: "green-text-gradient",
        },
        {
          name: "javascript",
          color: "pink-text-gradient",
        },
      ],
      image: Space_invaders_image,
      source_code_link: "https://github.com/Ayushkumargit7?tab=repositories",
    },
    {
      name: "To DO List",
      description:
        "Built a task management application using ReactJS, allowing users to create tasks , mark it as done when completed and ability to delete it.",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "javascript",
          color: "green-text-gradient",
        },
        {
          name: "css",
          color: "pink-text-gradient",
        },
      ],
      image: To_Do_List_image,
      source_code_link: "https://github.com/Ayushkumargit7/To-Do-List",
    },
  ];
  
  export { services, technologies, experiences, testimonials, projects };