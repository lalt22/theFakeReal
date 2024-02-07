# theFakeReal

A clone of The RealReal eShop, specialising in re-selling second-hand designer and luxury goods.
This website was built using ReactJS for the frontend, SCSS for styling and Google Firestore for data storage.
Stripe Card payment is also integrated allowing customers to enter card details to purchase products.

- Note that this is only accepting test payments, and will not take valid card details. For fake card details to use, see How to Use section.

## How to View Deployed Version

Available at: https://lalt22.github.io/theFakeReal/

## How to Run Locally

Download files from main branch. Ensure that you have node and npm downloaded. If not, download here: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

On Windows PowerShell or Mac Terminal:

```console
npm install
npm run dev
```

This will run the site on a local server. The terminal output will show a link with the format:

```console
Local: http://localhost:{SERVER_NUMBER}/theFakeReal/
```

Follow this link to access the locally hosted version.

## How to Use

The webpage will open on the Home Page which has a carousel of product cards that can be scrolled through with buttons on the side. To favourite a product, click the heart on the top right corner of the product card.
To view Favourited products, click the Favourites link in the Navigation Bar.
To add a product to your cart, click the More Info link on a product card and view the Product Page. From this page, you can add and remove products from your cart.
To view your cart, click the Cart link in the Navigation Bar. Here, you can adjust the quantity of each product you would like to purchase.
To attempt payments, open a new Powershell/Terminal window and ensure you are in the theFakeReal folder. Then enter the following command:

```console
node /services/stripeServer.cjs
```

To complete payment, enter the following card details:

- Card Number: 4242424242424242
- CVV: Any 3 digits
- Expiry: Any future date in the form MM/YY
- ZIP Code: Any 5 digits

## Known Bugs/Issues

- Cart Page:
  - Adding a new product to cart from the cart page is very unpredictable. Sometimes the button appears, sometimes it doesn't
