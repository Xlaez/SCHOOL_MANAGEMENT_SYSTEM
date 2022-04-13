const price = 32.50;

const getCheckout = (req, res) => {
    res.render('stripe', {
        path: "/stripe",
        pageTitle: "Your checkout page",
        totalSum: price,
    });
}

module.exports = {
    getCheckout
}