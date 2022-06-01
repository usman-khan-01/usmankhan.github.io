// data
$(function () {
    $.getJSON('../data/data.json', function (data) {
        // basic info
        $('.navbar-brand').append(data.info.fullName);
        $('.name').append(data.info.fullName);
        $('.category').append(data.info.profession);
        document.querySelector('.profile-image').src = data.info.imageUrl;
        $('.aboutMe').append(data.info.about);
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
            $('.portfolios').append(`<div class="tab-content gallery mt-5 col-md-6">
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
            if (testimonial.id == 1) {
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

        // experience

    });
});