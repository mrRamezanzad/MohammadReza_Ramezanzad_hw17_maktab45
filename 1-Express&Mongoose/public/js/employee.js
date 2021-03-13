let modalBody = $(".modal-body"),
    modalFooter = $(".modal-footer"),
    modal = new bootstrap.Modal(document.getElementById('more-info-modal')),
    msgAlert = new bootstrap.Alert(document.getElementById('myAlert'))

// delete card button click and ajax
$(".delete-employee").on("click", function (e) {

    $.ajax({
        type: "DELETE",
        url: `http://localhost/api/employees/${$(this).attr("card-id")}`,
        success: function (response) {
            if (response) {
                console.log("SUCCESS MESSAGE===>", response);
                location.reload()

            }
        },
        error: function (err) {
            if (err) console.log("ERROR MESSAGE===>", err);

        }
    });
})

// edit button click
$('.edit-employee').on("click", function (e) {
    $.ajax({
        type: "GET",
        url: `http://localhost/api/employees/${$(this).attr('card-id')}`,
        success: function (employee) {
            // console.log("SUCCESS MESSAGE===>", employee[0]);
            modal.show()
            $.ajax({
                type: "GET",
                url: "http://localhost/api/companies/",
                success: function (companies) {
                    // console.log("SUCCESS MESSAGE===>", companies);
                    showEditModal(employee[0], companies)
                },
                error: function (err) {
                    // if (err) console.log("ERROR MESSAGE===>", err);

                }
            });
        },
        error: function (err) {
            if (err) console.log("ERROR MESSAGE===>", err);

        }
    })
})

function showEditModal(employee, companies) {

    let companySelect = ""

    companies.forEach(company => {
        companySelect += `<option ${company._id === employee.company._id ? "selected": ""} value="${company._id}">${company.name}</option>`
    })

    console.log(companySelect);

    employee.birthday = new Date(employee.birthday)
    // reset the modal conent
    modalBody.html('')

    // render modal edit form
    modalBody.html(`
        <form class="needs-validation">
            <label class=" mb-1" for="id">id:</label>
            <input class="form-control" type="text" name="id", value="${employee.id}" placeholder = "id" disabled>
            
            <label class="mt-2 mb-1" for="first-name">first name:</label>
            <input class="form-control" type="text" name="first-name", value="${employee.firstName}" placeholder = "first name">
            
            <label class="mt-2 mb-1" for="last-name">last name:</label>
            <input class="form-control" type="text" name="last-name", value="${employee.lastName}" placeholder = "first name" required>
            
            <label class="mt-2 mb-1" for="gender">gender:</label>
            <select class="form-select" aria-label="gender">
            <option ${employee.gender === "male" ? "selected": ""} value="male">male</option>
            <option ${employee.gender === "female" ? "selected": ""} value="female">female</option>
            </select>
            
            <label class="mt-2 mb-1" for="position">position:</label>
            <select class="form-select" aria-label="manager">
            <option ${employee.manager === "true" ? "selected": ""} value="male">manager</option>
            <option ${employee.manager === "false" ? "selected": ""} value="female">employee</option>
            </select>
            
            <label class="mt-2 mb-1" for="birthday">birthday:</label>
            <input class="form-control form-control-date" type="date" name="birthday", value="${employee.birthday.getFullYear()}-0${employee.birthday.getMonth()+1}-0${employee.birthday.getDay()}" placeholder = "birthday">
            
            <label class="mt-2 mb-1" for="company">company:</label>

            <select class="form-select" aria-label="manager">
                ${companySelect}
            </select>
            
            <div class="d-flex justify-content-end ">
                <button type="submit" class="btn btn-success w-auto mt-3 mb-0 justify-self-end">save</button>
            </div>

        </form>
            `)

}