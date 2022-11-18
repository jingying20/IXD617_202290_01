
import { checkUserEditForm } from "./forms.js";
import { BenchEditPage, BenchProfilePage, ChooseLocationPage, ListPage, RecentPage, UserEditPage, UserProfilePage } from "./routes.js";
import { checkSigninForm, checkUserId } from "./signin.js";

// Document Ready
$(() => {

    checkUserId();

    $(document)

    .on("pagecontainerbeforeshow", function(event, ui) {
        
        /* PAGE ROUTES */
        switch(ui.toPage[0].id) {
            case "recent-page": RecentPage(); break;
            case "list-page": ListPage(); break;

            case "user-profile-page": UserProfilePage(); break;
            case "user-edit-page": UserEditPage(); break;

            case "bench-profile-page": BenchProfilePage(); break;
            case "bench-edit-page": BenchEditPage(); break;

            case "choose-location-page": ChooseLocationPage(); break;
        }
    })


    // EVENT DELEGATION
    .on("submit", "#signin-form", function(e) {
        e.preventDefault();
        checkSigninForm();
    })
    .on("submit", "#user-edit-form", function(e) {
        e.preventDefault();
        checkUserEditForm();
    })






    .on("click", ".js-logout", function(e) {
        sessionStorage.removeItem("userId");
        checkUserId();
    })


    .on("click", ".bench-jump", function(e) {
        let id = $(this).data("id");

        sessionStorage.benchId = id;
    })
    .on("click", ".location-jump", function(e) {
        let id = $(this).data("id");

        sessionStorage.locationId = id;
    })


    .on("click", ".js-submit-user-edit-form", function(e) {
        checkUserEditForm();
    })


    .on("click", ".nav-link", function(e) {
        if (e.cancelable) e.preventDefault();
        let id = $(this).index();
        $(this).parent().next().children().eq(id)
            .addClass("active")
            .siblings().removeClass("active");
        $(this).addClass("active")
            .siblings().removeClass("active");
    })



    // ACTIVATE TOOLS
    .on("click", "[data-activate]", function(e) {
        const target = $(this).data("activate");
        $(target).addClass("active");
    })
    .on("click", "[data-deactivate]", function(e) {
        const target = $(this).data("deactivate");
        $(target).removeClass("active");
    })
    .on("click", "[data-toggle]", function(e) {
        const target = $(this).data("toggle");
        $(target).toggleClass("active");
    })
    .on("click", "[data-activateone]", function(e) {
        const target = $(this).data("activateone");
        $(target).toggleClass("active")
            .siblings().removeClass("active");
    })
});