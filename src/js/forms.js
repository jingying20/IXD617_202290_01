
import { query } from "./functions.js";
import { makeBenchList } from "./parts.js";



export const checkSignupForm = () => {
    let username = $("#signup-username").val();
    let email = $("#signup-email").val();
    let password = $("#signup-password").val();
    let confirm = $("#signup-confirm").val();
    
    if (password !== confirm) {
        // tell user to try again
        throw("password failed, show the user");
        return;
    }

    query({
        type: 'insert_user',
        params: [
            username,
            email,
            password
        ]
    }).then((data)=>{
        if (data.error) {
            throw(data.error);
            // We should show how they failed to them
        } else {
            sessionStorage.userId = data.id;
            $.mobile.navigate("#list-page");
        }
    })
}



export const checkUserEditForm = () => {
    let name = $("#user-edit-name").val();
    let username = $("#user-edit-username").val();
    let email = $("#user-edit-email").val();

    query({
        type: 'update_user',
        params: [
            name,
            username,
            email,
            sessionStorage.userId
        ]
    }).then((data)=>{
        if (data.error) {
            throw(data.error);
        } else {
            window.history.back();
        }
    })
}
export const checkPasswordEditForm = () => {
    let password = $("#password-edit-password").val();
    let confirm = $("#password-edit-confirm").val();

    if (password !== confirm) {
        // tell user to try again
        return;
    }

    query({
        type: 'update_password',
        params: [
            password,
            sessionStorage.userId
        ]
    }).then((data)=>{
        if (data.error) {
            throw(data.error);
        } else {
            window.history.go(-1);
        }
    })
}
export const checkUserEditPhotoForm = () => {
    let photo = $("#user-edit-photo-image").val();
    
    query({
        type: 'update_user_photo',
        params: [
            photo,
            sessionStorage.userId
        ]
    }).then((data)=>{
        if (data.error) {
            throw(data.error);
        } else {
            window.history.go(-1);
        }
    })
}





export const checkBenchAddForm = () => {
    let name = $("#bench-add-name").val();
    let type = $("#bench-add-type").val();
    let style = $("#bench-add-style").val();
    let description = $("#bench-add-description").val();
    let image = $("#bench-add-photo-image").val();

    query({
        type: 'insert_bench',
        params: [
            sessionStorage.userId,
            name,
            type,
            style,
            description,
            image
        ]
    }).then((data)=>{
        if (data.error) {
            throw(data.error);
        } else {
            window.history.back();
        }
    })
}
export const checkBenchEditForm = () => {
    let name = $("#bench-edit-name").val();
    let type = $("#bench-edit-type").val();
    let style = $("#bench-edit-style").val();
    let description = $("#bench-edit-description").val();
    let image = $("#bench-edit-photo-image").val();

    query({
        type: 'update_bench',
        params: [
            name,
            type,
            style,
            description,
            image,
            sessionStorage.benchId
        ]
    }).then((data)=>{
        if (data.error) {
            throw(data.error);
        } else {
            window.history.back();
        }
    })
}
export const checkBenchDeleteForm = () => {
    query({
        type:"delete_bench",
        params:[sessionStorage.benchId]
    }).then((data)=>{
        if (data.error) {
            throw(data.error);
        } else {
            window.history.back();
        }
    })
}



export const checkLocationAddForm = () => {
    let benchid = $("#location-bench-id").val();
    let lat = $("#location-lat").val();
    let lng = $("#location-lng").val();
    let description = $("#location-description").val();

    let back = +$("#location-back").val();

    
    query({
        type:"insert_location",
        params:[benchid,lat,lng,description]
    }).then((data)=>{
        if (data.error) {
            throw(data.error);
        } else {
            window.history.go(back);
        }
    })
}





export const checkListSearchForm = (search) => {
    query({
        type:"search_benches",
        params:[`%${search}%`,sessionStorage.userId]
    }).then((data)=>{
        if (data.error) {
            throw(data.error);
        } else {
            let {result} = data;
            $("#list-page .benchlist").html(makeBenchList(result))
        }
    })
}
export const checkListFilter = (filter,value) => {
    query({
        type:"filter_benches",
        params:[filter,value,sessionStorage.userId]
    }).then((data)=>{
        if (data.error) {
            throw(data.error);
        } else {
            let {result} = data;
            $("#list-page .benchlist").html(makeBenchList(result));
        }
    })
}