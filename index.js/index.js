var sName = document.getElementById('siteName')
var sLink = document.getElementById('siteURL')
var Submit = document.getElementById('submit')
var inner = document.getElementById('inner')
var closebtn = document.getElementById('closebtn')
var innerbox = document.querySelector('innerbox')
var lightbox = document.querySelector('ligh-box')


function isValidUrl(url) {
    var regex = /^(ftp|http|https):\/\/[^\s/$.?#].[^\s]*$/i;
    return regex.test(url)
}

sName.addEventListener('keyup', function () {
    if (sName.value.length < 3) {
        sName.classList.add('invalid!')
    } else {
        sName.classList.replace('invalid!', 'is-valid')

    }

})


sLink.addEventListener('keyup', function () {
    if (!isValidUrl(sLink.value)) {
        sLink.classList.add("is-invalid")
    } else {
        sLink.classList.replace("is-invalid", "is-valid")
    }
})

Submit.addEventListener("click", function (e) {
    if (sName.value.length < 3 || !isValidUrl(sLink.value)) {
        inner.classList.replace("d-none", "d-flex");
    } else {
        inner.classList.replace("d-flex", "d-none");
        addBookmark()
    }
    console.log(e)

})


function closeitem() {
    inner.classList.replace("d-flex", "d-none")
}

closebtn.addEventListener("click", closeitem)
document.addEventListener("keyup", function (event) {
    if (event.key == 'Escape') {
        closeitem()
    }
})

lightbox.addEventListener("click", function () {
    closeitem()
})
innerbox.addEventListener("click", function (e) {
    e.stopPropagation();
})

var List = [];

if (localStorage.getItem("Data") != null) {
    List = JSON.parse(localStorage.getItem("Data"))
    displayBookmark()
}


function addBookmark() {
    var bookmark = {
        sName: sName.value,
        sLink: sLink.value
    }
    localStorage.setItem("Data", JSON.stringify(List))
    List.push(bookmark)
    displayBookmark()
    clearInput()
}

function clearInput() {
    sName.value = ''
    sLink.value = ''
    sName.classList.remove('valid')
    sLink.classList.remove('valid')
}

function displayBookmark() {
    var temp = '';
    for (var i = 0; i < List.length; i++) {
        temp += `                 <tr class="text-white">
                    <th scope="row">`+ (i) + `</th>
                    <td>`+ List[i].sName + `</td>
                    <td><a target="_blank" href="`+ List[i].sLink + `"><button type="button" class="btn button2 text-white px-3"> <i class="fa-solid fa-eye px-1 text-white"></i> Visit</button></a></td>
                    <td><button type="button" class="btn btn-danger" onclick="deleteBookmark(`+ i + `)"><i class="fa-solid fa-trash px-1 text-white"></i> Danger</button></td>
                </tr>`
    }
    document.getElementById("tables").innerHTML = temp
}

function deleteBookmark(x) {
    List.splice(x, 1);
    displayBookmark();
    localStorage.setItem("Data", JSON.stringify(List));

}









