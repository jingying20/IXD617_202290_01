import { templater } from "./functions.js";


export const makeBenchList = templater(({id,name,type,style,img})=>`
<a class="benchlist-item bench-jump" href="#bench-profile-page" data-id="${id}">
    <div class="benchlist-image"><img src="${img}"></div>
    <div class="benchlist-body">
        <div class="benchlist-name">${name}</div>
        <div class="benchlist-type">${type}</div>
        <div class="benchlist-style">${style}</div>
    </div>
</a>
`)

export const makeUserProfilePage = ({name,email,username,img})=>`
<div>
    <div class="user-profile-image"><img src="${img}"></div>
    <div class="user-profile-body">
        <div class="user-profile-name">${name}</div>
        <div class="user-profile-style">@${username}</div>
        <div class="user-profile-email">${email}</div>
    </div>
</div>
`

export const makeBenchProfileDescription = ({name,type,style})=>`
<h2>${name}</h2>
<div>${type}</div>
<div>${style}</div>
`


export const makeBenchMapDescription = ({name,type,style,img}) => {
    return `<div class="bench-map-description display-flex">
        <div class="bench-map-image">
            <img src="${img}" />
        </div>
        <div class="bench-map-body">
            <h1>${name}</h1>
            <div>${type}</div>
            <div>${style}</div>
        </div>
    </div>`;
}



export const makeEditUserForm = ({name,username,email}) => {
    
    return `<div class="form-control">
        <label class="form-label" for="user-edit-username">Username</label>
        <input class="form-input" type="text" id="user-edit-username" data-role="none" placeholder="Type your Username" value="${username}">
    </div>
    <div class="form-control">
        <label class="form-label" for="user-edit-name">Name</label>
        <input class="form-input" type="text" id="user-edit-name" data-role="none" placeholder="Type your Name" value="${name}">
    </div>
    <div class="form-control">
        <label class="form-label" for="user-edit-email">Email</label>
        <input class="form-input" type="text" id="user-edit-email" data-role="none" placeholder="Type your Email" value="${email}">
    </div>`
}




const FormControlInput = ({namespace,name,displayname,type,placeholder,value}) => {
    return `<div class="form-control">
        <label class="form-label" for="${namespace}-${name}">${displayname}</label>
        <input class="form-input" type="${type}" id="${namespace}-${name}" data-role="none" placeholder="${placeholder}" value="${value}">
    </div>`
}
const FormControlTextarea = ({namespace,name,displayname,placeholder,value}) => {
    return `<div class="form-control">
        <label class="form-label" for="${namespace}-${name}">${displayname}</label>
        <textarea class="form-input" id="${namespace}-${name}" data-role="none" placeholder="${placeholder}">${value}</textarea>
    </div>`
}


export const makeEditBenchForm = ({bench,namespace}) => {
    return `
    ${FormControlInput({
        namespace,
        name: "name",
        displayname: "Name",
        type: "text",
        placeholder: "Type a Name",
        value: bench.name
    })}
    ${FormControlInput({
        namespace,
        name: "type",
        displayname: "Type",
        type: "text",
        placeholder: "Type a Type",
        value: bench.type
    })}
    ${FormControlInput({
        namespace,
        name: "style",
        displayname: "style",
        type: "text",
        placeholder: "Type a Style",
        value: bench.style
    })}
    ${FormControlTextarea({
        namespace,
        name: "description",
        displayname: "Description",
        placeholder: "Type a Description",
        value: bench.description
    })}
    `;
}

const filterList = (benches,type) => {
    let arr = [...(new Set(benches.map(o=>o[type])))];
    return templater(o=>o?`<span data-filter="${type}" data-value="${o}">${o}</span>`:'')(arr);
}


export const makeFilterList = (benches) => {
    return `
        <span data-filter="type" data-value="">All</span>
        |
        ${filterList(benches,'type')}
        |
        ${filterList(benches,'style')}
    `
}