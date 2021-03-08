let modalBody = $(".modal-body"),
    modalFooter = $(".modal-footer")
// ============================ Search section =======================

// go to search-bar action
$(document).on("keyup", function (e) {
    if (e.key === "/") {
        $("[type='search']").focus()

        // $("[type='search']").toggleClass("shadow");
    }
    if (e.key === "Escape") {
        $("[type='search']").blur()
        // $("[type='search']").toggleClass("shadow");
    }
})

// search sync rendering page
$("[type='search']").keyup(function (e) {
    let searchQuery = $(this).val().trim().toLowerCase()
    // searchProducts(searchQuery)
});

// // search functionality
// function searchProducts(searchQuery) {

//     if (searchQuery === "") return renderCards(db)
//     // console.log(db);

//     // solution-1 simple search by includes function
//     // let filteredProducts = db.filter(el => {
//     //     return el["id"] == parseInt(searchQuery) || el["name"].includes(searchQuery) ||
//     //         el["color"].includes(searchQuery) || el["size"] == parseInt(searchQuery) ||
//     //         el["type"].includes(searchQuery) || el["id"] == parseInt(searchQuery) ||
//     //         el["image"].includes(searchQuery)

//     // })

//     // solution-2 improved search by includes function
//     let filteredProducts = db.filter(el => {
//         let searchSource = ""
//         // console.log(searchSource.concat(el["id"], el["name"], el["color"], el["size"], el["type"], el["id"], el["image"]).toLowerCase());
//         return searchSource.concat(el["id"], el["name"], el["color"], el["size"], el["type"], el["id"], el["image"], el["price"]).toLowerCase().includes(searchQuery)

//     })

//     // solution-3  regex

//     // console.log(filteredProducts);
//     renderCards(filteredProducts)
// }

// ========================== hover effects ===========================
// card hover shadow
$(document).on("mouseover mouseout", ".card", function () {
    // over
    $(this).toggleClass("shadow");
});

// // btn hover shadow 
$("body").on("mouseover mouseout", ".btn-more", function () {
    // over
    $(this).toggleClass("shadow");
});

// ======================= Delete button ============================
$(document).on("click", "[role='delete-card']", function (e) {
    let cardId = String($(this).attr('card-id'))
    console.log(cardId);
    $.ajax({
        type: "DELETE",
        url: `/company/delete?id=${cardId}`,
        success: function (response) {
            console.log("success:", response);
            location.reload()
        },
        error: function (err) {
            console.log("error:", err);
            alert(err)
        }
    })
})

// ============================ Modal Section ============================
// new button modal
$(document).on("click", "#new-button", function (e) {
    showNewInfo()
})

// render modal form for creating info
function showNewInfo(data) {
    modalBody.html('')
    modalBody.append(`
    <form class=" bg-mute"> 
        <div class="mb-2">
            <label for="name" class="form-label">name : </label>
            <input type="text" class="form-control " name="name" required>
        </div>
        <div class="mb-2">
            <label for="cin" class="form-label text-uppercase">cin: </label>
            <input type="text" class="form-control" name="cin" required>
        </div>
        <div class="mb-2">
            <label for="city" class="form-label">city: </label>
            <input type="text" class="form-control" name="city" required>
        </div>
        <div class="mb-2">
            <label for="province" class="form-label">province: </label>
            <input type="text" class="form-control" name="province" required>
        </div>
        <div class="mb-2">
            <label for="register-date" class="form-label">register date: </label>
            <input type="date" class="form-control" name="register-date" required>
        </div>
        <div class="">
            <label for="telephone" class="form-label">telephone: </label>
            <input type="text" class="form-control" name="telephone" required>
        </div>
    </form>
    `)

    modalFooter.html(`
    <button id="create-button" class="text-white btn btn-outline-success offset-left" data-bs-dismiss="modal"> Create </button>
    `)
}

