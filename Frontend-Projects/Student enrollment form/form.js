const Name_input = document.querySelector('#name');
const Email_input = document.querySelector('#email');
const Website_input = document.querySelector('#website');
const Image_input = document.querySelector('#image');
const male = document.querySelector('#male');
const female = document.querySelector('#female');
const java = document.querySelector('#java');
const html = document.querySelector('#HTML');
const css = document.querySelector('#CSS');

const enroll_btn = document.querySelector('#enroll-btn');
const Students = document.querySelector('.student-details');

enroll_btn.onclick = (e) => {
    e.preventDefault();

    const Student_details = document.createElement('div');
    Student_details.classList.add('student');

    const Details = document.createElement('div');
    Details.classList.add('details');

    const student_name = document.createElement('div');
    student_name.classList.add('student-name');
    student_name.innerText = Name_input.value;

    const student_email = document.createElement('div');
    student_email.classList.add('student-email');
    student_email.innerText = Email_input.value;

    const student_website = document.createElement('div');
    student_website.classList.add('student-website');

    const link = document.createElement('a');
    link.href = Website_input.value;
    link.target = 'blank';
    link.innerText = Website_input.value;

    student_website.appendChild(link);
    

    const student_gender = document.createElement('div');
    student_gender.classList.add('student-gender');

    if(male.checked){
        student_gender.innerText = male.value;
    }
    else{
        student_gender.innerText = female.value;
    }
    
    const student_skills = document.createElement('div');
    student_skills.classList.add('student-skills');

    if(java.checked){
        student_skills.innerText = java.value;
    }

    if(css.checked){
        student_skills.innerText = css.value;
    }

    if(html.checked){
        student_skills.innerText = html.value;
    }

    const pictures = document.createElement('div');
    pictures.classList.add('picture')

    const img_ele = document.createElement('img');
    img_ele.classList.add('student-image');
    img_ele.src= Image_input.value;


    pictures.appendChild(img_ele);

    Details.appendChild(student_name);
    Details.appendChild(student_gender);
    Details.appendChild(student_email);
    Details.appendChild(student_website);
    Details.appendChild(student_skills);


    Student_details.appendChild(Details);
    Student_details.appendChild(pictures);

    Students.appendChild(Student_details);

    Name_input.value="";
    Email_input.value="";
    Website_input.value="";
    Image_input.value="";
    male.checked = false;
    female.checked = false;

    java.checked = false;
    html.checked = false;
    css.checked = false;

}