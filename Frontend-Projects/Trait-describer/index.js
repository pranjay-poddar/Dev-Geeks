const generate = document.getElementById("generate");
var p=0;
generate.addEventListener("click", function () {
  p++;
  var randomIndex = Math.floor(Math.random() * array.length);
  console.log(randomIndex);
  const div2 = document.getElementById("div2");
  div2.innerHTML = ` <h1> ${p}) ${array1[randomIndex]} </h1>
  <p> ${array[randomIndex]} </p>
  
  `;
});
const array = [
  "Ambitious: An ambitious person has a strong desire to achieve success by meeting their goals. You may show ambition when you apply hard work and dedication to overcome a challenge or exceed company objectives. Ambition may also mean taking on additional work or putting in extra effort to reach your desired outcome.",
  "Creative:Someone creative can use their imagination to make or invent something. Creativity skills apply not only to artistic roles. It requires creativity to solve a difficult problem, present information in a clear, interesting way or find better ways to complete tasks",
  "Compassionate:A compassionate person can feel and express sympathy for others. You may display compassion when you help a colleague overcome a difficult challenge or provide emotional support to someone experiencing a challenging time. Employers desire candidates who show compassion in every role, but it can especially help those interested in customer service roles or client-facing positions.",
  " Conscientious:Someone with conscientious traits acts carefully and takes purposeful action. They aim to do what's right and to fulfill a duty. Conscientious people also have a higher level of self-discipline and strive to complete every task to the best of their ability.",
  "Courageous:A courageous employee doesn't feel deterred by challenges and difficulties. They're likely to take on projects others fear may be too hard or require too much work. They may also take more calculated risks in the workplace, which can lead to gains for a company and help them identify new ideas or strategies.",
  "Flexible:Flexible individuals can quickly adapt to changes in plans, such as shortened project timelines or new client needs. The ability to modify your behaviors based on changes in the work environment can help you succeed in fast-paced roles and companies. Many employers look for flexible candidates to ensure that they can complete their duties even when handling new ideas or environments.",
  "Honest:An honest person appears sincere and truthful and may not feel comfortable participating in deceptive practices. While all positions require honesty, it's especially important in heavily regulated industries such as health care and finance positions. Many roles that require ethical parameters rely on the specialists to have and practice honesty.",
  "Humble:Humble individuals can exercise humility and maintain their modesty throughout their careers. They avoid boasting about their accomplishments and act respectfully when earning praise or recognition. Many leaders display this trait to ensure the entire team receives credit for achieving a goal.",
  " Honorable (Integrity):Someone honorable has integrity and acts according to their principles and ethics. Honorable employees ensure they always behave in ways that reflect positively on the company where they work. Companies and positions that rely on brand relationships and public perception often look for honorable candidates who display the values and integrity of the organization.",
  " Loyal:A loyal employee is supportive of an organization and its mission. Someone loyal can be trusted with sensitive information and may stay at a company long-term. Organizations often value loyalty, as it saves them money and reduces the time and resources necessary for employee turn-over processes.",
  "Patient:Patient people can tolerate setbacks, delays or unexpected challenges without becoming anxious or angry. Having patience provides an essential requirement for jobs where it can take a long time to see the results of your efforts, such as when leading a marketing team or campaign. Many employers and coworkers value patience because it can improve the work environment and create a positive culture.",
  "Persistent:Employees who have persistence work in relentless pursuit of goals. They continue along their path despite any obstacles or difficulties they face along the way. Persistence serves as an excellent trait for someone in a role that requires frequent requests and rejections, such as sales, journalism, public service or law.",
  "Resilient:A resilient person refers to someone who can quickly recover from setbacks, stress, adverse situations or unexpected changes. For example, you may practice resilience as an employee when you cannot meet a goal, but you quickly put together a plan to exceed your next objective. Having this trait means you can work with increased efficiency and maintain a positive and productive attitude.",
  "Disciplined:Someone with self-discipline can overcome temptations to stray from the path to success, such as procrastination and self-doubt. Self-disciplined employees work hard and often need little to no supervision. Many leadership positions or roles with a high level of independence require candidates to have advanced discipline.",
  "Curious:Curiosity is an important character trait that can drive someone to want to know or learn new skills, information and abilities without being asked beforehand. Curious employees are valued for their ability to independently motivate themselves to learn and grow in their roles and work. Many types of jobs rely on curiosity, especially jobs described as open-ended, flexible and strategic.",
];
const array1 = [
    "Ambitious","Creative","Compassionate",  " Conscientious","Courageous","Flexible","Honest",  "Humble"," Honorable (Integrity)", " Loyal",  "Patient",
    "Persistent","Resilient","Disciplined", "Curious"
    
  ];
