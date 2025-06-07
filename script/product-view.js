let mainImg = document.querySelector(".main-image");
let image1 = document.getElementById("image1");
let image2 = document.getElementById("image2");
let image3 = document.getElementById("image3");
let image4 = document.getElementById("image4");

/*meta options*/

function activeOption1() {
  document.getElementById("option2").classList.remove("active");
  document.getElementById("option3").classList.remove("active");
  document.getElementById("option4").classList.remove("active");
  document.getElementById("option1").classList.toggle("active");
}

function activeOption2() {
  document.getElementById("option1").classList.remove("active");
  document.getElementById("option3").classList.remove("active");
  document.getElementById("option4").classList.remove("active");
  document.getElementById("option2").classList.toggle("active");
}

function activeOption3() {
  document.getElementById("option1").classList.remove("active");
  document.getElementById("option2").classList.remove("active");
  document.getElementById("option4").classList.remove("active");
  document.getElementById("option3").classList.toggle("active");
}

function activeOption4() {
  document.getElementById("option1").classList.remove("active");
  document.getElementById("option2").classList.remove("active");
  document.getElementById("option3").classList.remove("active");
  document.getElementById("option4").classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", function () {
  const reviewToggle = document.getElementById("reviewToggle");
  const reviewContent = document.getElementById("reviewContent");
  const toggleIcon = document.querySelector(".toggle-icon");

  reviewContent.style.display = "none";

  reviewToggle.addEventListener("click", function () {
    if (reviewContent.style.display === "none") {
      reviewContent.style.display = "block";
      toggleIcon.innerHTML = "▲";
    } else {
      reviewContent.style.display = "none";
      toggleIcon.innerHTML = "▼";
    }
  });

  const decrease = document.getElementById("quantity-decrease");
  const increase = document.getElementById("quantity-increase");
  const quantity = document.getElementById("quantity");

  decrease.addEventListener("click", function () {
    if (quantity.value >= 2) {
      quantity.value--;
    }
  });
  increase.addEventListener("click", function () {
    quantity.value++;
  });

  /*Change Main Image*/
});

document.addEventListener("DOMContentLoaded", function () {
  image1.addEventListener("click", function () {
    image1.classList.add("active");
    image2.classList.remove("active");
    image3.classList.remove("active");
    image4.classList.remove("active");
    mainImg.querySelector("img").src = image1.querySelector("img").src;
  });

  image2.addEventListener("click", function () {
    image2.classList.add("active");
    image1.classList.remove("active");
    image3.classList.remove("active");
    image4.classList.remove("active");
    mainImg.querySelector("img").src = image2.querySelector("img").src;
  });

  image3.addEventListener("click", function () {
    image3.classList.add("active");
    image2.classList.remove("active");
    image1.classList.remove("active");
    image4.classList.remove("active");
    mainImg.querySelector("img").src = image3.querySelector("img").src;
  });

  image4.addEventListener("click", function () {
    image4.classList.add("active");
    image2.classList.remove("active");
    image1.classList.remove("active");
    image3.classList.remove("active");
    mainImg.querySelector("img").src = image4.querySelector("img").src;
  });
});

/* Product View */

document
  .querySelector(".lower-review button")
  .addEventListener("click", function () {
    let review = document.getElementById("reviewContent");
    let comment = document.querySelector(
      ".customer-review-input form textarea"
    ).value;

    let userData = JSON.parse(localStorage.getItem("userData"));

    if (userData === null) {
      alert("Please login first.");
      return;
    }
    review.innerHTML += `
                  <div class="customer-review">
                    <div class="review-info">
                        <img src="../images/user.png" alt="user image">
                        <div class="reviewer-name">${userData.username}</div>
                        <div class="review-date">May 26, 2025</div>
                        <div class="review-stars">
                            <span class="star"><i class="fas fa-star"></i></span>
                            <span class="star"><i class="fas fa-star"></i></span>
                            <span class="star"><i class="fas fa-star"></i></span>
                            <span class="star"><i class="fas fa-star"></i></span>
                            <span class="star"><i class="fas fa-star"></i></span>
                        </div>
                    </div>
                    <div class="review-text">
                        <p>${comment}</p>
                    </div>
                </div>
  `;
  });