// create button click action
$(document).on("click", "#create-button", function (e) {
    let newInformation = getInformations()
    $.ajax({
        type: "POST",
        url: "/company/create",
        data: newInformation,
        dataType: "json",
        success: function (response) {
            if (response) {
                console.log("success: ", response);
                location.reload()
            }
        },
        error: function (err) {
            if (err) {
                console.log("error: ", err);
            }
        }
    });
})

// getting new informations
function getInformations() {

    let inputs = {
        "name": $("[name='name']").val(),
        "cin": $("[name='cin']").val(),
        "city": $("[name='city']").val(),
        "province": $("[name='province']").val(),
        "registerDate": new Date($("[name='register-date']").val()).toISOString(),
        "telephone": $("[name='telephone']").val()
    }
    return inputs
}

// show more button
$(document).on("click", ".btn-more", function (e) {
    let cardId = $(this).attr("card-id")
    $.ajax({
        type: "GET",
        url: `/company/get/q=?id=${cardId}`,
        success: function (response) {
            console.log("success:", response);
            showMoreInfo(response[0])
        },
        error: function (err) {
            console.log("error:", err);
            alert(err)
        }
    });
})

// render modal form for more info
function showMoreInfo(data) {
    let registerDate = new Date(data.registerDate)

    modalBody.html('')
    modalBody.append(`
    <form class=" bg-mute"> 
        <div class="mb-2">
            <label for="name" class="form-label">name : </label>
            <input disabled type="text" class="form-control " name="name" value=${data.name} required>
        </div>
        <div class="mb-2">
            <label for="cin" class="form-label text-uppercase">cin: </label>
            <input disabled type="text" class="form-control" name="cin" value=${data.cin} required>
        </div>
        <div class="mb-2">
            <label for="city" class="form-label">city: </label>
            <input disabled type="text" class="form-control" name="city" value=${data.city} required>
        </div>
        <div class="mb-2">
            <label for="province" class="form-label">province: </label>
            <input disabled type="text" class="form-control" name="province" value=${data.province} required>
        </div>
        <div class="mb-2">
            <label for="register-date" class="form-label">register date: </label>
            <input disabled type="date" class="form-control" name="register-date" value="${registerDate.getFullYear()}-0${registerDate.getMonth()+1}-0${registerDate.getDay()}" required>
        </div>
        <div class="">
            <label for="telephone" class="form-label">telephone: </label>
            <input disabled type="text" class="form-control" name="telephone" value=${data.telephone} required>
        </div>
    </form>
    `)

    modalFooter.html(`
    <button id="update-button" type="button" class="btn btn-warning">Update</button>
    <button id="cancel-button" hidden class="text-white btn btn-outline-dark offset-left" > cancel </button>
    <button card-id="${data._id}" id="save-button"  hidden class="text-white btn btn-outline-success offset-left" data-bs-dismiss="modal"> Save </button>
    `)
}

// update button click
$(document).on("click", "#update-button", function (e) {
    $("#update-button").attr("hidden", "true")
    $("#save-button").removeAttr("hidden")
    $("#cancel-button").removeAttr("hidden")
    $("form input").removeAttr("disabled")

})

// cancel button click
$(document).on("click", "#cancel-button", function (e) {
    $("#update-button").removeAttr("hidden", "hidden")
    $("#save-button").attr("hidden", "hidden")
    $("#cancel-button").attr("hidden", "hidden")
    $("form input").attr("disabled", "true")

})

// save update click
$(document).on("click", "#save-button", function (e) {
    console.log("saveing proccess started");
    let newInformation = getInformations(),
        cardId = $(this).attr("card-id")

    $.ajax({
        type: "put",
        url: `/company/update?id=${cardId}`,
        data: newInformation,
        dataType: "json",
        success: function (response) {
            if (response) {
                console.log("success: ", response);
                location.reload()
            }
        },
        error: function (err) {
            if (err) {
                console.log("error: ", err);
            }
        }
    });
})