const subscriptions = document.querySelectorAll('.variant_selections');
const subscribedPrices = document.querySelectorAll('.subscribed-price');
const individualFlavorData = document.querySelectorAll('.individual-flavor');
const allFlavours = document.querySelector('.allFlavours')
const menuButton = document.getElementById('mobile-menu')
const mobilemenu = document.getElementById('nav-mob')
const oneTimePurchasePriceVariant = document.getElementById('oneTimePurchasePriceVariant')
const oldPriceVariantDiscount = document.getElementById('oldPriceVariantDiscount')
const newPriceVariantDiscount = document.getElementById('newPriceVariantDiscount')




let productBasePriceNoDiscount = 1000;
let basePricePerBottle;
let oneTimePurchase = false;
let subscribeOnQuantity = 4





document.addEventListener("DOMContentLoaded", () => {

  const cards = document.querySelectorAll('.card');
  const discountPriceShow = document.getElementById('discount-price');

  basePricePerBottle = 1000;

  cards.forEach(card => {
    card.addEventListener('click', () => {


      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');


      if (oneTimePurchase === true) {
        const singleProductPrice = card.dataset.oneprice
        basePricePerBottle = parseFloat(singleProductPrice)
        const quantity = card.dataset.quantity
        subscribeOnQuantity = parseFloat(quantity)
      }
      else {
        // Extract and parse dataset values
        const discountAttr = card.dataset.discount;
        const amountAttr = card.dataset.amount;

        const discountPerProduct = parseFloat(discountAttr);
        const amountPerProduct = parseFloat(amountAttr);


        // Set global prices
        basePricePerBottle = amountPerProduct;

        // Update DOM
        discountPriceShow.textContent = `${discountPerProduct}`;

        const quantity = card.dataset.quantity

        subscribeOnQuantity = parseFloat(quantity)

        // Set input as checked
        card.querySelector('input').checked = true;
      }

      const singleProductPrice = card.dataset.oneprice
      const discountingPrice = card.dataset.amount;
      const quantitySelected = card.dataset.quantity
      oneTimePurchasePriceVariant.textContent = `$${singleProductPrice * quantitySelected}`
      oldPriceVariantDiscount.textContent = `$${singleProductPrice * quantitySelected}`
      newPriceVariantDiscount.textContent = `$${discountingPrice * quantitySelected}`
      updateCart();
    });
  });

});


window.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("coffee-make");
  video.loop = true;
  video.muted = true;
  video.play().catch(error => {
    console.error("Autoplay failed:", error);
  });
});


document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const faqItem = button.parentElement;
    faqItem.classList.toggle('active');
  });
});


menuButton.addEventListener('click', () => {
  if (mobilemenu.classList.contains('active')) {
    mobilemenu.classList.remove('active')
  }
  else {
    mobilemenu.classList.add('active')
  }
})


const totalFlavours = individualFlavorData.length
allFlavours.textContent = `(${totalFlavours})`

individualFlavorData.forEach(flavor => {
  const color = flavor.dataset.color
  flavor.querySelector('.variant-product-image').style.backgroundColor = color
});



subscriptions.forEach(subscription => {
  subscription.addEventListener('click', () => {
    subscriptions.forEach(c => c.classList.remove('active'));
    subscription.classList.add('active');
    const inputSelect = subscription.querySelector('input');
    if (inputSelect.value === 'base') {
      subscribedPrices.forEach(val => val.style.display = "none");
      oneTimePurchase = true;
    }
    else {
      subscribedPrices.forEach(val => val.style.display = "block");
      oneTimePurchase = false;
    }
    inputSelect.checked = true;
    updateCart();
  });
});


const tabButtons = document.querySelectorAll(".tab-btn");
const flavors = document.querySelectorAll(".individual-flavor");

tabButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    tabButtons.forEach(btn => btn.classList.remove("active"));
    // Add active class to clicked button
    button.classList.add("active");

    // Show/Hide logic based on tab
    if (index === 0) {
      // ALL tab
      flavors.forEach(flavor => flavor.style.display = "flex");
    } else if (index === 1) {
      // BEST SELLERS tab
      flavors.forEach(flavor => {
        const isBestseller = flavor.getAttribute("data-bestseller") === "true";
        flavor.style.display = isBestseller ? "flex" : "none";
      });
    } else if (index === 2) {
      // LIMITED RELEASES tab (if you add logic for it)
      flavors.forEach(flavor => {
        // For now, hide all since you haven't specified logic
        flavor.style.display = "none";
      });
    }
  });
});


// add to cart functionality
const products = document.querySelectorAll('.variant-product');
const subtotalEl = document.getElementById('subtotal');
const savingsEl = document.getElementById('savings');
const subtotalElement = document.getElementById('subtotalElement');
const savingElement = document.getElementById('savingElement');

const addToCartBtn = document.getElementById('addToCartBtn');
const meter = document.getElementById('meter');


const priceRadios = document.querySelectorAll('input[name="variant_selection"]');



let currentPriceMode = 'save'; // default



