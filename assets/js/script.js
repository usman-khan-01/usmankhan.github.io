const DOC = new jsPDF("p", "pt", "A4");

getPlatformName = (s) => console.log(s[0].link);

// const IMG = new Image();
// const EMAIL_PATTERNS = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

// data

(async () => {

  //#region cloud data
  // const response = await fetch('https://api.perspective-v.com/graph/resume', {
  //     method: 'POST',
  //     headers: {
  //         "Content-Type": "application/json",
  //         "Accept": "*/*",
  //     },
  //     body: JSON.stringify({
  //         query: `query getMyResume($token:String!){
  //             getByAccessToken(accesToken:$token){
  //                   name,
  //                   htmlTemplate,
  //                   jsonData
  //                 }
  //               }`,
  //         variables: {
  //             token: 'FS6Tgrq/T0qblqiuIg7i4Q=='
  //         }
  //     })
  // });
  // const body = await response.json();
  // var data = JSON.parse(body.data.getByAccessToken.jsonData);
  //#endregion cloud data

  //#region local data
  $.getJSON("./assets/data/data.json", function (data) {
    //#region basic info
    $(".navbar-brand, .name").append(data.fullName);
    $(".category").append(data.profession);
    document.querySelector(".profile-image").src = data.profileImageUrl;
    // document.querySelector('.linkedIn_pdf').href = getPlatformName(data.socailLinks);
    $(".aboutMe").append(data.about);
    // $(".miniIntro").append();
    var basicInformation = [
      "Mobile",
      "Email",
      "Address",
      "Industry",
      "Languages",
    ];
    $.each(basicInformation, (i, value) =>
      $(".pInfo .text-uppercase").append(value + ":" + "<br><br>")
    );
    $.each(data.basicInfo, (i, value) =>
      $(".pInfoValue").append(
        value != null && value === `${/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/g}`
          ? `<a href="mailto:${value}">${value}</a><br><br>`
          : value + "<br><br>"
      )
    );
    //#endregion basic info

    //#region skills
    $.each(data.skills, function (i, skill) {
      $(".skills").append(`
            <div class="col-md-6 skill">
                <div class="progress-container progress-primary"><span class="progress-badge">${skill.name}</span>
                    <div class="progress">
                        <div class="progress-bar progress-bar-primary" data-aos="progress-full" data-aos-offset="10"
                            data-aos-duration="2000" role="progressbar" aria-valuenow="60" aria-valuemin="0"
                            aria-valuemax="100" style="width: ${skill.percentage}%"></div><span class="progress-value">${skill.percentage}%</span>
                    </div>
                </div>
            </div>
        `);
    });
    //#endregion skills

    //#region portfolio
    $.each(data.portfolios, function (i, portfolio) {
      $(".portfolios").append(`
            <div class="tab-content gallery mt-5 col-md-4" style="padding-bottom: 20px">
                <div class="cc-porfolio-image img-raised" data-aos="fade-up" data-aos-anchor-placement="top-bottom">
                    <a href="${portfolio.link}" target="_blank">
                        <figure class="cc-effect"><img src="${portfolio.imageUrl}" alt="Image" />
                            <figcaption>
                                <div class="h4">${portfolio.framework}</div>
                                <p>${portfolio.name}</p>
                                <p>${portfolio.description}</p>
                            </figcaption>
                        </figure>
                    </a>
                </div>
            </div>
        `);
    });
    //#endregion portfolio

    //#region experiences
    $.each(data.experiences, function (i, exp) {
      $(".cc-education").append(`
                <div class="card">
                    <div class="row education">
                        <div class="col-md-3 bg-primary" data-aos="fade-right" data-aos-offset="50" data-aos-duration="500">
                            <div class="card-body cc-education-header">
                                <p>${exp.duration}</p>
                                <div class="h5">${exp.profession}</div>
                            </div>
                        </div>
                        <div class="col-md-9" data-aos="fade-left" data-aos-offset="50" data-aos-duration="500">
                            <div class="card-body">
                                <div class="h5">${exp.company}</div>
                                <p class="category"></p>
                                <p>${exp.description.replace(/\n/g, "<br>")}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `);
    });
    //#endregion experiences

    //#region education
    $.each(data.education, function (i, edu) {
      $(".cc-educations").append(`
            <div class="card">
                <div class="row education">
                    <div class="col-md-3 bg-primary" data-aos="fade-right" data-aos-offset="50" data-aos-duration="500">
                        <div class="card-body cc-education-header">
                            <p>${edu.yearOfGraduation}</p>
                            <div class="h5">${edu.degree}</div>
                        </div>
                    </div>
                    <div class="col-md-9" data-aos="fade-left" data-aos-offset="50" data-aos-duration="500">
                        <div class="card-body">
                            <div class="h5">${edu.subject}</div>
                            <p class="category">${edu.institution}</p>
                            <p>${edu.summary}</p>
                        </div>
                    </div>
                </div>
            </div>
        `);
    });
    //#endregion education

    //#region testimonials
    $.each(data.testimonials, function (i, testimonial) {
      $(".carousel-indicators").append(
        `<li class="carousel-indicator" data-target="#cc-Indicators" dataSlideTo="0"></li>`
      );
      if (i == 0) {
        $(".carousel-indicator").addClass("active");
        $(".carousel-inner").append(`<div class="carousel-item active">
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
        $(".carousel-indicator").removeClass("active");
        $(".carousel-inner").append(`<div class="carousel-item">
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
    //#endregion testimonials

    //#region pdf data
    $(".username_pdf").append(data.fullName);
    $(".profession_pdf").append(data.profession);
    $(".address_pdf").append(data.basicInfo.address);
    $(".mailAndMobile_pdf").append(
      data.basicInfo.mobile + " - " + data.basicInfo.email
    );
    $(".about_pdf").append(data.about);
    // doc.textWithLink(text, {url: getPlatformName(data.links) });
    // document.querySelector(".linkedIn_pdf").href = getPlatformName(
    //   data.socialLinks
    // );
    $.each(data.skills, (i, skill) =>
      $(".skill_pdf").append(`${skill.name}, `)
    );
    $.each(data.education, (i, edu) =>
      $(".education_pdf").append(
        `<p>${edu.institution} - ${edu.subject}<br>${edu.yearOfGraduation}</p><br>`
      )
    );
    $.each(data.experiences, (i, exp) => {
      $(".experience_pdf").append(
        `<p><b>${exp.profession} - ${exp.company}</b><br>${exp.duration}<br>${exp.description}</p><br>`
      );
    });
    $.each(data.licensesAndCertifications, (i, lcct) =>
      $(".licensesAndCertifications_pdf").append(
        `<p><a href="${lcct.link}"><b>${lcct.name}</b></a> - ${lcct.institution}</p>`
      )
    );
    //#endregion pdf data

    //#region generate pdf
    $(document).on("click", "#gpdf", function () {
      DOC.fromHTML($("#pdf").html(), 20, 0, {
        width: 550,
        pagesplit: true,
      });
      DOC.save(`${data.fullName}'s Resume.pdf`);
    });
    //#endregion generate pdf
  });
  //#endregion local data

})();
