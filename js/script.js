
// navbar
// $().ready(function () {
//     var navItem = ['About', 'Skills', 'Portfolio', 'Experience', 'Testimonials'];
//     $.each(navItem, function (i,value) {
//         $('.nav-link').append(value + "&nbsp;&nbsp;&nbsp;&nbsp;")
//     });
//     var seomthing = $('[href=about]');
//     console.log(seomthing);
// });

// Banner
$().ready(function () {
    var name = 'Usman Khan';
    var profession = 'Web Developer';
    var profileImage = '<img src="images/ProfileImage.png" alt="Image" />';
    $('.name').append(name);
    $('.category').append(profession);
    $('.cc-profile-image a').append(profileImage);
})

// Basic Info
$().ready(function () {
    var basicInformation = ["Email", "Address", "Languages", "Industry", "Functionsl Area", "Hobbies"];
    var basicInformationValue = ["usmangorsi@outlook.com", "Lahore, Pakistan", "Urdu, English",
        "Information Technology (IT)", "Web Development", "Coding, Reading, Memes"]
    $.each(basicInformation, function (i, value) {
        $('.pInfo .text-uppercase').append(value + ':' + '<br><br>');
    });
    $.each(basicInformationValue, function (i, value) {
        $('.pInfoValue').append(value + '<br><br>');
    });

});

// About
// var miniIntro = "Hi! I'm Usman and I'm a Web Developer.";
var aboutMe = `<p>I'm a web developer with experience in Asp.net Core / Mvc, Angular and WordPress. 
    I've worked on Fiverr as a freelancer in website development. I look forward to learning new technologies.
    I currently have a good understanding of Full Stack Web Development with Asp.net MVC/Core and Wordpress.
    I’ve can perform API & Theme integration in Angular, Asp.net as well as Asp.net Core.</p>`;
// $('.miniIntro').append(miniIntro);
$('.aboutMe').append(aboutMe);

// skills
$().ready(function () {
    var skills = ['Html', 'Css / Scss', 'jQuery', 'Bootstrap', 'JavaScript', 'C#', 'Object Oriented Programming', 'Entity Framework', 'Asp.Net Core', 'Asp.Net MVC', 'Angular'];
    var skillPercentages = ['80', '80', '80', '80', '80', '60', '60', '60', '60', '75', '75', '70'];
    $.each(skills, function (index, skill) {
        $.each(skillPercentages, function (i, percent) {
            if (i == index) {
                $('.skills').append(`
                <div class="col-md-6 skill">
                <div class="progress-container progress-primary"><span class="progress-badge">${skill}</span>
                <div class="progress">
                <div class="progress-bar progress-bar-primary" data-aos="progress-full" data-aos-offset="10"
                data-aos-duration="2000" role="progressbar" aria-valuenow="60" aria-valuemin="0"
                aria-valuemax="100" style="width: ${percent}%"></div><span class="progress-value">${percent}%</span>
                </div></div>`);
            }
        });
    });
});

// Portfolio
$().ready(function () {
    var portfolioLinks = ['https://roofersfzc.net/'];
    var portfolioNames = ['Roofers FZC'];
    var portfolioImages = ['images/Rooferz FZC Banner.jpg'];
    var projectNames = ['Wordpres Project'];
    $.each(portfolioNames, function (index, name) {
        $.each(portfolioLinks, function (i, link) {
            $.each(portfolioImages, function (ii, imageUrl) {
                $.each(projectNames, function (iii, project) {
                    if (i == index && ii == index && iii == index) {
                        $('.portfolios').append(`<div class="tab-content gallery mt-5 col-md-6">
                        <div class="cc-porfolio-image img-raised" data-aos="fade-up" data-aos-anchor-placement="top-bottom">
                        <a href="${link}" target="_blank">
                        <figure class="cc-effect"><img src="${imageUrl}" alt="Image" />
                        <figcaption><div class="h4">${project}</div>
                        <p>${name}</p></figcaption></figure></a></div></div>`);
                    }
                });
            });
        });
    });
})