function updateCart() {
  let totalQty = 0;
  let subtotal = 0;

  let selectedPrice = basePricePerBottle;

  if (oneTimePurchase === true) {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      const selectedCard = card.classList.contains('active')
      if (selectedCard) {
        const singleProductPrice = card.dataset.oneprice
        basePricePerBottle = parseFloat(singleProductPrice)
        selectedPrice = basePricePerBottle
      }
    })
  }
  else {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      const selectedCard = card.classList.contains('active')
      if (selectedCard) {
        const singleProductPrice = card.dataset.amount
        basePricePerBottle = parseFloat(singleProductPrice)
        selectedPrice = basePricePerBottle
      }
    })
  }


  products.forEach(product => {
    const qty = parseInt(product.querySelector('.qty').textContent);
    totalQty += qty;
  });

  if (oneTimePurchase === true) {
    if (totalQty < subscribeOnQuantity) {
      subtotalElement.style.display = "none";
      savingElement.style.display = "none";
      subtotalEl.textContent = "$0.00";
      savingsEl.textContent = "";
      addToCartBtn.textContent = `Select ${subscribeOnQuantity - totalQty} more bottle${4 - totalQty > 1 ? 's' : ''}`;
      meter.textContent = `${subscribeOnQuantity - totalQty} Flavors to Go`;
      addToCartBtn.classList.add('disabled');
    }
    else {
      subtotal = totalQty * selectedPrice;

      const fullPrice = totalQty * productBasePriceNoDiscount;
      const savings = fullPrice - subtotal;

      subtotalElement.style.display = "inline-block";
      savingElement.style.display = "none";


      subtotalEl.textContent = "$" + subtotal.toFixed(2);

      if (savings > 0) {
        savingsEl.textContent = `You're saving $${savings.toFixed(2)}`;
      } else {
        savingsEl.textContent = "";
      }

      addToCartBtn.textContent = "ADD TO CART";
      addToCartBtn.hasChildNodes = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M16 6.66667H9.33333V0H6.66667V6.66667H0V9.33333H6.66667V16H9.33333V9.33333H16V6.66667Z" fill="black"></path></svg>`
      meter.textContent = "All Set! (You can add more)";
      addToCartBtn.classList.remove('disabled');
    }
  }
  else {
    if (totalQty < subscribeOnQuantity) {
      subtotalElement.style.display = "none";
      savingElement.style.display = "none";
      subtotalEl.textContent = "$0.00";
      savingsEl.textContent = "";
      addToCartBtn.textContent = `Select ${subscribeOnQuantity - totalQty} more bottle${4 - totalQty > 1 ? 's' : ''}`;
      meter.textContent = `${subscribeOnQuantity - totalQty} Flavors to Go`
      addToCartBtn.classList.add('disabled');
    } else {

      subtotal = totalQty * selectedPrice;

      const fullPrice = totalQty * productBasePriceNoDiscount;
      const savings = fullPrice - subtotal;

      subtotalElement.style.display = "inline-block";
      savingElement.style.display = "inline-block";


      subtotalEl.textContent = "$" + subtotal.toFixed(2);

      if (savings > 0) {
        savingsEl.textContent = `You're saving $${savings.toFixed(2)}`;
      } else {
        savingsEl.textContent = "";
      }

      addToCartBtn.textContent = "ADD TO CART";
      addToCartBtn.hasChildNodes = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M16 6.66667H9.33333V0H6.66667V6.66667H0V9.33333H6.66667V16H9.33333V9.33333H16V6.66667Z" fill="black"></path></svg>`
      meter.textContent = "All Set! (You can add more)";
      addToCartBtn.classList.remove('disabled');
    }
  }
}



const addButtons = document.querySelectorAll('.flavor_add-btn');

addButtons.forEach(button => {
  button.addEventListener('click', () => {
    const product = button.closest('.variant-product');
    const qtyEl = product.querySelector('.qty');
    qtyEl.textContent = '1';

    button.style.display = 'none'; // hide Add +
    toggleControls(product, true); // show +/-
    updateCart();
  });
});

// Handle showing/hiding increment/decrement controls
function toggleControls(product, show) {
  const incBtn = product.querySelector('.increment');
  const decBtn = product.querySelector('.decrement');
  const qtyEl = product.querySelector('.qty');
  const addBtn = product.querySelector('.flavor_add-btn');

  incBtn.style.display = show ? 'inline-block' : 'none';
  decBtn.style.display = show ? 'inline-block' : 'none';
  qtyEl.style.display = show ? 'inline-block' : 'none';
  addBtn.style.display = show ? 'none' : 'inline-block';
}








products.forEach(product => {
  const decrementBtn = product.querySelector('.decrement');
  const incrementBtn = product.querySelector('.increment');
  const qtyEl = product.querySelector('.qty');

  decrementBtn.addEventListener('click', () => {
    let qty = parseInt(qtyEl.textContent);
    if (qty > 0) {
      qty--;
      qtyEl.textContent = qty;
      if (qty === 0) {
        toggleControls(product, false); // Hide inc/dec, show Add +
      }
      updateCart();
    }
  });

  incrementBtn.addEventListener('click', () => {
    let qty = parseInt(qtyEl.textContent);
    qty++;
    qtyEl.textContent = qty;
    updateCart();
  });
});

updateCart(); // Initial call