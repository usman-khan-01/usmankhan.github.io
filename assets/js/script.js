var doc = new jsPDF('p', 'pt', 'legal');
var img = new Image();
getPlatformName = (s) => console.log(s[0].link);

// data
(async () => {
    const response = await fetch('https://graph.perspective-v.com/api/resume', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*",
        },
        body: JSON.stringify({
            query: `query getMyResume($token:String!){
                getbyaccesstoken(accesToken:$token){
                  name,
                  jsonData
                }
              }`,
            variables: {
                token: 'gomjEIoerEKXeTF7tS8Syg=='
            }
        })
    });
    const body = await response.json();
    var data = JSON.parse(body.data.getbyaccesstoken.jsonData);
    // basic info
    $('.navbar-brand, .name').append(data.fullName);
    $('.category').append(data.profession);
    document.querySelector('.profile-image').src = data.profileImageUrl;
    // document.querySelector('.linkedIn_pdf').href = getPlatformName(data.socailLinks);
    $('.aboutMe').append(data.about);
    var basicInformation = ["Email", "Address", "Languages", "Industry", "Functionsl Area"];
    $.each(basicInformation, function (i, value) { $('.pInfo .text-uppercase').append(value + ':' + '<br><br>'); });
    $.each(data.basicInfo, function (i, value) { $('.pInfoValue').append(value + '<br><br>'); });

    // skills
    $.each(data.skills, function (i, skill) {
        $('.skills').append(`<div class="col-md-6 skill">
                <div class="progress-container progress-primary"><span class="progress-badge">${skill.name}</span>
                <div class="progress">
                <div class="progress-bar progress-bar-primary" data-aos="progress-full" data-aos-offset="10"
                data-aos-duration="2000" role="progressbar" aria-valuenow="60" aria-valuemin="0"
                aria-valuemax="100" style="width: ${skill.percentage}%"></div><span class="progress-value">${skill.percentage}%</span>
                </div></div>`);
    });

    // portfolio
    $.each(data.portfolios, function (i, portfolio) {
        $('.portfolios').append(`<div class="tab-content gallery mt-5 col-md-6" style="padding-bottom: 20px">
                <div class="cc-porfolio-image img-raised" data-aos="fade-up" data-aos-anchor-placement="top-bottom">
                <a href="${portfolio.link}" target="_blank">
                <figure class="cc-effect"><img src="${portfolio.imageUrl}" alt="Image" />
                <figcaption><div class="h4">${portfolio.framework}</div>
                <p>${portfolio.name}</p></figcaption></figure></a></div></div>`);
    });

    // education
    $.each(data.education, function (i, edu) {
        $('.cc-education').append(`
                <div class="card">
                <div class="row education">
                <div class="col-md-3 bg-primary" data-aos="fade-right" data-aos-offset="50" data-aos-duration="500">
                <div class="card-body cc-education-header">
                <p>${edu.yearOfGraduation}</p>
                <div class="h5">${edu.degree}</div></div></div>
                <div class="col-md-9" data-aos="fade-left" data-aos-offset="50" data-aos-duration="500">
                <div class="card-body">
                <div class="h5">${edu.subject}</div>
                <p class="category">${edu.institution}</p>
                <p>${edu.summary}</p></div></div></div></div></div>`);
    });

    // testimonial
    $.each(data.testimonials, function (i, testimonial) {
        $('.carousel-indicators').append(`<li class="carousel-indicator" data-target="#cc-Indicators" dataSlideTo="0"></li>`);
        if (i == 0) {
            $('.carousel-indicator').addClass('active');
            $('.carousel-inner').append(`<div class="carousel-item active">
                    <div class="row testimonial">
                    <div class="col-lg-2 col-md-3 cc-reference-header">
                    <a href="${testimonial.link}" target="_blank">
                    <img src="${testimonial.imageUrl}" alt="${testimonial.name}'s Image" />
                    </a>
                    <div class="h5 pt-2">${testimonial.name}</div> <p class="category">${testimonial.country}</p> </div>
                    <div class="col-lg-10 col-md-9"> <p>${testimonial.review}</p> </div>
                    </div>
                    </div>`);
        } else {
            $('.carousel-indicator').removeClass('active');
            $('.carousel-inner').append(`<div class="carousel-item">
                    <div class="row testimonial">
                    <div class="col-lg-2 col-md-3 cc-reference-header">
                    <a href="${testimonial.link}" target="_blank">
                    <img src="${testimonial.imageUrl}" alt="${testimonial.name}'s Image" />
                    </a>
                    <div class="h5 pt-2">${testimonial.name}</div> <p class="category">${testimonial.country}</p> </div>
                    <div class="col-lg-10 col-md-9"> <p>${testimonial.review}</p> </div>
                    </div>
                    </div>`);
        }
    });

    //#region pdf data
    $('.username_pdf').append(data.fullName);
    $('.address_pdf').append(data.basicaddress);
    $('.mailAndMobile_pdf').append(data.basicInfo.email + '<br>' + data.basicInfo.mobile);
    $('.about_pdf').append(data.about);
    // doc.textWithLink(text, { url: getPlatformName(data.links) });
    document.querySelector('.linkedIn_pdf').href = getPlatformName(data.links);
    $.each(data.skills, (i, skill) => $('.skill_pdf').append(`<li>${skill.name}</li>`));
    $.each(data.education, (i, edu) => $('.education_pdf').append(`<p>${edu.institution} - ${edu.subject}<br>${edu.yearOfGraduation}</p><br>`));
    $.each(data.experiences, (i, exp) => $('.experience_pdf').append(`<p><b>${exp.profession} - ${exp.company}</b><br>${exp.duration}<br>${exp.description}</p><br>`));
    $.each(data.licensesAndCertifications, (i, lcct) => $('.licensesAndCertifications_pdf').append(`<p><b>${lcct.name}</b> - ${lcct.institution}</p>`));
    //#endregion pdf data

    //#region generate pdf
    $(document).on('click', '#gpdf', function () {
        // doc.splitTextToSize(data.about, 50);
        // doc.textWithLink('linkedin.com/in/uk-gorsi', {url: getPlatformName(data.links)});
        // html2canvas('#pdf', {
        //     useCORS: true,
        //     onrendered: function (canvas) {
        //     }
        // })
        // img.src = data.profileImageUrl;
        // doc.addImage(img, 'png', 10, 78, 12, 15);
        doc.fromHTML($("#pdf").html(), 20, 0, {
            width: 550,
            pagesplit: true
        });
        // window.open(imageData);
        doc.save(`${data.fullName}'s CV.pdf`);
    });
    //#endregion generate pdf
})(); 

//#region json to pdf jsPDF
// var doc = new jsPDF();
// $(document).on('click', '#gpdf', function (event) {
//     doc.text(10, 10,
//         `${data.info.fullName}` + '\n' + `${data.basicInfo.address}` + '\n\n' +
//         `${data.basicInfo.email}` + '\t\t\t' + `${data.info.mobileNumber}` + '\n\n\n' +
//         `${getPlatformName(data.links)}` + '\n\n' + `Summary` + '\n' + `${data.info.about}` + '\n\n' +
//         ``
//     )
//     // 📧
//     doc.save(`${data.info.fullName}'s CV.pdf`);
// });
//#endregion json to pdf jsPDF