// Education
$().ready(function () {
    var graduationYear = ['2014 - 2016', '2016-2018', '2018 onwards'];
    var degree = ['High School', 'Intermidiate Degree', 'Bachelor\'s Degree'];
    var subject = ['Metric in Biology', 'Intermediat in Computer Sciences', 'Bachelors in Computer Sciences'];
    var institution = ['Jinnah Public SchoolWeb Developer', 'Superior Group of CollegesWeb Developer', 'University of Computer ScienceWeb Developer'];
    var summary = ['Completed high school education in 2016 form Jinnah public school.', 'Completed college education in 2018 form Superior Group of Colleges.', 'Doing bachelor\'s degree in Computer Science form Virtual University of Pakistan.'];
    $.each(graduationYear, function (index, year) {
        $.each(degree, function (i, degree) {
            $.each(subject, function (ii, subject) {
                $.each(institution, function (iii, institution) {
                    $.each(summary, function (iv, summary) {
                        if (i == index && ii == index && iii == index && iv == index) {
                            $('.education').append(`
                            <div class="col-md-3 bg-primary" data-aos="fade-right" data-aos-offset="50" data-aos-duration="500">
                            <div class="card-body cc-education-header">
                            <p>${year}</p>
                            <div class="h5">${degree}</div></div></div>
                            <div class="col-md-9" data-aos="fade-left" data-aos-offset="50" data-aos-duration="500">
                            <div class="card-body">
                            <div class="h5">${subject}</div>
                            <p class="category">${institution}</p>
                            <p>${summary}</p>
                            </div></div></div>`
                            );
                        }
                    });
                });
            });
        });
    });
});

//Testimonials
// $().ready(function () {
//     var clientImage = ['images/placeholder-400x400.gif',
//         'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/e40438712b13d0c6b0667ab913e65fad-913270731599112437022/JPEG_20200903_015356_3958061439173598869.jpg',
//         'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/profile/photos/2562967/original/Netexchange.jpg',
//         'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/profile/photos/2562967/original/Netexchange.jpg',
//         'images/placeholder-400x400.gif'
//     ];
//     var clientName = ['osama', 'nestorm750', 'netexchange', 'netexchange', 'alberts167'];
//     var clientCountry = ['Malta', 'United States', 'Singapore', 'Singapore', 'Peru'];
//     var clientReview = [
//         `Excellent developer. met my requirements and is very helpful! will work with him on another project for sure! He's very brave and patience! keep up your good work!.`,
//         `Excellent, fast, very competent and knowledgeable, very polite - highly recommended.`,
//         `Seller was prompt in his response and listened to all Buyer's requirements and carried out his responsibilities well`,
//         `Seller was very responsible and completed his task within the timeline given. Would highly recommend the Seller for a good WordPress development project.`,
//         'Awesome to work with. Great responsiveness and understanding of what was required. He provided me the best solutions and recommendations for my project.'
//     ];
//     $.each(clientImage, function (index, imageUrl) {
//         $.each(clientName, function (i, name) {
//             $.each(clientCountry, function (ii, country) {
//                 $.each(clientReview, function (iii, review) {
//                     if (i == index && ii == index && iii == index) {
//                         $('.testimonial').append(`
//                         <div class="col-lg-2 col-md-3 cc-reference-header">
//                         <img src="${imageUrl}"alt="Image" />
//                         <div class="h5 pt-2">${name}</div>
//                         <p class="category">${country}</p>
//                         </div><div class="col-lg-10 col-md-9">
//                         <p>${review}</p></div>`);
//                     }
//                 });
//             });
//         });
//     });
// });

// Footer
// $().ready(function () {
//     var socialLink = ['https://www.facebook.com/ukgorsi', 'https://twitter.com/GorsiUk', 'https://www.fiverr.com/users/usman_gorsi1', 'https://www.instagram.com/ukgorsi/'];
//     var socialIcon = ['fa fa-facebook fa-2x', 'fa fa-twitter fa-2x', 'fa fa-fiverr fa-2x', 'fa fa-instagram fa-2x'];

//     $.each(socialLink, function (index, link) {
//         $.each(socialIcon, function (i, icon) {
//             if (i == index) {
//                 $('.socialLinks').append(`<a class="" href="${link}">
//                 <i class= "${icon}" aria - hidden="true"></i></a>`);
//             }
//         });
//     });
// });