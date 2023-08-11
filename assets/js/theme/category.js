import { api, hooks } from '@bigcommerce/stencil-utils';
import CatalogPage from './catalog';
import compareProducts from './global/compare-products';
import FacetedSearch from './common/faceted-search';
import { createTranslationDictionary } from '../theme/common/utils/translations-utils';

export default class Category extends CatalogPage {
    constructor(context) {
        super(context);
        this.validationDictionary = createTranslationDictionary(context);
    }

    setLiveRegionAttributes($element, roleType, ariaLiveStatus) {
        $element.attr({
            role: roleType,
            'aria-live': ariaLiveStatus,
        });
    }

    makeShopByPriceFilterAccessible() {
        if (!$('[data-shop-by-price]').length) return;

        if ($('.navList-action').hasClass('is-active')) {
            $('a.navList-action.is-active').focus();
        }

        $('a.navList-action').on('click', () => this.setLiveRegionAttributes($('span.price-filter-message'), 'status', 'assertive'));
    }

    // IMPORTANT: BEGIN CHANGES.
    handleProductImageHover({ currentTarget, type: eventType }) {
        // Get default and hover image URLs.
        const imageElement = $(currentTarget).find('.card-image');
        const defaultImageUrl = imageElement.attr('data-default-src');
        const hoverImageUrl = imageElement.attr('data-hover-src');

        // Use hoverImage only if the product item is hovered.
        const isHovered = eventType === 'mouseenter';
        const newImageUrl = isHovered ? hoverImageUrl : defaultImageUrl;

        // Set the new image URL if it is valid.
        if (newImageUrl && newImageUrl !== '') {
            $(imageElement).attr('srcset', newImageUrl);
        }
    }

    addAllToCart({ currentTarget }) {
        // Get the product IDs from the button.
        const productIdsString = $(currentTarget).attr('data-product-ids').split(',');

        // Convert string of product IDs to an array of line items.
        const lineItems = $.map(productIdsString, value => ({
            quantity: 1,
            productId: parseInt(value, 10)
        }));

        const getOptions = { method: 'GET', headers: { 'Content-Type': 'application/json' } };

        fetch('/api/storefront/carts', getOptions)
            .then(response => response.json())
            .then(([firstCart]) => {
                const cartOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ lineItems })
                };

                // TODO: Add api url to language file.
                let apiUrl = '/api/storefront/carts';

                // If the cart already exists, append the api url for adding line items.
                if (firstCart) {
                    apiUrl += `/${firstCart.id}/items`;
                }

                // Create the cart with line items, or add the line items to existing cart.
                return fetch(apiUrl, cartOptions).then(response => response.json());
            })
            .then(cart => {
                // TODO: Alert user of items added.
                console.log(cart)
            })
            .catch(err => console.error(err));
    }
    // END CHANGES.

    onReady() {
        this.arrangeFocusOnSortBy();

        $('[data-button-type="add-cart"]').on('click', (e) => this.setLiveRegionAttributes($(e.currentTarget).next(), 'status', 'polite'));

        this.makeShopByPriceFilterAccessible();

        compareProducts(this.context);

        if ($('#facetedSearch').length > 0) {
            this.initFacetedSearch();
        } else {
            this.onSortBySubmit = this.onSortBySubmit.bind(this);
            hooks.on('sortBy-submitted', this.onSortBySubmit);
        }

        $('a.reset-btn').on('click', () => this.setLiveRegionsAttributes($('span.reset-message'), 'status', 'polite'));

        this.ariaNotifyNoProducts();

        // IMPORTANT: BEGIN CHANGES.
        $('.product').on('mouseenter mouseleave', this.handleProductImageHover);

        $('[data-button-type="add-all-cart"]').on('click', this.addAllToCart);
        // END CHANGES.
    }

    ariaNotifyNoProducts() {
        const $noProductsMessage = $('[data-no-products-notification]');
        if ($noProductsMessage.length) {
            $noProductsMessage.focus();
        }
    }

    initFacetedSearch() {
        const {
            price_min_evaluation: onMinPriceError,
            price_max_evaluation: onMaxPriceError,
            price_min_not_entered: minPriceNotEntered,
            price_max_not_entered: maxPriceNotEntered,
            price_invalid_value: onInvalidPrice,
        } = this.validationDictionary;
        const $productListingContainer = $('#product-listing-container');
        const $facetedSearchContainer = $('#faceted-search-container');
        const productsPerPage = this.context.categoryProductsPerPage;
        const requestOptions = {
            config: {
                category: {
                    shop_by_price: true,
                    products: {
                        limit: productsPerPage,
                    },
                },
            },
            template: {
                productListing: 'category/product-listing',
                sidebar: 'category/sidebar',
            },
            showMore: 'category/show-more',
        };

        this.facetedSearch = new FacetedSearch(requestOptions, (content) => {
            $productListingContainer.html(content.productListing);
            $facetedSearchContainer.html(content.sidebar);

            $('body').triggerHandler('compareReset');

            $('html, body').animate({
                scrollTop: 0,
            }, 100);
        }, {
            validationErrorMessages: {
                onMinPriceError,
                onMaxPriceError,
                minPriceNotEntered,
                maxPriceNotEntered,
                onInvalidPrice,
            },
        });
    }
}
