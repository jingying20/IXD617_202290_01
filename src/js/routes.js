
import { query } from "./functions.js"
import { makeMap, makeMarkers } from "./maps.js";
import { makeBenchList, makeBenchMapDescription, makeBenchProfileDescription, makeEditBenchForm, makeEditUserForm, makeUserProfilePage } from "./parts.js";


export const RecentPage = async() => {
    let {result:bench_locations} = await query({
        type:"recent_bench_locations",
        params:[sessionStorage.userId]
    });
    console.log(bench_locations);

    let valid_benches = bench_locations.reduce((r,o)=>{
        o.icon = o.img;
        if (o.lat && o.lng) r.push(o);
        return r;
    },[])

    let map_el = await makeMap("#recent-page .map");
    makeMarkers(map_el,valid_benches);

    map_el.data("markers").forEach((m,i)=>{
        // console.log(m)
        m.addListener("click",function(e){
            // console.log(e)
            let bench = valid_benches[i];
            // console.log(bench)

            // Just Navigate
            // sessionStorage.benchId = bench.bench_id;
            // $.mobile.navigate("#bench-profile-page")

            // Open Google InfoWindow
            // let {map,infoWindow} = map_el.data();
            // infoWindow.open(map, m);
            // infoWindow.setContent(makeBenchMapDescription(bench));

            $("#map-recent-modal")
                .addClass("active")
                .find(".modal-body")
                .html(makeBenchMapDescription(bench))
        })
    });
}

export const ListPage = async() => {

    let {result:benches} = await query({
        type:"benches_by_user_id",
        params:[sessionStorage.userId]
    });

    console.log(benches)

    $("#list-page .benchlist").html(makeBenchList(benches))
    $(".filter-bar").html(makeFilterList(benches))
}

export const UserProfilePage = async() => {
    let {result:users} = await query({
        type:"user_by_id",
        params:[sessionStorage.userId]
    });
    let [user] = users;

    console.log(user)

    $("#user-profile-page .body").html(makeUserProfilePage(user))
   
}

export const BenchProfilePage = async() => {
    let {result:benches} = await query({
        type:"bench_by_id",
        params:[sessionStorage.benchId]
    });
    let [bench] = benches;

    $(".bench-profile-top").css({"background-image":`url(${bench.img})`})
    $("#bench-profile-page h1").html(bench.name);
    $("#bench-profile-page .section-description").html(makeBenchProfileDescription(bench));

    let {result:locations} = await query({
        type:"locations_by_bench_id",
        params:[sessionStorage.benchId]
    });
    console.log(locations)

    let map_el = await makeMap("#bench-profile-page .map");
    makeMarkers(map_el,locations);
}

export const ChooseLocationPage = async() => {
    let map_el = await makeMap("#choose-location-page .map");
    makeMarkers(map_el,[]);
    map_el.data("map").addListener("click",function(e){
        console.log(e)
        $("#location-lat").val(e.latLng.lat());
        $("#location-lng").val(e.latLng.lng());
        makeMarkers(map_el, [{
            lat:e.latLng.lat(),
            lng:e.latLng.lng(),
            icon:'images/icons/marker.png'
        }]);
    })
}



export const UserEditPage = async() => {
    let {result:users} = await query({
        type:"user_by_id",
        params:[sessionStorage.userId]
    });
    let [user] = users;

    $("#user-edit-page .body").html(makeEditUserForm(user));
}
export const UserEditPhotoPage = async() => {
    let {result:users} = await query({
        type:"user_by_id",
        params:[sessionStorage.userId]
    });
    let [user] = users;

    $("#user-edit-photo-page .body").css({
        "background-image": `url('${user.img}')`
    });
}


export const BenchAddPage = async() => {
    $("#bench-add-page .body").html(makeEditBenchForm({
        bench:{
            name:'',
            type:'',
            style:'',
            description:'',
        },
        namespace:'bench-add'
    }));
}

export const BenchEditPage = async() => {
    let {result:benches} = await query({
        type:"bench_by_id",
        params:[sessionStorage.benchId]
    });
    let [bench] = benches;

    $("#bench-edit-page .body").html(makeEditBenchForm({
       bench,
        namespace:'bench-edit'
    }));
}
