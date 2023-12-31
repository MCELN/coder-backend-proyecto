const logout = document.getElementById('logout');
const addToCartButtons = document.querySelectorAll('.addToCart');

logout.addEventListener('click', async (e) => {
    e.preventDefault()
    try {
        const response = await fetch('/login', {
            method: 'DELETE',
        });

        if (response.ok) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `Te esperamos pronto!`,
                showConfirmButton: false,
                timer: 2000
            })
                .then(() => {
                    window.location.href = '/login';
                });
        };

    } catch (error) {
        console.log('Error al cerrar sessión', error);
    }
})

addToCartButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        const productId = button.getAttribute('productId');
        const cartId = button.getAttribute('cartId');

        const requestData = {
            method: 'POST',
        };

        fetch(`/api/carts/${cartId}/product/${productId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify({
                quantity: 1,
            })
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error al agregar el producto al carrito.');
                }
            })
            .then(function (data) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Producto agregado al carrito con éxito.',
                    showConfirmButton: false,
                    timer: 2000
                })
            })
            .catch(function (error) {
                alert(error.message);
            });
    });
});