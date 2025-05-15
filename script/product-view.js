let mainImg = document.getElementById('main-image');
let image1 = document.getElementById('image1');
let image2 = document.getElementById('image2');
let image3 = document.getElementById('image3');
let image4 = document.getElementById('image4');

function activeOption1() {
    document.getElementById('option2').classList.remove('active');
    document.getElementById('option3').classList.remove('active');
    document.getElementById('option4').classList.remove('active');
    document.getElementById('option1').classList.toggle('active');
    document.getElementById('price').value = 633;
    document.getElementById('product-price').textContent = '₱ 663.00';
    mainImg.querySelector('img').src = image1.querySelector('img').src;
}

function activeOption2() {
    document.getElementById('option1').classList.remove('active');
    document.getElementById('option3').classList.remove('active');
    document.getElementById('option4').classList.remove('active');
    document.getElementById('option2').classList.toggle('active');
    document.getElementById('price').value = 899;
    document.getElementById('product-price').textContent = '₱ 899.00';
    mainImg.querySelector('img').src = image2.querySelector('img').src;
}

function activeOption3() {
    document.getElementById('option1').classList.remove('active');
    document.getElementById('option2').classList.remove('active');
    document.getElementById('option4').classList.remove('active');
    document.getElementById('option3').classList.toggle('active');
    document.getElementById('price').value = 1199;
    document.getElementById('product-price').textContent = '₱ 1199.00';
    mainImg.querySelector('img').src = image3.querySelector('img').src;
}

function activeOption4() {
    document.getElementById('option1').classList.remove('active');
    document.getElementById('option2').classList.remove('active');
    document.getElementById('option3').classList.remove('active');
    document.getElementById('option4').classList.toggle('active');
    document.getElementById('price').value = 1499;
    document.getElementById('product-price').textContent = '₱ 1499.00';
    mainImg.querySelector('img').src = image4.querySelector('img').src;
}

document.addEventListener('DOMContentLoaded', function() {
    const reviewToggle = document.getElementById('reviewToggle');
    const reviewContent = document.getElementById('reviewContent');
    const toggleIcon = document.querySelector('.toggle-icon');
        
    reviewContent.style.display = 'none';
        
    reviewToggle.addEventListener('click', function() {
        if (reviewContent.style.display === 'none') {
            reviewContent.style.display = 'block';
            toggleIcon.innerHTML = '▲';
        } else {
            reviewContent.style.display = 'none';
            toggleIcon.innerHTML = '▼';
        }
    });

    const decrease = document.getElementById('quantity-decrease');
    const increase = document.getElementById('quantity-increase');
    const quantity = document.getElementById('quantity');

    decrease.addEventListener('click', function() {
        if(quantity.value >= 2 ) {
            quantity.value --;
        }
    });
    increase.addEventListener('click', function() {
        quantity.value ++;
    });

    image1.addEventListener('click', function() {
        image1.classList.add('active');
        image2.classList.remove('active');
        image3.classList.remove('active');
        activeOption1();
    });

    image2.addEventListener('click', function() {
        image2.classList.add('active');
        image1.classList.remove('active');
        image3.classList.remove('active');
        activeOption2();
    });

    image3.addEventListener('click', function() {
        image3.classList.add('active');
        image2.classList.remove('active');
        image1.classList.remove('active');
       activeOption3();
    });

});