document.querySelector('.add-btn').addEventListener('click', function(e){
    e.preventDefault();

    let cardNumber = document.getElementById('card-number').value;
    let cardName = document.getElementById('card-name').value;
    let cardDate = document.getElementById('card-date').value;
    let cardCvv = document.getElementById('card-cvv').value;
    let cardType = document.getElementById('card-type').value;
    let cardCategory = document.getElementById('card-category').value;
    let card = JSON.parse(localStorage.getItem('card')) || [];

    if (!/^\d{16}$/.test(cardNumber)) {
        alert("Card number must be exactly 16 digits.");
        return;
    }

    if (cardName.length === 0) {
        alert("Please enter the cardholder's name.");
        return;
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardDate)) {
        alert("Expiry date must be in MM/YY format.");
        return;
    }

    if (!/^\d{3}$/.test(cardCvv)) {
        alert("CVV must be exactly 3 digits.");
        return;
    }

    card.push({ cardnumber: cardNumber, cardname: cardName, carddate: cardDate, cardcvv: cardCvv, cardtype: cardType, cardcategory: cardCategory});

    localStorage.setItem('card', JSON.stringify(card));
    alert('Payment Card has been added!');
    document.querySelector('.payment-modal').style.display = 'none';
    loadCard();
});

function loadCard() {
    let card = JSON.parse(localStorage.getItem('card')) || [];
    let cardItems = document.querySelector('.card-container');
    let defaultCard = localStorage.getItem('defaultCard');

    cardItems.innerHTML = '';

    card.forEach((item, index) => {
        const isDefault = index == defaultCard ? 'default' : '';
        const badge = index == defaultCard ? '<div class="default-badge">Default</div>' : '';
        cardItems.innerHTML += `            
                        <div class="card ${isDefault}">
                        ${badge}
                            <div class="flex-row">
                                <p class="card-title">${item.cardcategory}</p>
                                <div>${item.cardtype}</div>
                            </div>
                            <p>${item.cardnumber}</p>
                            <div class="flex-row">
                                <p>${item.cardname}</p>
                                <p>${item.carddate}</p>
                            </div>
                            <div class="card-actions">
                                <a onclick="removeCard(${index})">Remove</a>
                                <a onclick="setDefault(${index})">Set as Default</a>
                            </div>
                        </div>
            `;  
    });

    cardItems.innerHTML += `
                        <div class="add-card" onclick="openAddCard()">
                            <div>+</div>
                            <h4>Add Payment Card</h4>
                        </div>
    `;

}

function removeCard(index) {
    let card = JSON.parse(localStorage.getItem('card')) || [];
    card.splice(index, 1);
    localStorage.setItem('card', JSON.stringify(card));
    loadCard();
}

function setDefault(index) {
    localStorage.setItem('defaultCard', index);
    loadCard();
}

loadCard();

function loadHistory() {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    let historyItems = document.querySelector('.transaction-content-modal');
    let historyItems2 = document.querySelector('.transaction-content-nomodal');

    historyItems.innerHTML = '';
    historyItems2.innerHTML = '';
    
    orders.forEach((item, index) => {
        let total = item.price * item.quantity;
        historyItems.innerHTML += `            
                            <div class="transaction-items">
                                <div>
                                    <div>
                                        <h4>${item.name}<p>${item.variant}</p></h4>
                                        <p>05/18/2025</p>
                                    </div> 
                                    <div>
                                        <h4>₱${total}</h4>  
                                        <p>${item.quantity} pcs.</p>
                                   </div>  
                                </div>
                                <div class="item-divider"></div>
                            </div>
            `;  
    });

    orders.slice(0, 3).forEach((item, index) => {
        let total = item.price * item.quantity;
        historyItems2.innerHTML += `            
                            <div class="transaction-items">
                                <div>
                                    <div>
                                        <h4>${item.name}<p>${item.variant}</p></h4>
                                        <p>05/18/2025</p>
                                    </div> 
                                    <div>
                                        <h4>₱${total}</h4>  
                                        <p>${item.quantity} pcs.</p>
                                   </div>  
                                </div>
                                <div class="item-divider"></div>
                            </div>
            `;  
    });
}

loadHistory();

