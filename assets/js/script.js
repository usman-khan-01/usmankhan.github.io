// const IMG = new Image();
// const EMAIL_PATTERNS = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const DOC = new jsPDF("p", "pt", "A4");
const ALL = "all";
const ASP = "aspnet";
const ANG = "angular";
const WORD = "wordpress";

getPlatformName = (s) => console.log(s[0].link);

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
  $.getJSON("./assets/data/data.json", (data) => {
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
    $.each(basicInformation, (i, value) => {
      $(".pInfo .text-uppercase").append(value + ":" + "<br><br>");
    });
    $.each(data.basicInfo, (i, value) => {
      $(".pInfoValue").append(
        value != null && value === `${/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/g}`
          ? `<a href="mailto:${value}">${value}</a><br><br>`
          : value + "<br><br>"
      );
    });
    //#endregion basic info

    //#region skills
    $.each(data.skills, (i, skill) => {
      $(".skills").append(`
            <div class="col-md-4 skill">
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
    $.each(data.portfolioHeadings, (i, ph) => {
      $(".portfolio-heading").append(`
        <li class="nav-item ${ph.link}"><a class="nav-link ${ph.active}" data-toggle="tab" href="#${ph.link}" role="tablist">${ph.name}</a></li>
      `);
    });

    $(`#portfolios .container`).append(`
      <div class="tab-pane">
        <div class="row" id="${ALL}"></div>
        <div class="row" id="${ASP}"></div>
        <div class="row" id="${ANG}"></div>
        <div class="row" id="${WORD}"></div>
      </div>
    `);

    $.each(data.portfolios, (i, p) => {
      Portfolios(p);
    });
    //#endregion portfolio

    //#region experiences
    $.each(data.experiences, (i, exp) => {
      $(".experiences-list").append(`
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
    $.each(data.education, (i, edu) => {
      $(".education-list").append(`
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
    $.each(data.testimonials, (i, t) => {
      $(".carousel-indicators").append(
        `<li class="carousel-indicator" data-target="#cc-Indicators" dataSlideTo="0"></li>`
      );
      if (i == 0) {
        $(".carousel-indicator").addClass("active");
        $(".carousel-inner").append(`<div class="carousel-item active">
                <div class="row testimonial">
                    <div class="col-lg-2 col-md-3 cc-reference-header">
                        <a target="_blank">
                            <img src="${t.imageUrl}" alt="${t.name}'s Image" />
                        </a>
                        <div class="h5 pt-2">${t.name}</div> <p class="category">${t.country}</p> </div>
                    <div class="col-lg-10 col-md-9"> <p>${t.review}</p> </div>
                </div>
            </div>`);
      } else {
        $(".carousel-indicator").removeClass("active");
        $(".carousel-inner").append(`<div class="carousel-item">
                <div class="row testimonial">
                    <div class="col-lg-2 col-md-3 cc-reference-header">
                        <a target="_blank">
                            <img src="${t.imageUrl}" alt="${t.name}'s Image" />
                        </a>
                        <div class="h5 pt-2">${t.name}</div> <p class="category">${t.country}</p> </div>
                    <div class="col-lg-10 col-md-9"> <p>${t.review}</p> </div>
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
    $(document).on("click", "#gpdf", () => {
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

//#region functions

function Show(id) {
  if(id == ALL){
    $(`#${id}`).show();
    Hide(ASP, ANG);
    Hide(WORD)
  }else {
    $(`#${id}`).show();
  }
}

function Hide(id, all) {
  $(`#${id}`).hide();
  $(`#${all}`).hide();
}

function ShowOrHidePortfoliosBasedOnCondition(id) {
  $(`.${ALL}`).click(() => Show(ALL));
  $(`.${ASP}`).click(() => (id == ASP ? Show(id) : Hide(id, ALL)));
  $(`.${ANG}`).click(() => (id == ANG ? Show(id) : Hide(id, ALL)));
  $(`.${WORD}`).click(() => (id == WORD ? Show(id) : Hide(id, ALL)));
}

function Portfolios(p) {
  PortfolioHtml(p, ALL);
  Hide(p.hId, null);
  ShowOrHidePortfoliosBasedOnCondition(p.hId);
  PortfolioHtml(p, p.hId);
}

function PortfolioHtml(p, id) {
  $(`#${id}`).append(`
    <div class="tab-content gallery mt-5 col-md-4" style="padding-bottom: 20px">
      <div class="cc-porfolio-image img-raised" data-aos="fade-up" data-aos-anchor-placement="top-bottom">
        <a href="${p.link}" target="_blank">
          <figure class="cc-effect">
            <img src="${p.imageUrl}" id="${p.hId}-img" alt="${p.name}" />
              <figcaption>
                <div class="h4">${p.framework} <i class="fa fa-external-link" aria-hidden="true"></i></div>
                <p>${p.name}</p>
                <p>${p.description}</p>
            </figcaption>
          </figure>
        </a>
      </div>
    </div>  
  `);
}
//#endregion functions
