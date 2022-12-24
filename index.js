(() => {
    'use strict'

    document.getElementById('header__burger').onclick = function () {
        document.getElementById('menu').classList.add('open');
    }
    document.querySelectorAll('#menu *').forEach((item) => {
        item.onclick = () => {
            document.getElementById('menu').classList.remove('open');
        }
    })
   const macaroons_btn= document.getElementsByClassName('macaroon__btn');
    for (let i = 0; i < macaroons_btn.length; i++) {
        macaroons_btn[i].onclick=()=>{
            document.getElementById('inputProduct').value = macaroons_btn[i].previousElementSibling.previousElementSibling.previousElementSibling.innerText;
        }
    }


    let loader = $('.loader');
    $('#form_btn').click(() => {
        let elements = $('.form__input');
        let product = $('#inputProduct');
        let name = $('#inputName');
        let phone = $('#inputPhone');
        let hasError = false;
        for (let i = 0; i < elements.length; i++) {
            elements.eq(i).next().hide();
            elements.eq(i).css('border-color', 'rgb(130, 19, 40)');
        }
        if (!product.val()) {
            hasError = true;
            product.next().show();
            product.css('border-color', 'rgba(204, 15, 15, 0.88)');
        }
        if (!name.val()) {
            hasError = true;
            name.next().show();
            name.css('border-color', 'rgba(204, 15, 15, 0.88)');
        }
        if (!phone.val()) {
            phone.next().show();
            phone.css('border-color', 'rgba(204, 15, 15, 0.88)');
            hasError = true;
        }

        if (!hasError) {
            loader.css('display', 'flex');
            $.ajax({
                method: "POST",
                url: "https://testologia.site/checkout ",
                data: {product: product.val(), name: name.val(), phone: phone.val()}
            })
                .done(function (msg) {
                        loader.hide();
                        console.log(msg);
                        if (msg.success === 1) {
                            $('.form').hide();
                            $('.thank').css('display', 'flex');
                        } else {
                            alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ');
                            product.val('');
                            name.val('');
                            phone.val('');
                        }

                    }
                )
        }
    })
})()