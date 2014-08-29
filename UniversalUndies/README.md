<<<<<<< HEAD
Universal Undies Website

Team Members: Vincent Lee, Malvin Yeung, Andrew Hwang
=======
### Universal Undies Website

#### Team Members: Vincent Lee, Malvin Yeung, Andrew Hwang
>>>>>>> 391dca4ae083028c779d171952248af1402c31bf

Our website is for the company Universal Undies, which sells the most comfortable men's briefs on the market.

We created this website because Universal Undies needs an attractive, user-friendly e-commerce platform with which to sell briefs.

We approached this project by initially defining a "brief" object with the properties of Color, Size, Price, and Quantity. When a customer clicked the "Add to Cart" button, a function would be called to create a new brief object on the fly depending on the customer's size/color/quantity selection. This brief object would then be added to an array property inside a "Shopping Cart" object. A sorting function was then written to aggregate object quantities with the same size/color within the array.

<<<<<<< HEAD
=======

>>>>>>> 391dca4ae083028c779d171952248af1402c31bf
After a conversation with Brook, it was decided that a more effecive object model was to separate quantity from the brief object. Instead we first generate a "Product List" object that holds every brief object permutation in an array, each with an initial quantity of zero. As the user adds briefs to the cart, the corresponding brief in the product list would have its quantity updated.

The product list is then filtered into an Order List, which contains only brief objects that the customer actually added to the cart. Pulling properties from objects inside the order list, a checkout summary is prepared by adding new DOM elements under the proper headings.

In terms of site structure, the skeleton grid was utilized to arrange items on the page in a clear, attractive manner. Responsive web design was incorporated through the use of event listeners, which provided interactivity by highlighting user selections and preventing actions that would otherwise impede the checkout process.
