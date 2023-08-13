# OBundle Test Site

This project uses BigCommerce, Stencil CLI, and the Storefront API to showcase my ability to use the tools required to be successful at oBundle.

## Live Preview
[BigCommerce oBundle Live Test Site](https://obundle-test-site-jared-huffstuler.mybigcommerce.com/?ctk=91beefce-8e96-4e17-b803-f7b099ed342c)

<strong>Preview Code</strong>
> hvr3y3z7pd


## Features
    - A new product and category were added to the store.
    - When the new product is hovered on the category page, its second image is shown.
    - At the top of the category page is a new button labeled "Add All To Cart".
    - When clicked, the Storefront API is used to add all items in the new category to the cart.
    - At the top of the category page is a new button labeled "Remove All Items".
    - The "Remove All Items" button is not shown if the cart is empty.
    - When clicked, the "Remove All Items" button uses the Storefront API to empty the cart.
    - The user is notified when all items are added to the cart.
    - The user is notified when all items are removed from the cart.
    - BONUS: If the customer is logged in a banner will be shown with info from the customer object:
        - Name
        - Email
        - Phone
        - Store credit

## Instructions:
1. Go to the [Live Test Site](https://obundle-test-site-jared-huffstuler.mybigcommerce.com/?ctk=91beefce-8e96-4e17-b803-f7b099ed342c).
2. Enter the preview code:
    > hvr3y3z7pd
3. Click on the category "Special Items".
4. Hover the image with your mouse to see the item's second image.
5. Click the button labeled "Add All To Cart" to add all items from the category to the cart.
6. Confirm item(s) added to cart in top right of screen.
7. Click the button labeled "Remove All Items" to clear the items from the cart.
8. Login or create an account to view the banner at the top of the Special Items category page.

## Add All Button
![Add All Button](/assets/img/screenshots/AddAllButton.png)

## Remove All Button
![Add All Button](/assets/img/screenshots/RemoveAllButton.png)

## Customer Banner
![Add All Button](/assets/img/screenshots/CustomerBanner.png)

# Tasks
hvr3y3z7pd
## Setup
- [x] Sign up for a BigCommerce trial store
- [x] Install Stencil CLI
- [x] Use default Cornerstone Theme
- [x] Reference BigCommerce developer documentation

## Task
- [x] Create a product called "Special Item"
- [x] Create a new category call "Special Items"
- [x] Assign new product to new category
- [x] Add at least 2 images for the product
- [x] New product should be the only item in the category
- [x] Show product's second image when it is hovered
- [x] Add a button at the top of the category page labeled "Add All To Cart"
- [x] When clicked, the product will be added to the cart
- [x] Notify the user that the product has been added
- [x] Add a button next to the "Add All" button labeled "Remove All Items"
- [x] Hide "Remove All" button if no items are in the cart
- [x] When clicked it should clear the cart
- [x] Notify the user that the cart was cleared
- [x] Both buttons should utilize the Storefront API


## Bonus
If a customer is logged in:
- [x] Show a banner at the top of the category page
- [x] Show customer details in banner
    - [x] Name
    - [x] Email
    - [x] Phone
    - [x] Etc
- [x] Use data that is rendered via Handlebars on the Customer Object

## Submission
- [x] Create a GitHub repo
- [x] Replace readme with project overview
- [x] Include Preview code for the BigCommerce Store
- [x] Include URL to view the store
- [x] Reply to email with GitHub repo link
- [x] 3-4 days to complete
