function form() {

        let message = {
            loading: 'Загрузка...',
            success: 'Спасибо! Мы скоро с вами свяжемся',
            failure: 'Что-то пошло не так...'
    };

        let form = document.querySelector('.main-form'),
            input = form.getElementsByTagName('input'),
            statusMessage = document.createElement('div');

            statusMessage.classList.add('status');

        function sendForm(element) {
            
            element.addEventListener('submit', function(event){
                event.preventDefault();
                    element.appendChild(statusMessage);
                    let formData = new FormData(element);
                  
                      function postData(data) {
                        
                        return new Promise(function(resolve, reject) {
                        
                            let request = new XMLHttpRequest();
                        
                            request.open('POST', 'server.php' );
                        
                            request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=utf-8');

                            request.onreadystatechange = function() {
                            if(request.readyState < 4) {
                                resolve();
                            } else if (request.readyState === 4 && request.status == 200 ) {
                                resolve();
                            }   else {
                                    reject('Оборвалось');
                                }
                            }
                        
                        request.send(data);
                    });
                }
        
            function clearInput() {
                for (let i = 0; i < input.length; i++) {
                    input[i].value = '';
                }
            }

            postData(formData).then(() => {statusMessage.innerHTML = message.success})
                            .catch(() => {statusMessage.innerHTML = message.failure})
                            .then(clearInput)
                    });
        }   
        
    sendForm(form);
}

        /* form.addEventListener('submit', function(event) {
            event.preventDefault();
            form.appendChild(statusMessage);

            let request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

            let formData = new FormData(form);

            let obj = {};
            formData.forEach(function(value, key) {
                obj[key] = value;
            });
            let json = JSON.stringify(obj);
            
            request.send(json);

            request.addEventListener('readystatechange', function() {
                if (request.readyState < 4) {
                    statusMessage.innerHTML = message.loading;
                } else if(request.readyState === 4 && request.status == 200) {
                    statusMessage.innerHTML = message.success;
                } else {
                    statusMessage.innerHTML = message.failure;
                }
            });

            for (let i = 0; i < input.length; i++) {
                input[i].value = '';
            }

        }); */


module.exports = form;